import React, { useState } from 'react';
import './CreateBlog.css'; 
import axios from 'axios';
import { useApp } from '../../context/AppContext';
import { toast, ToastContainer } from 'react-toastify';

const CreateBlog = () => {
  const { user } = useApp();
  const [formData, setFormData] = useState({
    blogname: '',
    content: '',
    image: '',
    tags: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/blogs/createblog", {
        data: formData,
        role: user.role
      });

      if (res.data.success) {
        toast.success("Blog created successfully!");
        setFormData({ blogname: '', content: '', image: '', tags: '' });
      } else {
        toast.error(res.data.message || "Failed to create blog.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred while creating the blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-blog-container">
      <h2 className="create-blog-heading">Create New Blog</h2>

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

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CreateBlog;
