import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { server } from "../Environment.js";

export const PostContext = createContext();

const client = axios.create({
  baseURL: `${server}/user`,
});

export const PostProvider = ({ children }) => {
const [userPostData, setUserPostData] = useState([]);
   const [singlePost, setSinglePost] = useState(null);
   const [searchPost,setSearchPost]=useState("")
  // const handlePostCreate = async (productName, size, quantity, costPrice, sellPrice,image) => {
  //   try {
  //     let request = await client.post("/post/create", {
  //       productName: productName,
  //       size: size,
  //       quantity: quantity,
  //       costPrice: costPrice,
  //       sellPrice: sellPrice,
  //       image:image
     
  //     },{
  //       withCredentials: true
  //     });
   
    
  //   return request.data.message;
     
  //   } catch (err) {
  //     return err.response.data.message;
  //   }
  // };


  const handlePostCreate = async (
  productName,
  size,
  quantity,
  costPrice,
  sellPrice,
  image
) => {
  try {
    const formData = new FormData();

    formData.append("productName", productName);
    formData.append("size", size);
    formData.append("quantity", quantity);
    formData.append("costPrice", costPrice);
    formData.append("sellPrice", sellPrice);
    formData.append("image", image); // 👈 file yaha attach hoga

    let request = await client.post("/post/create", formData, {
      withCredentials: true
    });

    return request.data.message;

  } catch (err) {
    return err.response?.data?.message;
  }
};

  const handleAllPost = async () => {
    try {
         let responce = await client.get("/post/getAllPost", {withCredentials: true})
         setUserPostData(responce.data.posts);
         console.log(responce,"responce")
    } catch (error) {
      throw error;
    }
  }


  useEffect(()=>{
    console.log(userPostData,"userPostData")
  },[])

  const handlePostUpdate = async (email, number, password) => {
    try {
      let request = await client.post("/login", {
        email: email,
        number: number,
        password: password,
      },{
        withCredentials: true
      });

      setUserData(request.data);
    } catch (err) {
      throw err;
    }
  };





// useEffect(()=>{
    
// const checkAuth = async () => {
//     try {
//       let request = await client.get("/checkAuth",{
//         withCredentials: true
//       });
//       setUserData(request.data);
//     } catch (error) {
//         throw error;
//     }
// }
// checkAuth();
// },[])

  

  const data = {
    userPostData,
    setUserPostData,
    handlePostCreate,
   handlePostUpdate,
handleAllPost,
singlePost, setSinglePost,
searchPost,setSearchPost
  };

  return <PostContext.Provider value={data}>{children}</PostContext.Provider>;
};
