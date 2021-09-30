const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/postCtrl');
const auth = require('../middlewares/auth');

router.get('/:id', auth, postCtrl.getOnePost);
router.get('/', auth, postCtrl.getAllPosts);
router.post('/', auth, postCtrl.createPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.put('/:id', auth, postCtrl.modifyPost);
router.post('/:id/like', auth, postCtrl.likePost);
router.post('/comments/:id', auth, postCtrl.createComment);
router.get('/comments/:id', auth, postCtrl.getComments);

module.exports = router;