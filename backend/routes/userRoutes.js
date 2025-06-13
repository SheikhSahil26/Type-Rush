const express=require("express");
const router=express.Router();
const {getUserStats,submitTest,getUserStreak}=require("../controllers/userController");
const { protectedRoutes } = require("../middlewares/protectedRoutes");


router.get("/profile/:username",protectedRoutes,getUserStats);
router.post("/submit-test",protectedRoutes,submitTest);
// router.get("/get-streak/:username",protectedRoutes,getUserStreak);

module.exports=router