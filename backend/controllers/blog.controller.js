import BlogModel from "../models/blog.models.js";


export const createBlog = async (req, res) => {
  try {
    const { data, role } = req.body;
    const { blogname, content, tags, image } = data;

    if (!blogname || !content || !tags) {
      return res.status(400).json({ success: false, message: "Please fill all required fields." });
    }

    
    const existing = await BlogModel.findOne({ blogname });
    if (existing) {
      return res.status(409).json({ success: false, message: "A blog with this name already exists." });
    }

    const tagsArray = tags.split(",").map(tag => tag.trim());

    const blog = await BlogModel.create({
      blogname,
      content,
      image,
      tags: tagsArray,
      likes: 0,
    });

    return res.status(201).json({ success: true, message: "Blog created successfully.", blog });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Edit a blog (Student)
export const editBlog = async (req, res) => {
  try {
    const { _id, data } = req.body;
    const { blogname, content, image, tags } = data;

    if (!blogname || !content || !tags) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const updated = await BlogModel.findByIdAndUpdate(
      _id,
      {
        blogname,
        content,
        image,
        tags: tags.split(",").map(tag => tag.trim()),
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ success: false, message: "Blog not found." });

    return res.status(200).json({ success: true, message: "Blog updated successfully.", blog: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete blog (Only Teacher)
export const deleteblog = async (req, res) => {
  try {
    const { _id, userrole } = req.body;

    if (userrole !== "Teacher") {
      return res.status(403).json({ success: false, message: "Only teachers can delete blogs." });
    }

    const deleted = await BlogModel.findByIdAndDelete(_id);
    if (!deleted) return res.status(404).json({ success: false, message: "Blog not found." });

    return res.status(200).json({ success: true, message: "Blog deleted successfully." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
