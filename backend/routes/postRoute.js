const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/postCtrl');
const rateLimiter = require('express-rate-limit');
const auth = require('../middlewares/auth');

router.get('/getOnePost', auth, postCtrl.getOnePost);
router.get('/getAllPosts', auth, postCtrl.getAllPosts);
router.post('/createPost', auth, postCtrl.createPost);
router.post('/deletePost', auth, postCtrl.deletePost);
router.put('/modifyPost', auth, postCtrl.modifyPost);
router.post('/likePost', auth, postCtrl.likePost);

module.exports = router;