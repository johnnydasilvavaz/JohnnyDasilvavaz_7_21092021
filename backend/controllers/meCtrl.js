require('dotenv').config();
const cryptoJS = require('crypto-js');
const crypto = require('crypto')
const jwt = require('jsonwebtoken');
const validator = require('validator');

exports.getProfile = (req, res, next) => {
    //Check if token ID != userId
    if (req.params.userId != req.body.userId) {
        return res.status(403).json({message: '403: unauthorized request'});
    }
    const sql = '';
    db.query(sql, (err, data, fields) => {
        if (err) return res.status(400).json(err);

    })
}

exports.getPosts = (req, res, next) => {
    //Check if token ID != userId
    if (req.params.userId != req.body.userId) {
        return res.status(403).json({message: '403: unauthorized request'});
    }

}

exports.modify = (req, res, next) => {
    //Check if the fields are empty and with validator
    if (!req.body.name || !req.body.forname || !req.body.password || 
        !validator.isAlphanumeric(validator.blacklist(req.body.name.toString(), ' -')) || 
        !validator.isAlphanumeric(validator.blacklist(req.body.forname.toString(), ' -')) || 
        !validator.isStrongPassword(req.body.password)) {
        return res.status(400).json({message: "A field is empty or incorrect !"})
    }
    const sql = "UPDATE users SET name='" + req.body.name + "', forname='" + req.body.forname + "', password='" + cryptoJS.SHA256(req.body.password).toString(cryptoJS.enc.Hex) + "' WHERE uid='" + req.params.userId + "';";
    db.query(sql, (err, data, fields) => {
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