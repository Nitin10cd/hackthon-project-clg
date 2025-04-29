import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  organizer: String,
  date: Date,
  time: String,
  location: String,
  category: {
    type: String,
    enum: ["technical", "sports", "cultural", "workshops", "seminar"],
    default: "technical",
  },

  imageUrl: String,
  options: [{
    text: String ,
    enum: ['Useful', 'NotUseful'] ,
    
  }],
  eventfor: {
    type: String,
    required: true
  },
  polls : [
    {
      type : mongoose.Schema.Types.ObjectId ,
      ref : 'Students'
    }
  ],
  registrationLink: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const EventModel = mongoose.model('Event', eventSchema)

export default EventModel;