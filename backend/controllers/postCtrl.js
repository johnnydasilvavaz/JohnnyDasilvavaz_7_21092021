const validator = require('validator');

exports.getOnePost = (req, res, next) => {
    const sql = 'SELECT text FROM posts WHERE id=?;';
    db.query(sql, req.params.id, (err, data, fields) => {
        if (err) return res.status(401).json({err});
        return res.status(200).json({data});
    });
};

exports.getAllPosts = (req, res, next) => {
    const sql = 'SELECT * FROM posts ORDER BY date DESC;';
    db.query(sql, (err, data, fields) => {
        if (err) return res.status(401).json({err});
        return res.status(200).json({data});
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
    const text = validator.escape(req.body.text);
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
    const sql = 'DELETE likes, comments, posts FROM likes INNER JOIN comments INNER JOIN posts WHERE likes.postid=? AND comments.postid=? AND posts.id=?;';
    const post = [req.params.id, req.params.id, req.params.id];
    db.query(sql, post, (err, data, fields) => {
        if (err) return res.status(401).json({err});
        return res.status(200).json({message: 'Post removed !'})
    })
};

exports.createComment = (req, res, next) => {
    const sql = 'INSERT INTO comments (uid, text, postid) VALUES (?);';
    const comment = [req.params.userId, req.body.text, req.params.id];
    db.query(sql, [comment], (err, data, fields) => {
        if (err) return res.status(401).json({err});
        return res.status(200).json({message: 'Comment created !'});
    })
};

exports.getComments = (req, res, next) => {
    const sql = 'SELECT * FROM comments WHERE id=?;';
    db.query(sql, [req.params.id], (err, data, fields) => {
        if (err) return res.status(401).json({err});
        return res.status(200).json({data});
    });
};

exports.likePost = (req, res, next) => {
    const sqlCheck = 'SELECT * FROM likes WHERE uid=?;'
    db.query(sqlCheck, [req.params.userId], (err, data, fields) => {
        if (err) return res.status(401).json({err});
        if (data.length > 0) {
            const sql = 'DELETE FROM likes WHERE uid=? AND postid=?;';
            const sql2 = 'UPDATE posts SET likes=likes-1 WHERE id=?;';
            db.query(sql, [req.params.userId, req.params.id], (err, data, fields) => {
                if (err) return res.status(401).json({err});
                db.query(sql2, [req.params.id], (err, data, fields) => {
                    if (err) return res.status(401).json({err});
                    return res.status(200).json({message: 'Post disliked !'});
                })
            })
        } else {
            const sql = 'INSERT INTO likes (uid, postid) VALUES (?);';
            const sql2 = 'UPDATE posts SET likes=likes+1 WHERE id=?;';
            db.query(sql, [[req.params.userId, req.params.id], req.params.id], (err, data, fields) => {
                if (err) return res.status(401).json({err});
                db.query(sql2, [req.params.id], (err, data, fields) => {
                    if (err) return res.status(401).json({err});
                    return res.status(200).json({message: 'Post liked !'});
                })
            })
        }
    });
};