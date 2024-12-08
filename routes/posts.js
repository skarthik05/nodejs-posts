const express = require('express');
const router = express.Router();
const { upload } = require('../config');
const { getPosts, createPost } = require('../controllers/postController');

router.get('/', getPosts); 
router.post('/',upload.single('image'), createPost);

module.exports = router;
