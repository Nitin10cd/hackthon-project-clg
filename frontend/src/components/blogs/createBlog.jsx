import React, { useState } from 'react';
import './CreateBlog.css'; 
import axios from 'axios';
import { useApp } from '../../context/AppContext';
import {toast , ToastContainer} from "react-toastify"
const CreateBlog = () => {
  const [formData, setFormData] = useState({
    blogname: '',
    content: '',
    image: '',
    tags: '' ,
    
  });
  const{user} = useApp();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
     const res = await axios.post("http://localhost:5000/api/blogs/createblog" , {data : formData , role : user.role });
     console.log(res.data);
     if(res.data.success){
      setLoading(false);
      setFormData({
        blogname : '',
        content : '',
        image : '',
        tags : ''
      });
      setSuccessMessage("Blogs Created!!")
      toast.success("Blog created successfully");
      
     }
    }
    catch(error){
      setErrorMessage("Blogs Already created!!")
        console.log(error.message);
    }
    console.log(formData)
  };

  return (
    <div className="create-blog-container">
      <h2 className="create-blog-heading">Create New Blog</h2>

      {successMessage && <div className="alert success">{successMessage}</div>}
      {errorMessage && <div className="alert error">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="create-blog-form">
        <input
          type="text"
          name="blogname"
          placeholder="Blog Title"
          value={formData.blogname}
          onChange={handleChange}
          className="form-input"
          required
        />
        <textarea
          name="content"
          placeholder="Blog Content"
          value={formData.content}
          onChange={handleChange}
          className="form-textarea"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={formData.image}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={handleChange}
          className="form-input"
        />

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Publishing...' : 'Publish Blog'}
        </button>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default CreateBlog;