require('dotenv').config();
//const cryptoJS = require('crypto-js');
const validator = require('validator');
const fs = require('fs');

exports.getProfile = (req, res, next) => {
    const sql = 'SELECT forname, name, avatar, uid, email FROM users WHERE uid=?;';
    db.query(sql, req.params.id, (err, data, fields) => {
        if (err) return res.status(404).json({err});
        return res.status(200).json(data);
    });
}

exports.getPosts = (req, res, next) => {
    const sql = 'SELECT posts.id AS pid, posts.uid AS puid, posts.date AS pdate, posts.text AS ptext, posts.imgUrl AS pimgUrl, posts.likes AS plikes, name AS pname, forname AS pforname, avatar AS pavatar FROM posts INNER JOIN users ON posts.uid=users.uid WHERE posts.uid=? ORDER BY date DESC;';
    db.query(sql, req.params.id, (err, data, fields) => {
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
}

exports.modify = (req, res, next) => {
    //Check if the fields are empty and with validator
    if ((req.body.name && !validator.isAlphanumeric(validator.blacklist(req.body.name.toString(), ' -'))) ||
    (req.body.forname && !validator.isAlphanumeric(validator.blacklist(req.body.forname.toString(), ' -')))) {
        if (req.file) {
            fs.unlink(`images/${req.file.filename}`, (error => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Image removed !");
                }
            }))
        }
        return res.status(400).json({message: "A field is empty or incorrect !"});
    };
    if (!req.body.name && !req.body.forname && !req.file) {
        return res.status(400).json({message: "A field is empty or incorrect !"});
    }

    let sqlParams = [];
    let sql = "UPDATE users SET ";
    if (req.body.name) {
        sql += "name=?";
        sqlParams.push(req.body.name);
    }
    if (req.body.name && (req.body.forname || req.file)) sql += ", ";
    if (req.body.forname) {
        sql += "forname=?";
        sqlParams.push(req.body.forname);
    }
    if (req.body.forname && req.file) sql += ", ";
    if (req.file) {
        const sqlImage = 'SELECT avatar FROM users WHERE uid=?'
        db.query(sqlImage, req.params.userId, (err, data, fields) => {
            if (err) return res.status(401).json({err});
            const filename = data[0].avatar.split('/images/')[1];
            if (filename != "avatar.png") {
                fs.unlink(`images/${filename}`, (error => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Image removed !");
                    }
                }));
            }
        })
        sql += "avatar=?";
        sqlParams.push(`${req.protocol}://${req.get('host')}/images/${req.file.filename}`);
    }
    sqlParams.push(req.params.userId);
    sql += " WHERE uid=?;";

    db.query(sql, sqlParams, (err, data, fields) => {
        if(err) return res.status(400).json({err});
        const sql2 = 'SELECT forname, name, avatar, uid, email FROM users WHERE uid=?;';
        db.query(sql2, req.params.userId, (err, data, fields) => {
            if(err) return res.status(400).json({err});
            return res.status(200).json({
                message: "User updated !",
                user: {uid: data[0].uid, forname: data[0].forname, name: data[0].name, avatar: data[0].avatar, email: data[0].email}
            });
        });
    });
}

exports.delete = (req, res, next) => {
    const sql = 'DELETE FROM users WHERE uid=? AND password=?;';
    db.query(sql, [req.params.userId, req.body.password], (err, data, fields) => {
        if(err) return res.status(400).json({err});
        return res.status(200).json({message: "User deleted !"});
    });
}