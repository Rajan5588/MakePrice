const express=require("express");
const authMiddleware = require("../middleware/auth");
const { listCreatePost, listUpdatePost, deletePost, getAllPosts, getPostById } = require("../controllers/post.conroller");
const router=express.Router();
const multer=require("multer");
const storage=multer.diskStorage({
     destination:function(req,file,cb){
          cb(null,"uploads/")
     },
     filename:function(req,file,cb){
          cb(null,file.originalname)
     }
})



const upload=multer({storage:storage});

 router.route("/post/create").post(authMiddleware,upload.single("image"), listCreatePost);
  router.route("/post/update/:postId").post(authMiddleware, listUpdatePost);
  router.route("/post/delete/:postId").delete(authMiddleware, deletePost);
  router.route("/post/getAllPost").get(authMiddleware, getAllPosts);
  router.route("/post/:postId").get(authMiddleware, getPostById);

   

module.exports=router;