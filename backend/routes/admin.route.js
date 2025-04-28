import express from "express";
import { getAllStudentData, fetchAdmin, getAllTeachers , getAllClassroom, deleteStudent, deleteTeacher } from "../controllers/admin.controller.js";
const adminRoute = express.Router();

adminRoute.get('/get-students',getAllStudentData);
adminRoute.post("/fetchAdmin",fetchAdmin);
adminRoute.get("/get-teachers", getAllTeachers);
adminRoute.get("/get-classrooms",getAllClassroom);
adminRoute.delete("/delete-student",deleteStudent);
adminRoute.delete("/delete-teacher",deleteTeacher);

export default adminRoute;