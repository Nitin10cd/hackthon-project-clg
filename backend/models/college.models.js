import mongoose from "mongoose";

const CollegeSchema = new mongoose.Schema({
  name: String,
  code: String,
  email: String,
  password: String,
  contact: String,
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }],
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  address: String,
  departments: [{ type: String }],
  profilePic: String
});

const CollegeModel = mongoose.model('College', CollegeSchema);

export default CollegeModel;
