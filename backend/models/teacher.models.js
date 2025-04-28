import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  teacher_id:{
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  contactno: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  qualification: String,
  designation: String,
  communities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
  classrooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
  college: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
  profilePic: String
});

const TeacherModel = mongoose.model('Teacher', TeacherSchema);

export default TeacherModel;
