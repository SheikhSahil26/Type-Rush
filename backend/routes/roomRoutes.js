const express=require("express");
const router=express.Router();
const { protectedRoutes } = require("../middlewares/protectedRoutes");
const {storeUsersToOnlineLobby,sendChallengeToPlayer}=require("../controllers/roomControllers");

router.post("/store-users-in-lobby",storeUsersToOnlineLobby);

router.post("/send-challenge",sendChallengeToPlayer);

module.exports=router