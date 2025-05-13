const express=require("express");
const router=express.Router();
const {userSignUp,userLogin,userLogOut}=require("../controllers/authControllers")


router.post("/signup",userSignUp);

router.post("/login",userLogin);


module.exports=router