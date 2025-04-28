import express from "express"
import { createCollege, studentRegister,getAllColleges, loginController, teacherRegister, adminRegister } from "../controllers/auth.controller.js";
const authRoutes = express.Router();

authRoutes.post("/stuRegister",studentRegister);
authRoutes.post("/teacherRegister", teacherRegister)
authRoutes.post("/addClg", createCollege)
authRoutes.get("/allColleges",getAllColleges);
authRoutes.post("/login",loginController);
authRoutes.post("/admin-register",adminRegister);

export default authRoutes;