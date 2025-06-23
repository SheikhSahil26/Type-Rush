const dotenv=require("dotenv")
dotenv.config();
const cookieParser=require("cookie-parser");
const express=require('express');
const mongoose=require('mongoose');
const path=require('path');


//cron job for story deletion


// console.log("cron job activated!!!!")


const connectToMongoDB=require("./db/connectToMongoDB");

const app=express();
const PORT=process.env.PORT || 1000

const cors=require("cors")

app.use(cors({
    origin:["http://localhost:5174","https://type-rush-three.vercel.app"],//this is frontend URL for cors 
    methods:['GET','POST','DELETE','PUT'],
    credentials:true,
}))



app.use(express.static(path.join(__dirname,'public')));

//middlewares
app.use(express.json());    //to handle json input
app.use(express.urlencoded({extended:false}));   //to handle form input
app.use(cookieParser());   //parsing cookie


//Routes

const authRoutes=require("./routes/authRoutes");
const userRoutes=require("./routes/userRoutes");
const roomRoutes=require("./routes/roomRoutes");

app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/room",roomRoutes);

app.listen(PORT,()=>{
    connectToMongoDB();
    console.log("server started at port "+PORT);
})