import express from "express";
import { getAllStudentData, fetchAdmin } from "../controllers/admin.controller.js";
const adminRoute = express.Router();

adminRoute.get('/get-students',getAllStudentData);
adminRoute.post("/fetchAdmin",fetchAdmin);

export default adminRoute;