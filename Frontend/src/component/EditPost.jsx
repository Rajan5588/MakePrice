import React, { useContext, useState } from "react";
import { PostContext } from "../context/PostContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../Environment";
const EditPost = () => {
  const [productName, setProductName] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [image, setImage] = useState();
  const [message, setMessage] = useState();
  const {singlePost, setSinglePost} = useContext(PostContext);
  const { postId } = useParams();
  console.log(useParams(), "useParams");
  const navigate = useNavigate();

  const client = axios.create({
    baseURL: `${server}/user`,
  });

 const  handleItemEdit = async () => {
    try {
      const response = await client.post(
        `/post/update/${postId}`,
      
        {
          productName,
          size,
          quantity,
          costPrice,
          sellPrice,
          image,
        },
          {
          withCredentials: true
        }
      )

      setSinglePost(response.data.post);
      setMessage(response.data.message);
      navigate(`/view/${postId}`);
    } catch (error) {
      console.log(error);
    }
  };
if (!singlePost) {
  return <p className="text-center mt-10">Loading...</p>;
}
return (
  <div
    style={{ marginTop: "1.2rem" }}
    className="w-full h-screen flex  items-center justify-start  flex-col"
  >
    <h1 className="text-3xl font-bold  whitespace-nowrap ...">
      Edit Item Product
    </h1>
    <div
      style={{ padding: "1.2rem", marginTop: "1.2rem" }}
      className="w-[99.8%]  flex items-center flex-col gap-y-3 border-2 lg:w-[60%] border-gray-800 rounded-md p-[1.2rem] mt-4"
    >
      {message && <p className="text-green-500">{message}</p>}
      <div className="w-full  flex items-center gap-[1.2rem] justify-around">
        <input
          value={singlePost?.productName || productName}
          onChange={(e) => setProductName(e.target.value)}
          name="productName"
          type="text"
          className=" h-10 border border-gray-300 rounded-md p-2 w-full  "
          placeholder="Enter productName"
        />
        <input
          value={singlePost?.size || size}
          onChange={(e) => setSize(e.target.value)}
          name="size"
          type="text"
          className="border border-gray-300 rounded-md p-2 w-full max-w-xs  h-10  "
          placeholder="Enter size"
        />
      </div>
      <div className="w-full ">
        <input
          value={singlePost?.quantity || quantity}
          onChange={(e) => setQuantity(e.target.value)}
          name="quantity"
          type="text"
          style={{ width: "100%" }}
          className="border  h-10  border-gray-300 rounded-md p-2 w-full "
          placeholder="Enter item quantity"
        />
      </div>
      <div className="w-full flex items-center gap-[1.2rem] justify-around">
        <input
          value={singlePost?.costPrice || costPrice}
          onChange={(e) => setCostPrice(e.target.value)}
          name="costPrice"
          type="text"
          className="border border-gray-300 rounded-md p-2 w-full h-10"
          placeholder="Enter item  costPrice"
        />
        <input
          value={singlePost?.sellPrice || sellPrice}
          onChange={(e) => setSellPrice(e.target.value)}
          name="sellPrice"
          type="text"
          className="border border-gray-300 rounded-md p-2 w-full max-w-xs h-10"
          placeholder="Enter item sellPrice"
        />
      </div>
      <div>
        <button
          onClick={handleItemEdit}
          className="bg-blue-700 text-white w-[5.1rem] h-[2.1rem] rounded-md shadow-2xl shadow-blue-900 hover:scale-105"
        >
          Edit
        </button>
      </div>
    </div>
  </div>
);
}
export default EditPost;
