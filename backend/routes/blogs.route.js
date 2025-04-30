import express from 'express'
import {  createBlog, deleteblog, editBlog, getAllBlogs } from '../controllers/blog.controller.js';

const Blogrouter = express.Router();

Blogrouter.post('/createblog' , createBlog);
Blogrouter.get('/allblogs' , getAllBlogs);
Blogrouter.post("/deleteblog" , deleteblog)
Blogrouter.post("/editblog" , editBlog);

export default Blogrouter ;