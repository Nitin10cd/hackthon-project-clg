import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useApp } from '../../context/AppContext';
import { toast, ToastContainer } from 'react-toastify';
import './Blogs.css';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [editBlog, setEditBlog] = useState(null);
  const { user } = useApp();

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs/allblogs");
      if (res.data.success) setBlogs(res.data.blogs);
    } catch (err) {
      toast.error("Failed to fetch blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.post("http://localhost:5000/api/blogs/deleteblog", { _id: id, userrole: user.role });
      if (res.data.success) {
        toast.success(res.data.message);
        fetchBlogs();
      } else toast.error(res.data.message);
    } catch (err) {
      toast.error("Deletion failed");
    }
  };

  const handleEdit = (blog) => {
    setEditBlog(blog);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/blogs/editblog", {
        _id: editBlog._id,
        data: {
          blogname: editBlog.blogname,
          content: editBlog.content,
          image: editBlog.image,
          tags: editBlog.tags
        }
      });
      if (res.data.success) {
        toast.success("Blog updated");
        setEditBlog(null);
        fetchBlogs();
      }
    } catch (err) {
      toast.error("Edit failed");
    }
  };

  return (
    <div className="blogs-page">
      <h1>Latest Blogs</h1>
      <div className="blogs-container">
        {blogs.map(blog => (
          <div key={blog._id} className="blog-card">
            <img src={blog.image} alt="Blog" className="blog-image" />
            <div>
              <h2>{blog.blogname}</h2>
              <p>{blog.content}</p>
              <div className="blog-tags">
                {blog.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
              <div className="blog-actions">
              <button onClick={() => handleDelete(blog._id)}>Delete</button>
              <button onClick={() => handleEdit(blog)}>Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editBlog && (
        <div className="edit-form">
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              value={editBlog.blogname}
              onChange={e => setEditBlog({ ...editBlog, blogname: e.target.value })}
              required
            />
            <textarea
              value={editBlog.content}
              onChange={e => setEditBlog({ ...editBlog, content: e.target.value })}
              required
            />
            <input
              type="text"
              value={editBlog.image}
              onChange={e => setEditBlog({ ...editBlog, image: e.target.value })}
            />
            <input
              type="text"
              value={editBlog.tags}
              onChange={e => setEditBlog({ ...editBlog, tags: e.target.value })}
            />
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditBlog(null)}>Cancel</button>
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default BlogsPage;
