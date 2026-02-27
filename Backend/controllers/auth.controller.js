const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  try {
    const { name, email, number, password } = req.body;
    // Here you can add your logic to save the user to the database
if (!name || !email || !number || !password) {
      return res.status(400).json({ message: "All fields are required" });
}
    const user = await UserModel.findOne({
      email
  });
    if (user) {
      return res.status(401).json({ message: "user exist already" });
    }
    console.log(user)
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)
    const newUser = new UserModel({
      name,
      email,
      number,
      password: hashedPassword,
    });
     

    await newUser.save();
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
 res.cookie("token", token, {
  httpOnly: true,
  secure: true,        // production me true hona hi chahiye
  sameSite: "none",    // cross origin ke liye mandatory
  maxAge: 7 * 24 * 60 * 60 * 1000
});
    
  return  res
      .status(201)
      .json({ message: "user created successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error creating user", error: error.message });
  }
};



const loginUser=async(req,res)=>{
  try {
    const { email,number, password } = req.body;
    console.log(email,number,password)
    if(!email ||  !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await UserModel.findOne({
      $or: [{ email: email }, { number: number }],
    });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    console.log(token)
  res.cookie("token", token, {
  httpOnly: true,
  secure: true,        // production me true hona hi chahiye
  sameSite: "none",    // cross origin ke liye mandatory
  maxAge: 7 * 24 * 60 * 60 * 1000
});
  return  res.json({ message: "login successful", user, token });
  } catch (error) {
  return  res.status(500).json({ message: "error logging in", error: error.message })
  }
}

const checkAuth=async(req,res)=>{
       const token = req.cookies.token;
     
        if (!token) {
          return res.status(401).json({ message: "Not authorized" });
        }
      
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user= await UserModel.findById(decoded.userId).select("-password");
          // yaha userId mil jayega
          return res.json({ user });
        } catch (error) {
          return res.status(401).json({ message: "Invalid token", error: error.message });
        }
}

const logOut=(req,res)=>{
  try{
    res.cookie("token", "", { expires: new Date(0) });
   
  
  return  res.json({ message: "logout successful" });
  }catch(error){
     return res.status(500).json({ message: "error logging out", error: error.message })
  }
}

module.exports = { registerUser, loginUser ,logOut ,checkAuth};