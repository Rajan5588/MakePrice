const express= require("express");
const { loginUser, registerUser,getText, logOut, checkAuth } = require("../controllers/auth.controller")

const router=express.Router();


 router.route("/register").post(registerUser)
  router.route("/login").post(loginUser);
  router.route("/checkAuth").get(checkAuth);
   router.route("/logout").post(logOut);

   

module.exports=router;