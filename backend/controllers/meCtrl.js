require('dotenv').config();
const cryptoJS = require('crypto-js');
const validator = require('validator');

exports.getProfile = (req, res, next) => {
    const sql = 'SELECT name, forname, email FROM users WHERE uid=?;';
    db.query(sql, req.params.userId, (err, data, fields) => {
        if (err) return res.status(400).json({err});
        return res.status(200).json({name: data[0].name, forname: data[0].forname, email: data[0].email});
    });
}

exports.getPosts = (req, res, next) => {
    const sql = 'SELECT * FROM posts WHERE uid=?;';
    db.query(sql, req.params.userId, (err, data, fields) => {
        if (err) return res.status(400).json({err});
        return res.status(200).json({});
    });
}

exports.modify = (req, res, next) => {
    //Check if the fields are empty and with validator
    if (!req.body.name || !req.body.forname || !req.body.password || 
        !validator.isAlphanumeric(validator.blacklist(req.body.name.toString(), ' -')) || 
        !validator.isAlphanumeric(validator.blacklist(req.body.forname.toString(), ' -')) || 
        !validator.isStrongPassword(req.body.password)) {
        return res.status(400).json({message: "A field is empty or incorrect !"})
    }
    const sql = "UPDATE users SET name='?', forname='?', password='?' WHERE uid='?';";
    db.query(sql, (req.body.name, req.body.forname, cryptoJS.SHA256(req.body.password).toString(cryptoJS.enc.Hex), req.params.userId), (err, data, fields) => {
        if(err) return res.status(400).json({err});
        return res.status(200).json({message: "User updated !"});
    });
}

exports.delete = (req, res, next) => {
    const sql = 'DELETE FROM users WHERE uid=?;';
    db.query(sql, req.params.userId, (err, data, fields) => {
        if(err) return res.status(400).json({err});
        return res.status(200).json({message: "User deleted !"});
    });
}