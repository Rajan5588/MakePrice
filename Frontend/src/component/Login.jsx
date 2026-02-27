
import React from 'react'
import { AuthContext } from '../context/AuthContext';




  export const Login=()=>{
const [name,setName]=React.useState();
const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [number, setNumber] = React.useState();
    const [error, setError] = React.useState();
    const [message, setMessage] = React.useState("");


    const [formState, setFormState] = React.useState(0);

    const [open, setOpen] = React.useState(false)


    const { handleRegister, handleLogin, userData } = React.useContext(AuthContext);

    let handleAuth = async () => {
        try {
            if (formState === 0) {

                let result = await handleLogin(email,number, password)
               

 console.log(userData)
            }
            if (formState === 1) {
                let result = await handleRegister(name,number, email, password);
                console.log(result);
              
                setMessage(result.message);
                setOpen(true);
                setError("")
                setFormState(0)
                setPassword("")
            }
        } catch (err) {

            console.log(err);
            let message = (err.response.data.message);
            setError(message);
        }
    }







     return (
         <div className="flex flex-col items-center justify-center h-screen w-full p-1.2rem bg-zinc-100ap-4">
            
         <div   style={{padding:"40px"}} className='w-[90%]   bg-white rounded-md shadow-2xl shadow-zinc-500 flex flex-col justify-center lg:w-[30%] gap-4'>
                <h1 className="text-2xl font-bold text-center mb-4"> {formState === 0 ? "Login " : "Register"}</h1>
                <p className={`${userData?.message ? "text-green-500" : "text-red-500"}`}>{userData?userData.message:error}</p>
                   <div className="bg-white p-4 rounded-lg shadow-md w-full">
                     <input    onChange={(e) => setEmail(e.target.value)} value={email}    name="email"    style={{padding:"10px"}} type="text" className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none" placeholder="Enter your email" /> 
                     {formState===1? <input     onChange={(e) => setName(e.target.value)} value={name}    name="name"    style={{padding:"10px"}} type="text" className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none" placeholder="Enter your name" />:" "}
                     Or
                      <input     onChange={(e) => setNumber(e.target.value)} value={number}    name="number"    style={{padding:"10px"}} type="Number" className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none" placeholder="Enter your mobile number" />
               </div>
               <div  className="w-full p-4 rounded-lg shadow-md">
                      <input    onChange={(e) => setPassword(e.target.value)} value={password}    name="password"    style={{padding:"10px"}} type="password" className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none " placeholder="Enter your password" />
               </div>
               <button 
               
                 onClick={handleAuth}
               className="bg-blue-500 text-white px-5 py-4 rounded-md hover:bg-blue-600 focus:outline-none">  {formState === 0 ? "Login " : "Register"}</button>
         </div>

         <div>
             <button 
               style={{padding:"1rem", marginTop:"2rem"}}
                 onClick={() => setFormState(formState === 0 ? 1 : 0)}
               className="bg-blue-500 text-white px-5 py-4 rounded-md hover:bg-blue-600 focus:outline-none">  {formState === 0 ? "Switch to Register" : "Switch to Login"}</button>
         </div>
         </div>  
     )
}