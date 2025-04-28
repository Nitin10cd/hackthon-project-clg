import express from "express";
import {createGroupChat,fetchGroup, fetchFriends, fetchGroups, fetchUser} from "../controllers/chat.controller.js";


const router=express.Router();

router.post("/create-group-chat",createGroupChat);
router.post("/groups",fetchGroups);
router.post("/friends",fetchFriends);
router.post("/fetchUser",fetchUser);
router.post("/fetchGroup", fetchGroup);

export default router;