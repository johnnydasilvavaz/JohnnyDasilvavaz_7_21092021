require('dotenv').config();
//const cryptoJS = require('crypto-js');
const validator = require('validator');

exports.getProfile = (req, res, next) => {
    const sql = 'SELECT password, forname, name, avatar, uid, email FROM users WHERE uid=?;';
    db.query(sql, req.params.userId, (err, data, fields) => {
        if (err) return res.status(404).json({err});
        console.log(data);
        return res.status(200).json(data);
    });
}

exports.getPosts = (req, res, next) => {
    const sql = 'SELECT * FROM posts WHERE uid=?;';
    db.query(sql, req.params.userId, (err, data, fields) => {
        if (err) return res.status(404).json({err});
        return res.status(200).json({});
    });
}

exports.modify = (req, res, next) => {
    //Check if the fields are empty and with validator
    if (req.body.name && !validator.isAlphanumeric(validator.blacklist(req.body.name.toString(), ' -'))) {
        return res.status(400).json({message: "A field is empty or incorrect !"});
    };
    if (req.body.forname && !validator.isAlphanumeric(validator.blacklist(req.body.forname.toString(), ' -'))) {
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
    const sql = 'DELETE FROM users WHERE uid=?;';
    db.query(sql, req.params.userId, (err, data, fields) => {
        if(err) return res.status(400).json({err});
        return res.status(200).json({message: "User deleted !"});
    });
}