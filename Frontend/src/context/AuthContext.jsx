import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { server } from "../Environment.js";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

const client = axios.create({
  baseURL: `${server}/api/`,
});

export const AuthProvider = ({ children }) => {
  const authContext = useContext(AuthContext);

  const [userData, setUserData] = useState(authContext);

  const handleRegister = async (name, number, email, password) => {
    try {
      let request = await client.post("/register", {
        name: name,
        email: email,
        number: number,
        password: password,
      },{
        withCredentials: true
      });

      return request.data.message;
    } catch (err) {
      throw err;
    }
  };

  const handleLogin = async (email, number, password) => {
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





useEffect(()=>{
    
const checkAuth = async () => {
    try {
      let request = await client.get("/checkAuth",{
        withCredentials: true
      });
      setUserData(request.data);
    } catch (error) {
        throw error;
    }
}
checkAuth();
},[])

  

  const handleLogout = async () => {
    try {
      await client.post("/logout",{},{
        withCredentials: true
      });

    } catch (error) {
      throw error;
    }
  };

  const data = {
    userData,
    setUserData,
    handleRegister,
    handleLogin,
    handleLogout,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
