import mongoose from "mongoose";

const placementPostSchema = new mongoose.Schema({
  by: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  link: {
    type: String,
    required: true,
    trim: true
  },
  skills: {
    type: [String],
    required: true,
    default: []
  },
  qualification: {
    type: [String],
    required: true,
    default: []
  }
}, { timestamps: true }); 

const PlacementPost = mongoose.model('PlacementPost', placementPostSchema);

export default PlacementPost;
