const express=require("express");
const router=express.Router();
const { protectedRoutes } = require("../middlewares/protectedRoutes");
const {getRoomResults,storeUsersToOnlineLobby,roomData,sendChallengeToPlayer,deleteUserFromLobby,makeRoomWhenChallengeAccepted}=require("../controllers/roomControllers");

router.post("/store-users-in-lobby",protectedRoutes,storeUsersToOnlineLobby);

router.post("/send-challenge",protectedRoutes,sendChallengeToPlayer);

router.post("/accept-challenge",protectedRoutes,makeRoomWhenChallengeAccepted)

router.get("/room-data/:roomId",roomData)

router.post("/delete-user/:username",protectedRoutes,deleteUserFromLobby)

router.get("/results/:roomId",protectedRoutes,getRoomResults);

module.exports=router