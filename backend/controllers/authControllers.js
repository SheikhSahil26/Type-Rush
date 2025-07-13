const User=require("../models/userModel")
const generateTokenAndSetCookie=require("../utils/generateToken")
const database = require('../utils/firebaseConfig');
const { get, ref, set, update,remove } = require("firebase-admin/database");

//this is signup controller
async function userSignUp(req,res){

    try{
        const {username,password}=req.body;
    
        const alreadyExist=await User.findOne({username});
    
        if(alreadyExist){
            return res.status(400).json({
                error:"user already exist!!!",
            })
        }

        const newUser=new User({ 
            username,
            password,
            
        })

        if(newUser){

            await newUser.save();

            console.log("new user created");

            const populatedUser = await User.findById(newUser._id).populate("stats");

            console.log(populatedUser);

            generateTokenAndSetCookie(newUser._id,res)

            return res.status(200).json({
                _id: populatedUser._id,
                username: populatedUser.username,

            })

        }else{
             res.status(500).json({
                error:"internal server error",
            })
        }
        console.log(newUser);
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            error:"internal server error",
        })
    }
}


// let OTP=111223;

// function generateOTP(){
//     OTP = Math.floor(100000 + Math.random() * 900000);
//     console.log("otp generated "+OTP); 
// }

//this is login controller

async function userLogin(req,res){

    try{
        const {username,password}=req.body;
        name=username
    
        const findUser=await User.findOne({username});

        if(!findUser){
            return res.status(400).json({
                error:"incorrect username or password"
            })
        }
        else if(findUser.password!==password){
            return res.status(400).json({
                error:"incorrect username or password"
            })
        }

        // generateOTP();

        generateTokenAndSetCookie(findUser._id,res)

        
        
        return res.status(200).json({
            success:"logged in successfully",
            _id: findUser._id,
            username: findUser.username,
           
        })

    }
    catch(error){
        console.log(error)
        res.status(500).json({
            error:"internal server error",
        })
    }
}

//this is log out controller

async function userLogOut(req,res){
    // const username = req.user.username;
    // console.log(username)
    // const userRef = database.ref(`myDB/online-users/${username}`);

    try{
        // await userRef.remove();

        res.cookie('jwt',"",{
            maxAge:0,
        })
        res.status(200).json({
            success:"logged out successfully",
        })
    }
    catch(error){
        res.status(500).json({
            error:"internal server error!",
        })
    }


}



module.exports={
    userSignUp,
    userLogOut,
    userLogin,
    // loginWithOTP,
}