require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken.userId;
        const sql = 'SELECT uid FROM users WHERE uid=?;';
        db.query(sql, userId, (err, data, fields) => {
            if (err) throw res.status(404).json({err});
            if (!(data.length > 0)) throw res.status(404).json({error: 'Accès non autorisé'});
            if (userId && data[0].uid !== userId) {
                throw res.status(403).json({message: '403: unauthorized request'});
            } else {
                req.params.userId = userId;
                next();
            }
        });
    } catch (error) {
        return res.status(403).json({ error });
    }
}