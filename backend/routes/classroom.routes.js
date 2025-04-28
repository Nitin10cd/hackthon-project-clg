import express from "express";
import { checkRole, createClass, createPost, getAllClass, getClassDataById, getTeacherClassses, joinClass, joinedClasses } from "../controllers/classroom.controller.js";
const classRoute = express.Router();
import upload from "../middleware/upload.js";

// routes
classRoute.post("/create-class", createClass);
classRoute.get('/get-classes',getAllClass);
classRoute.post('/joined-classes', joinedClasses);
classRoute.post('/join-class', joinClass);
classRoute.post('/get-class-by-id', getClassDataById);
classRoute.post('/check-role',checkRole);
classRoute.post('/create-post',upload.array('files'),createPost);
classRoute.post('/teacherClasses', getTeacherClassses);

export default classRoute;