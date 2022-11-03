
const express = require('express');
const router = express.Router();
const postController = require('./../controller/postController.js');
const auth = require('./../middlewares/auth.js')
const multer = require ('multer')
const upload = multer()


router.get('/home', postController.getPosts);
router.put('/article/:id/delete', auth, postController.deletePost); //ok auth
router.post('/home', upload.single("file") , postController.createPost);
router.put('/article/:id', auth, postController.modifyPosts);  // ok auth
router.patch('/article/:id/like', auth, postController.addLikes);
router.patch('/article/:id/unlike', auth, postController.deleteLike);
router.get('/article/:id', postController.getOnePost); 

router.post('/article/:id/comment', auth, postController.addComment);
router.get('/article/:id/comment', postController.getComments); 
router.put('/comment/:id/delete', auth,  postController.suppComment); //auth
router.put('/comment/:id', auth, postController.modifyComment); //auth

//admin
router.patch('/admin', auth, postController.findUsers); //auth
router.patch('/admin/user', auth, postController.suppUser); //auth 


module.exports = router;
