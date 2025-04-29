import express from "express";
import { checkRole, createClass, createPost, createTest, getAllClass, getClassDataById, getTeacherClassses, getTestResults, getTestsForClassroom, joinClass, joinedClasses, startTestForStudent, submitTest } from "../controllers/classroom.controller.js";
const classRoute = express.Router();
import upload from "../middleware/upload.js";
import { get } from "mongoose";

// routes
classRoute.post("/create-class", createClass);
classRoute.get('/get-classes',getAllClass);
classRoute.post('/joined-classes', joinedClasses);
classRoute.post('/join-class', joinClass);
classRoute.post('/get-class-by-id', getClassDataById);
classRoute.post('/check-role',checkRole);
classRoute.post('/create-post',upload.array('files'),createPost);
classRoute.post('/teacherClasses', getTeacherClassses);
classRoute.post("/createTest",createTest);
classRoute.get("/get-test/:classroomId",getTestsForClassroom);
classRoute.get("/start-test/:testId",startTestForStudent);
classRoute.post("/submit",submitTest);
classRoute.get("/test-result/:testId", getTestResults);


export default classRoute;