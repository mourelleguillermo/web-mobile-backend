const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

router.post('/users', auth, userController.createUser);
router.get('/users', auth, userController.getAllUsers);

router.post('/posts', auth, postController.createPost);
router.get('/posts', auth, postController.getPosts);

router.post('/comments', auth, commentController.createComment);

module.exports = router;
