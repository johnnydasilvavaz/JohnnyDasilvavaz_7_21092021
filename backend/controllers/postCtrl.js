const validator = require('validator');

exports.getOnePost = (req, res, next) => {
    const sql = 'SELECT text FROM posts WHERE `id`=?;';
    postId = req.params.id;
    db.query(sql, postId, (err, data, fields) => {
        if (err) return res.status(401).json({err});
        console.log(data);
        return res.status(200).json({data});
    });
}

exports.getAllPosts = (req, res, next) => {
    const sql = 'SELECT * FROM posts ORDER BY date DESC;';
    db.query(sql, (err, data, fields) => {
        if (err) return res.status(401).json({err});
        console.log(data);
        return res.status(200).json({data});
    });
}

exports.createPost = (req, res, next) => {
    if (!req.body.text && !req.file) {
        return res.status(400).json({message: "Your need to enter text or image !"})
    }
    //handle image
    let img = null;
    if (req.file) {
        img = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    const userId = req.params.userId;
    const text = validator.escape(req.body.text);
    //create and format date in format yyyy-mm-jj hh:mm:ss
    let date_ob = new Date();
    let day = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    const post = [userId, dateTime, text, 0, img]
    //create DB query
    const sql = 'INSERT INTO posts (uid, date, text, likes, imgUrl) VALUES (?) ';
    db.query(sql, [post], (err, data, fields) => {
        if (err) return res.status(401).json({err});
        return res.status(200).json({message: 'Post created !'});
    });
}

exports.modifyPost = (req, res, next) => {

}

exports.deletePost = (req, res, next) => {

}

exports.likePost = (req, res, next) => {

}