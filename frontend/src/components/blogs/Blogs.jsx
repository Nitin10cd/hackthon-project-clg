import React, { useEffect, useState } from 'react';
import './Blogs.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useApp } from '../../context/AppContext';

const BlogsPage = () => {
  const [blogdata, setBlogdata] = useState([]);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const { user } = useApp();
  const[toggle , settoggle] = useState(false)
  const [formData, setFormData] = useState({
    blogname: '',
    content: '',
    image: '',
    tags: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/blogs/allblogs");
        if (res.data.success) {
          setBlogdata(res.data.blogs);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  const handleEditClick = (blog) => {
    setEditingBlogId(blog._id);
    setFormData({
      blogname: blog.blogname,
      content: blog.content,
      image: blog.image,
      tags: blog.tags?.join(', ') || '' // joining array into comma separated string
    });
  };

  const editHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/blogs/editblog", {
        _id: editingBlogId,
        data:  formData});
      if (res.data.success) {
        toast.success("Blog updated successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to update blog");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const deleteHandler = async (blogId) => {
    try {
      const res = await axios.post("http://localhost:5000/api/blogs/deleteblog", { _id: blogId, userrole: user.role });
      if (res.data.success) {
        toast.success("Blog deleted successfully");
        window.location.reload();
      } else {
        toast.error("You are not authorized");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("You are not authorized");
    }
  };

  return (
    <div className="blogs-page">
      <h1 className="heading">Latest Blogs</h1>
      <div className="blogs-container">
        {blogdata?.map((blog) => (
          <div key={blog._id} className="blog-card">
            <img src={blog.image} alt="Blog" className="blog-image" />
            <div className="blog-content">
              <h2 className="blog-title">Title: {blog.blogname}</h2>
              <p className="blog-description">Content: {blog.content}</p>
              <div className="blog-tags">
                {blog.tags?.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
              <div className="blog-actions">
                <button onClick={() => (handleEditClick(blog) , settoggle(true) )} className="edit-btn">✏ Edit</button>
                <button onClick={() => deleteHandler(blog._id)} className="delete-btn">❌ Delete</button>
              </div>
            </div>

            {editingBlogId === blog._id && toggle &&  (
              <form onSubmit={editHandler} className="edit-form">
                <div onClick={()=>settoggle(false)}>❌ </div>
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
                  placeholder="Content"
                  value={formData.content}
                  onChange={handleChange}
                  className="form-textarea"
                  required
                />
                <input
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  value={formData.image}
                  onChange={handleChange}
                  className="form-input"
                />
                <input
                  type="text"
                  name="tags"
                  placeholder="Comma-separated tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="form-input"
                />
                <button type="submit" className="submit-btn">Save Changes</button>
              </form>
            )}
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default BlogsPage;