import express from 'express'
import { BlogCreation, DeleteBlog, EditBlog, GetAllBlogs } from '../controllers/blog.controller.js';

const Blogrouter = express.Router();

Blogrouter.post('/createblog' , BlogCreation);
Blogrouter.get('/allblogs' , GetAllBlogs);
Blogrouter.post("/deleteblog" , DeleteBlog)
Blogrouter.post("/editblog" , EditBlog);

export default Blogrouter ;