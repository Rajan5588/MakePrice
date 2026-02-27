import React from "react";
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/authcontext.jsx'
import { PostProvider } from "./context/PostContext.jsx";

createRoot(document.getElementById('root')).render(
        
     <AuthProvider>
      <PostProvider>
      <BrowserRouter>
<App />
</BrowserRouter>
</PostProvider>
  </AuthProvider>
)
