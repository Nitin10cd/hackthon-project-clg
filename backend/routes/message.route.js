import express from "express";
import { sendMessage, fetchMessages, fetchGroupMessages } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/send", sendMessage);
router.post("/fetchMessages", fetchMessages);
router.post("/fetchGroupMessages",fetchGroupMessages);
export default router;
