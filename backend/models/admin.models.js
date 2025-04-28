import mongoose from "mongoose";

const allowedEmails = [
  "placementcell@gmail.com",
  "director@gmail.com",
  "dean@gmail.com",
  "management@gmail.com",
  "hod@gmail.com"
];

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return allowedEmails.includes(value);
      },
      message: props => `${props.value} is not an authorized admin email.`
    }
  },
  password: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  profilePic: String,
  designation: String,
});

const AdminModel = mongoose.model('Admin', AdminSchema);

export default AdminModel;
