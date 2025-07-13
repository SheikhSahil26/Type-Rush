const express=require("express");
const router=express.Router();
const {userSignUp,userLogin,userLogOut}=require("../controllers/authControllers")
const { protectedRoutes } = require("../middlewares/protectedRoutes");


router.post("/signup",userSignUp);

router.post("/login",userLogin);

router.post("/logout",userLogOut);


module.exports=router