import React, { useContext, useEffect, useState } from 'react'
import { PostContext } from '../context/PostContext'
import { Navigate } from 'react-router-dom'

const HandleItemPrice = () => {
     //   productName,
     //      size,
     //      quantity,
     //      costPrice,
     //      sellPrice,
    const { handlePostCreate} = useContext(PostContext)
    const [productName, setProductName]=useState("")
     const [size, setSize]=useState("")
     const [quantity, setQuantity]=useState("")
     const [costPrice, setCostPrice]=useState("")
     const [sellPrice, setSellPrice]=useState("")
     const [image, setImage]=useState()
  const [message, setMessage] = useState();
     const handleItemPrice1=async()=>{
          try {
               const response = await handlePostCreate(
                    productName,
                    size,
                    quantity,
                    costPrice,
                    sellPrice,
                    image
               )
               console.log(response,"response")
               setMessage(response);
               Navigate("/home")
          } catch (error) {
               throw error;

          }
     }

  return (
    <div style={{marginTop:"1.2rem"}} className="w-full h-screen flex  items-center justify-start  flex-col">
      <h1 className="text-3xl font-bold  whitespace-nowrap ...">Handle Item Price</h1>
      <div style={{padding:"1.2rem",marginTop:"1.2rem"}} className='w-[99.8%]  flex items-center flex-col gap-y-3 border-2 lg:w-[60%] border-gray-800 rounded-md p-[1.2rem] mt-4'>
          {message && <p className="text-green-500">{message}</p>}
         <div className='w-full  flex items-center gap-[1.2rem] justify-around'>
          <input value={productName} style={{padding:"0.5rem"}} onChange={(e)=>setProductName(e.target.value)}name='productName' type="text" className=" h-10 border border-gray-300 rounded-md p-2 w-full  " placeholder="Enter productName" />
          <input value={size} style={{padding:"0.5rem"}} onChange={(e)=>setSize(e.target.value)} name='size' type="text" className="border border-gray-300 rounded-md p-2 w-full max-w-xs  h-10  " placeholder="Enter size" />
         </div>
         <div className='w-full '>
          <input value={quantity} onChange={(e)=>setQuantity(e.target.value)} name='quantity' type="text" style={{width:"100%",padding:"0.5rem"}} className="border  h-10  border-gray-300 rounded-md p-2 w-full " placeholder="Enter item quantity" />
         <input  style={{padding:"0.5rem"}} onChange={(e)=>setImage(e.target.files[0])} name='image' type="file" className="border border-gray-300 rounded-md p-2 w-full max-w-xs h-10" placeholder="Enter item image" />

         </div>
         <div className='w-full flex items-center gap-[1.2rem] justify-around'>
         <input value={costPrice} style={{padding:"0.5rem"}} onChange={(e)=>setCostPrice(e.target.value)} name='costPrice' type="text" className="border border-gray-300 rounded-md p-2 w-full h-10" placeholder="Enter item  costPrice" />
         <input value={sellPrice} style={{padding:"0.5rem"}} onChange={(e)=>setSellPrice(e.target.value)} name='sellPrice' type="text" className="border border-gray-300 rounded-md p-2 w-full max-w-xs h-10" placeholder="Enter item sellPrice" />
         </div>

         <div>
          <button onClick={handleItemPrice1} className="bg-blue-700 text-white w-[5.1rem] h-[2.1rem] rounded-md shadow-2xl shadow-blue-900 hover:scale-105">Submit</button>
         </div>

      </div>
    </div>
  )
}

export default HandleItemPrice