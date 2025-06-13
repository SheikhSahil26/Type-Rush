const jwt=require('jsonwebtoken')
const User=require("../models/userModel");

const protectedRoutes=async(req,res,next)=>{
    try{
        const token=req.cookies.jwt;

        if(!token) return res.status(400).json({error:'You are unauthorized'});

        const decoded=jwt.verify(token,process.env.SECRET_SESSION_KEY)

        if(!decoded){
            return res.status(401).json({error:"unauthorized,invalid token"})
        }

        const user=await User.findById(decoded.userId).select("-password");

        if(!user) return res.status(400).json({error:"user not found"});

        req.user=user;
        next();

    }
    catch(error){
        console.log(error)
        console.log("error in protected route middle ware");
        res.status(500).json({
            error:"internal server error"
        })
    }
}

module.exports={
    protectedRoutes,
}