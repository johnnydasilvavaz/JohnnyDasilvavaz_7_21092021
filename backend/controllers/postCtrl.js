const validator = require('validator');
const fs = require('fs');

exports.getOnePost = (req, res, next) => {
    const sql = 'SELECT text FROM posts WHERE id=?;';
    db.query(sql, req.params.id, (err, data, fields) => {
        if (err) return res.status(401).json({err});
        return res.status(200).json({data});
    });
};

exports.getAllPosts = (req, res, next) => {
    const sql = 'SELECT posts.id AS pid, posts.uid AS puid, posts.date AS pdate, posts.text AS ptext, posts.imgUrl AS pimgUrl, posts.likes AS plikes, name AS pname, forname AS pforname, avatar AS pavatar FROM posts INNER JOIN users ON posts.uid=users.uid ORDER BY date DESC;';
    db.query(sql, (err, data, fields) => {
        if (err) return res.status(401).json({err});
        const posts = {...data};
        const sql2 = 'SELECT comments.*, name, forname, avatar FROM comments INNER JOIN users ON comments.uid=users.uid ORDER BY date DESC;';
        db.query(sql2, (err, data, fields) => {
            if (err) return res.status(403).json({err});
            const coms = {...data};
            if (!coms) return res.status(200).json({...posts});
            for (let c in coms) {
                for (let p in posts) {
                    if (posts[p].pid == coms[c].post_id && !posts[p].com) {
                        posts[p] = {...posts[p], com: {...coms[c]}};
                    }
                }
            }
            return res.status(200).json({...posts});
        })
    });
};

exports.createPost = (req, res, next) => {
    if (!req.body.text && !req.file) {
        return res.status(400).json({message: "Your need to enter text or image !"})
    };
    //handle image
    let img = null;
    if (req.file) {
        img = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    };
    const userId = req.params.userId;
    let text = '';
    if (req.body.text) {
        text = validator.escape(req.body.text);
    }
    const post = [userId, text, 0, img];
    //create DB query
    const sql = 'INSERT INTO posts (uid, text, likes, imgUrl) VALUES (?);';
    db.query(sql, [post], (err, data, fields) => {
        if (err) return res.status(401).json({err});
        return res.status(200).json({message: 'Post created !'});
    });
};

exports.modifyPost = (req, res, next) => {

};

exports.deletePost = (req, res, next) => {
    const sqlAdmin = 'SELECT role FROM users WHERE uid=?';
    db.query(sqlAdmin, req.params.userId, (err, data, fields) => {
        if (err) return res.status(404).json({err});
        const role = data[0].role;
        const sqlPost = 'SELECT uid, imgUrl FROM posts WHERE posts.id=?'
        db.query(sqlPost, req.params.id, (err, data, fields) => {
            if (err) return res.status(404).json({err});
            let filename;
            if (data[0].imgUrl) {
                filename = data[0].imgUrl.split('/images/')[1];
            }
            if (req.params.userId == data[0].uid || role == "admin") {
                const sql = 'DELETE FROM posts WHERE posts.id=? ;';
                db.query(sql, [req.params.id], (err, data, fields) => {
                    if (err) return res.status(401).json({err});
                    if (filename) {
                        fs.unlink(`images/${filename}`, (error => {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log("Image removed !");
                            }
                        }));
                    }
                    return res.status(200).json({message: 'Post removed !'})
                })
            }
        })
    })
};

exports.createComment = (req, res, next) => {
    const sql = 'INSERT INTO comments (uid, text, post_id) VALUES (?);';
    const comment = [req.params.userId, req.body.text, req.params.id];
    db.query(sql, [comment], (err, data, fields) => {
        if (err) return res.status(401).json({err});
        return res.status(200).json({message: 'Comment created !'});
    })
};

exports.getComments = (req, res, next) => {
    const sql = 'SELECT comments.*, users.name, users.forname, users.avatar FROM comments LEFT JOIN users ON comments.uid=users.uid WHERE post_id=?;';
    db.query(sql, [req.params.id], (err, data, fields) => {
        if (err) return res.status(401).json({err});
        return res.status(200).json({...data});
    });
};

exports.likePost = (req, res, next) => {
    const sqlCheck = 'SELECT * FROM likes WHERE uid=? AND post_id=?;'
    db.query(sqlCheck, [req.params.userId, req.params.id], (err, data, fields) => {
        if (err) return res.status(401).json({err});
        if (data.length > 0) {
            const sql = 'DELETE FROM likes WHERE uid=? AND post_id=?;';
            db.query(sql, [req.params.userId, req.params.id], (err, data, fields) => {
                if (err) return res.status(401).json({err});
                const sql2 = 'UPDATE posts SET likes=likes-1 WHERE id=?;';
                db.query(sql2, [req.params.id], (err, data, fields) => {
                    if (err) return res.status(401).json({err});
                    return res.status(200).json({message: 'Post disliked !'});
                })
            })
        } else {
            const sql = 'INSERT INTO likes (uid, post_id) VALUES (?);';
            db.query(sql, [[req.params.userId, req.params.id], req.params.id], (err, data, fields) => {
                if (err) return res.status(401).json({err});
                const sql2 = 'UPDATE posts SET likes=likes+1 WHERE id=?;';
                db.query(sql2, [req.params.id], (err, data, fields) => {
                    if (err) return res.status(401).json({err});
                    return res.status(200).json({message: 'Post liked !'});
                })
            })
        }
    });
};