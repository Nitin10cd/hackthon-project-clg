import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import StudentModel from "../models/student.models.js";
import AdminModel from "../models/admin.models.js";
import TeacherModel from "../models/teacher.models.js";
import CollegeModel from "../models/college.models.js";

const JWT_SECRET = "your_jwt_secret"; 

export const studentRegister = async (req, res) => {
  const { name, rollno, email, contactNo, password, year, batch, college } = req.body;

  try {
    // Validate input
    if (!name || !rollno || !email || !contactNo || !password || !year || !batch || !college) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Check if the student already exists
    const isUserExist = await StudentModel.findOne({ email });
    if (isUserExist) {
      return res.status(409).json({
        success: false,
        message: 'Student already exists',
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new student
    const student = new StudentModel({
      name,
      rollno,
      email,
      contactNo,
      password: hashedPassword,
      year,
      batch,
      college,
    });

    // Save the student to the database
    await student.save();

    // Create a JWT token
    const token = jwt.sign(
      { id: student._id, email: student.email, role: 'student' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Respond with the student data and token
    return res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      student,
      token,
    });

  } catch (error) {
    console.error('Error during student registration:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during registration',
    });
  }
};

export const teacherRegister = async (request, response) => {
  const { name, teacher_id, email, contactno, password, qualification, designation, college } = request.body;
  console.log(request.body)
  try {
    if (!name || !teacher_id || !email || !contactno || !password) {
      return response.status(400).json({ success: false, message: "All fields are required" });
    }
  

    const isTeacherExist = await TeacherModel.findOne({ email });
    if (isTeacherExist) {
      return response.status(401).json({ success: false, message: "Teacher already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = await TeacherModel.create({
      name,
      teacher_id,
      email,
      contactno,
      password: hashedPassword,
      qualification,
      designation,
      college
    });

    const token = jwt.sign(
      { id: teacher._id, email: teacher.email, role: "teacher" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return response.status(201).json({
      success: true,
      message: "Teacher registered successfully",
      teacher,
      token
    });

  } catch (error) {
    console.error("Teacher registration error:", error);
    return response.status(500).json({ success: false, message: "Server error" });
  }
};

// only alloweed emails for the admin routes
const allowedEmails = [
  "placementcell@gmail.com",
  "director@gmail.com",
  "dean@gmail.com",
  "management@gmail.com",
  "hod@gmail.com"
];

export const adminRegister = async (request, response) => {
  const { name, email, password, contact, designation } = request.body;
  try {
    if (!name || !email || !password || !contact) {
      return response.status(400).json({ success: false, message: "All fields are required" });
    }

    if (!allowedEmails.includes(email)) {
      return response.status(403).json({ success: false, message: "Unauthorized admin email" });
    }

    const isAdminExist = await AdminModel.findOne({ email });
    if (isAdminExist) {
      return response.status(409).json({ success: false, message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await AdminModel.create({
      name,
      email,
      password: hashedPassword,
      contact,
      designation
    });

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: "admin" },
      "my-secret",
      { expiresIn: "7d" }
    );

    return response.status(201).json({
      success: true,
      message: "Admin registered successfully",
      admin,
      token
    });

  } catch (error) {
    console.error("Admin registration error:", error);
    return response.status(500).json({ success: false, message: "Server error" });
  }
};


export const loginController = async (request, response) => {
  const { email, password, role } = request.body;
  try {
    let user;

    if (role === "Student") {
      user = await StudentModel.findOne({ email });
    } else if (role === "Teacher") {
      user = await TeacherModel.findOne({ email });
    } else if (role === "Admin") {
      user = await AdminModel.findOne({ email });
    } else {
      return response.status(400).json({ success: false, message: "Invalid role specified" });
    }

    if (!user) {
      return response.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return response.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return response.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role
      },
      token
    });

  } catch (error) {
    console.error("Login error:", error);
    return response.status(500).json({ success: false, message: "Server error" });
  }
};
// Create a new college
export const createCollege = async (req, res) => {
  const { name, code, email, password, contact, address, departments, profilePic } = req.body;

  try {
    // Check if all fields are provided
    if (!name || !code || !email || !password || !contact || !address) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if college with the same code or email already exists
    const existingCollege = await CollegeModel.findOne({ code });
    if (existingCollege) {
      return res.status(409).json({ success: false, message: "College with this code already exists" });
    }

    // Create a new college
    const newCollege = new CollegeModel({
      name,
      code,
      email,
      password,
      contact,
      address,
      departments,
      profilePic
    });

    // Save the college to the database
    await newCollege.save();

    return res.status(201).json({
      success: true,
      message: "College created successfully",
      college: newCollege
    });

  } catch (error) {
    console.error("Error creating college:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all colleges
export const getAllColleges = async (req, res) => {
  try {
    const colleges = await CollegeModel.find();
    console.log(colleges);
    return res.status(200).json({
      success: true,
      data:colleges
    });
  } catch (error) {
    console.error("Error fetching colleges:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


//  controller for getting the profile classes enrolled
export const studentProfileUpdate = async (req,res) => {
  const {email} = req.body;
  if (!email) return res.status(404).json({success: false, message: "Error in getting the email"});
  try {
    const user = await StudentModel.findOne({email: email});
    if (!user) {
      const teacher = await TeacherModel.findOne({email: email});
      if (!teacher) return res.status(404).json({success: false, message:"not find the user completely"});
      const classrooms = teacher.classrooms.length;
      const friends = teacher.friends.length;
      const communities = teacher.communities.length;

      return res.status(201).json({success: true, isStudent: false, classrooms: classrooms, friends: friends , communities: communities});
    }
    const stuClassrrom = user.classrooms.length;
    const friends = user.friendsChat.length;
    const communities = user.communitiesChat.length;

    return res.status(201).json({success: true, isStudent: true, classrooms: stuClassrrom, friends: friends, communities: communities});
  } catch (error) {
    return res.status(500).json({success: false , message: "Error in getting the catch block"});
  }
}