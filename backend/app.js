require('dotenv').config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const mysql = require('mysql2');

const authRoutes = require('./routes/authRoute');
const meRoutes = require('./routes/meRoute');
const postRoutes = require('./routes/postRoute');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

db.query('CREATE DATABASE IF NOT EXISTS groupomania CHARACTER SET utf8;');
db.query('USE ' + process.env.DATABASE + ';');
db.query('SET NAMES utf8;')
db.query('CREATE TABLE IF NOT EXISTS users (`id` INT(11) NOT NULL AUTO_INCREMENT, `name` VARCHAR(125) NOT NULL, `forname` VARCHAR(125) NOT NULL, `email` VARCHAR(125) NOT NULL, `password` VARCHAR(125) NOT NULL, `uid` VARCHAR(32) NOT NULL, PRIMARY KEY (`id`) USING BTREE, UNIQUE INDEX `email` (`email`) USING BTREE, UNIQUE INDEX `uid` (`uid`) USING BTREE) CHARACTER SET utf8;');
db.query('CREATE TABLE IF NOT EXISTS posts (`id` INT(11) NOT NULL AUTO_INCREMENT, `uid` VARCHAR(125) NOT NULL, `date` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, `text` TEXT, `imgUrl` VARCHAR(125), `likes` INT(11) NOT NULL, PRIMARY KEY (`id`) USING BTREE) CHARACTER SET utf8;');
db.query('CREATE TABLE IF NOT EXISTS comments (`id` INT(11) NOT NULL AUTO_INCREMENT, `uid` VARCHAR(125) NOT NULL, `date` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, `text` TEXT, `postid` INT(11) NOT NULL, PRIMARY KEY (`id`) USING BTREE) CHARACTER SET utf8;');
db.query('CREATE TABLE IF NOT EXISTS likes (`id` INT(11) NOT NULL AUTO_INCREMENT, `uid` VARCHAR(125) NOT NULL, `postid` INT(11), PRIMARY KEY (`id`) USING BTREE) CHARACTER SET utf8;');

db.connect((error) => {
    if (error) throw error;
    console.log('connexion réussie !')
});

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', authRoutes);
app.use('/api/me', meRoutes);
app.use('/api/post', postRoutes);

module.exports = app;