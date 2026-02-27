import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../Environment";
import { PostContext } from "../context/PostContext";
import { motion } from "framer-motion";
const ViewAllPost = () => {

  const { postId } = useParams();
  console.log(useParams(), "useParams");
  const {singlePost, setSinglePost} = useContext(PostContext);
  const client = axios.create({
  baseURL: `${server}/user`,
});

const navigate = useNavigate();

  useEffect(() => {

    const getSinglePost = async () => {
      try {
        const response = await client.get(`/post/${postId}`, {
          withCredentials: true,
        });

        setSinglePost(response.data.post);
      console.log(response.data.post,"single post response")
      } catch (error) {
        console.log(error);
      }
    };

    getSinglePost();

  }, [postId]);

  if (!singlePost) {
    return <p className="text-center mt-10">Loading...</p>;
  }



const handleDelete = async (postId) => {
  try {
    await client.delete(`/post/delete/${postId}`, {
      withCredentials: true,
    })
    navigate("/home");
  } catch (error) {
    throw error;
  }
}

  return (
    <motion.div initial={{opacity: 0,x:-60}} animate={{opacity: 1,x:0}} transition={{duration:0.7}} className="w-screen h-[90dvh] flex  justify-center ">
      <div className=" w-[90%]   py-[1.3rem] border backdrop-blur-sm border-gray-500 flex flex-col items-center justify-around shadow-2xl shadow-amber-50  rounded-md p-4 m-[1.2rem]">
        <h2 className="text-3xl font-bold">{singlePost.productName}</h2>
        <p className="mt-2 font-extrabold text-2xl">Size: {singlePost.size}</p>
        <p className="font-bold mt-2 text-2xl">Quantity: {singlePost.quantity}</p>
        <p className="font-bold mt-2 text-2xl">Cost Price: ₹{singlePost.costPrice}</p>
        <p className="font-bold mt-2 text-2xl">Sell Price: ₹{singlePost.sellPrice}</p>
            {singlePost.image && (
              <img
                src={`${server}/uploads/${singlePost.image}`}
                alt="Product"
                className="w-48 h-48 object-contain mt-4"
              />
            )}
           <div className="w-full flex items-center justify-around">
               <motion.button style={{padding:"0.4rem"}} onClick={() => navigate(`/edit/${postId}`)} className="mt-4 px-[1.2rem] py-3 rounded-xl  font-bold flex items-center gap-3 bg-gradient-to-br from-black/80 to-black/90 border border-white/10 text-white text-sm shadow-[0_25px_60px_rgba(0,0,0,0.7)] ">
              Edit Post
            </motion.button>
            <motion.button style={{padding:"0.4rem"}} onClick={() => navigate(`/home`)} className="mt-4 px-[1.2rem] py-3 rounded-xl  font-bold flex items-center gap-3 bg-gradient-to-br from-black/80 to-black/90 border border-white/10 text-white text-sm shadow-[0_25px_60px_rgba(0,0,0,0.7)] ">
              return to home
            </motion.button>
             <motion.button style={{padding:"0.4rem"}} onClick={() => handleDelete(postId)} className="mt-4 px-[1.2rem] py-3 rounded-xl  font-bold flex items-center gap-3 bg-gradient-to-br from-black/80 to-black/90 border border-white/10 text-white text-sm shadow-[0_25px_60px_rgba(0,0,0,0.7)] ">
              delete Post
            </motion.button>
           </div>
      </div>
    </motion.div>
  );
};

export default ViewAllPost;