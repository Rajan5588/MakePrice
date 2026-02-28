import React, { useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { PostContext } from "../context/PostContext";

const Navbar = () => {
const {  userData, handleLogout } = React.useContext(AuthContext);
  const {searchPost,setSearchPost,userPostData,handleAllPost}=React.useContext(PostContext);

const navigate=useNavigate()

        useEffect(() => {
       if(userData){
       
          navigate("/home")
       }else{
        navigate("/login")
       }
      }, [userData])

  const token = userData;
      // handleLogout=()=>{}

  return (
    <nav  className="w-full  h-[3.1rem] bg-zinc-500 color-black flex items-center justify-between">
      <div className="w-[30%] p-[1.2rem] h-full flex items-center justify-center placeholder-muted ">
        <h1 className="text-2xl font-bold whitespace-nowrap ... md:leading-0  "><Link to="/home">Make Price</Link></h1>

      </div>
      <div className="w-[50%]  ">
       
       
          <div  className="w-full invisible lg:visible  flex bg-white rounded-md   gap-2 px-2  items-center justify-center">
               <CiSearch className="text-2xl cursor-pointer" />
              <input
              type="text"
              onChange={(e)=>setSearchPost(e.target.value)}
                value={searchPost}
              className=" w-full  outline-none"
              placeholder="Search item & category"
            />
                
        </div>
       
      </div>
       <div className="w-[20%] flex items-center justify-center gap-4">
      <div className="bg-yellow-700 text-white w-[5.1rem] h-[2.1rem] rounded-md shadow-2xl shadow-yellow-900 hover:scale-105 flex items-center justify-center">{token?<p onClick={handleLogout}>"Logout"</p>:"Login"}</div>
        </div>
    </nav>
  );
};

export default Navbar;
