const express=require("express");
const connectDB=require("./DB/db");
const dotenv=require("dotenv");
const cookieParser=require("cookie-parser");
const authRoutes=require("./Routes/auth.routes");
const postRoutes=require("./Routes/post.routes");
const path = require("path");
const cors=require("cors");
dotenv.config();


const app=express();



connectDB();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  cors({
    origin:  process.env.FRONTEND_URL, // frontend URL
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api",authRoutes);
app.use("/user",postRoutes);

   const port=process.env.PORT || 3000;

app.listen(port,()=>{
     console.log("Server is running on port 3000",port);
})




