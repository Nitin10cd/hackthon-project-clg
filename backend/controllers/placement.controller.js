// controller for clg grabbed online opportunites
import AdminModel from "../models/admin.models.js";
import PlacementPost from "../models/placement.model.js";

export const publishJobs = async (req, res) => {
  const { email, title, description, applyLink, skillsReq, qualificationReq } = req.body;

  try {
    if (!email || !title || !description || !applyLink || !skillsReq || !qualificationReq) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Check if admin exists
    const user = await AdminModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ success: false, message: "Admin not found." });
    }

    const newPost = await PlacementPost.create({
      by: user.name || user.email, 
      title: title,
      description: description,
      link: applyLink,
      skills: skillsReq,
      qualification: qualificationReq,
    });

    res.status(201).json({
      success: true,
      message: "Placement post created successfully!",
      data: newPost,
    });

  } catch (error) {
    console.error("Error publishing job:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getPlacementCellJobs = async (req,res) => {
    try {
        const list = await PlacementPost.find();
        if (!list) return res.status(404).json({success: false, message: "Not having placement opportunities by cell"});
        return res.status(200).json({success: true, data: list, message: "jobs fetched successsfully"});
    } catch (error) {
        return res.status(500).json({success: false, message: "errro catch in the catch block"})
    }
}

// controller or the campus placen=metn record getter 
export const campusPlacement = async (req,res) => {
    
}