import express from "express";
import { fetchDetails, getUsers, addFriend } from "../controllers/student.controller.js";

const studentRoutes=express.Router();

studentRoutes.post("/fetchDetails",fetchDetails);
studentRoutes.get("/getUsers",getUsers);
studentRoutes.post("/addFriend",addFriend);

export default studentRoutes;