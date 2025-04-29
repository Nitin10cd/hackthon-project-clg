import BlogModel from "../models/blog.model.js";



export const BlogCreation = async (request, response) => {
  try {
    const { data, role } = request.body;
    console.log(data);

    const { blogname, content, tags, image } = data;

    if (!blogname || !content || !tags) {
      return response.status(400).json({
        success: false,
        message: "Please fill all required fields"
      });
    }

    if (role !== "Student") {
      return response.status(403).json({
        success: false,
        message: "Access denied. Only students can create blogs."
      });
    }
    const exisitingBlog = await BlogModel.findOne({ blogname });
    if (exisitingBlog) {
      return response.status(405).json({
        success: false,
        message: "Blog already exists"
      })
    }
    // Convert tags from string to array
    const tagsArray = tags.split(",").map(tag => tag.trim());

    const newblog = await BlogModel.create({
      blogname,
      content,
      likes: 0,
      tags: tagsArray,   // Now it's an array
      image
    });

    return response.status(201).json({
      success: true,
      message: "New blog created successfully",
      blog: newblog
    });

  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "Error while creating blog",
      error: error.message
    });
  }
};


export const GetAllBlogs = async (req, res) => {
  try {
    const fetchblogs = await BlogModel.find();
    return res.status(201).json({
      success: true,
      message: "Blogs Fetches successfully",
      blogs: fetchblogs
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const DeleteBlog = async (req, res) => {
  try {
    const { _id , userrole } = req.body;
    if(userrole !== "Teacher"){
       return res.status(404).json({
        success : false ,
        message : "You are not authorished"
       })
    };


    const fetchblog = await BlogModel.findByIdAndDelete(_id);
    return res.status(201).json({
      success: true,
      message: "Blog deleted Successfully",
      blog : fetchblog
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const EditBlog = async (req, res) => {
  try {
    const { _id, data } = req.body;
    const { blogname, image, content, tags } = data;
    if (!blogname || !image || !content || !tags) {
      return res.status(404).json({
        success: false,
        message: "fill all credentials"
      })
    }

    const exisitingBlog = await BlogModel.findById(_id);
    if (!exisitingBlog) {
      return res.status(404).json({
        success: false,
        message: 'blog not found'
      })
    }

    const updateBlog = await BlogModel.findByIdAndUpdate({ _id }, {
      blogname: blogname,
      content: content,
      tags: tags,
      image: image
    }, { new: true });

    return res.status(201).json({
      success : true ,
      message : "data updated successfully"
    })
  }


  catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}