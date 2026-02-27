import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { PostContext } from '../context/PostContext';
const Home = () => {

      const {  userData } = React.useContext(AuthContext);
      const Navigate=useNavigate()

       const {searchPost,setSearchPost,userPostData,handleAllPost}=useContext(PostContext)

     const  handleAllPosts=async()=>{
      const response=await handleAllPost();
      console.log(response,"response")
     }

 
  useEffect(() => {
  console.log(userPostData, "UPDATED DATA");
}, [userPostData]);


const filteredPosts = (userPostData || []).filter((post) =>
  (post?.productName || "").toLowerCase().includes((searchPost || "").toLowerCase()) ||
  (post?.description || "").toLowerCase().includes((searchPost || "").toLowerCase())
);






  return (
    <div>
      <h1 className='text-3xl font-bold text-center mt-4'>Welcome to Make Price</h1>
      <p className='text-center mt-2 text-gray-600 '>Your one-stop solution for price comparison and smart shopping.</p>
        <div className='w-full flex items-center mt-2 flex-col-reverse gap-4 '>
          <div className='w-full  flex items-center justify-center gap-4'>
             <button onClick={()=>Navigate("/additem")} style={{padding:"0.5rem",marginTop:"1rem"}} className='bg-yellow-700 text-white  rounded-md shadow-2xl shadow-yellow-900 hover:scale-105 inline'>Get AddItem</button>
              <button onClick={handleAllPosts} style={{padding:"0.5rem",marginTop:"1rem"}} className='bg-green-700 text-white  rounded-md shadow-2xl shadow-green-900 hover:scale-105 inline'>Get All Post</button>

          </div>



{searchPost?.trim() === "" ? (

  // 🔵 Jab search empty hai → all posts
                       userPostData.length > 0 ? userPostData.map((post) => (
            <div key={post._id} className="w-[90.4%] py-[1.3rem] border border-gray-300 flex justify-around rounded-md p-4 m-2">
              <h2 className="text-xl font-semibold">{post.productName}</h2>
              
              <p>Sell Price: ${post.sellPrice}</p>
              <Link to={`/view/${post._id}`} className="text-blue-500 hover:underline">View Details</Link>
            </div>
          )) : <p className='text-center mt-4 text-gray-500'>No posts available. Please add some items to see them here.</p>
          
          )  :(
         filteredPosts.length > 0 ?  
       <div className='w-full flex items-center justify-center gap-4 flex-wrap mt-4'>
          {filteredPosts.map((post) => (
            <div key={post._id} className="w-[90.4%] py-[1.3rem] border border-gray-300 flex justify-around rounded-md p-4 m-2">
              <h2 className="text-xl font-semibold">{post.productName}</h2>
              
              <p>Sell Price: ${post.sellPrice}</p>
              <Link to={`/view/${post._id}`} className="text-blue-500 hover:underline">View Details</Link>
            </div>
          ))}
        </div>:<p className='text-center mt-4 text-gray-500'>No posts available. Please add some items to see them here.</p>
       )
         

         

        }
          </div>
    </div>
    
  )
}

export default Home