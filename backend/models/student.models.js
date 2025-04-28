import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rollno: {
    type: String,
    required: true,
    unique: true 
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'] // Basic email validation regex
  },
  contactNo: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  communitiesChat: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
  classrooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' }],
  friendsChat: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  year: {
    type: String,
    required: true
  },
  batch: {
    type: String,
    default: 'Not Assigned' // Optional field with a default value
  },
  college: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'College' 
  }
});

// Create indexes for frequently queried fields
StudentSchema.index({ email: 1 });
StudentSchema.index({ rollno: 1 });

const StudentModel = mongoose.model('Student', StudentSchema);

export default StudentModel;
