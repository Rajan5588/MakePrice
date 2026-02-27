const ProductModel = require("../Models/ProductModel");
const UserModel = require("../Models/UserModel");




const listCreatePost = async (req, res) => {
  try {
    const userId    = req.user.userId;

     const user = await UserModel.findOne({ _id: userId });
        
    if (!user) {
      return res.status(401).json({ message: "Unauthorized user" });
    }
    const { productName, size, quantity, costPrice, sellPrice,image} =
      req.body;
   console.log(req.file,"req.file")
      if(!productName || !size || !quantity || !costPrice || !sellPrice){
          return res.status(400).json({ message: "All fields are required" });
      }
     const newPost = new ProductModel({
          userId:user._id,
          productName,
          size,
          quantity,
          costPrice,
          sellPrice,
          image: req.file ? req.file.filename : "",
     })
     await newPost.save();

     return res.status(201).json({ message: "Product created successfully", post: newPost });

  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const listUpdatePost = async (req, res) => {
     try {
          const userId    = req.user.userId;
 
     const user = await UserModel.findOne({ _id: userId });
       
          if (!user) {
               return res.status(401).json({ message: "Unauthorized" });
          }
          const { postId } = req.params;
          console.log(postId);
          const { productName, size, quantity, costPrice, sellPrice, image } =req.body;

          if (!postId) {
               return res.status(400).json({ message: "Post ID is required" });
          }

          const post = await ProductModel.findByIdAndUpdate(
               postId,
               { productName, size, quantity, costPrice, sellPrice, image },
          )
          if (!post) {
               return res.status(404).json({ message: "Post not found" });
          }
          return res.status(200).json({ message: "Post updated successfully", post });
     } catch (error) {
          return res.status(500).json({ message: "Server Error" });
     }
}


const getAllPosts = async (req, res) => {
     try {
          const posts = await ProductModel.find().populate("userId", "name email");
          return res.status(200).json({ posts });
     } catch (error) {
         return res.status(500).json({ message: "Server Error" }); 
     }
}

const getPostById = async (req, res) => {
     try {
          const { postId } = req.params;
          console.log(postId);
          if (!postId) {
               return res.status(400).json({ message: "Post ID is required" });
          }
          const post = await ProductModel.findById(postId);
          if (!post) {
               return res.status(404).json({ message: "Post not found" });
          }
          return res.status(200).json({ post });
     } catch (error) {
          return res.status(500).json({ message: "Server Error" });
     }
}



const deletePost = async (req, res) => {
     try {
          const userId    = req.user.userId;
 
     const user = await UserModel.findOne({ _id: userId });
       
          if (!user) {
               return res.status(401).json({ message: "Unauthorized" });
          }
          const { postId } = req.params;
          if (!postId) {
               return res.status(400).json({ message: "Post ID is required" });
          }
          const post = await ProductModel.findByIdAndDelete(postId);
          if (!post) {
               return res.status(404).json({ message: "Post not found" });
          }
          return res.status(200).json({ message: "Post deleted successfully" });
     } catch (error) {
          return res.status(500).json({ message: "Server Error" });
     }
}






module.exports = {listCreatePost, listUpdatePost, getAllPosts, deletePost,getPostById};