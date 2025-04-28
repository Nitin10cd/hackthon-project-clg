import mongoose from "mongoose";

const oneToOneMessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  content: {
    type: String,
    required: true
  },
  messageType: {
    type: String,
    enum: ["text", "image", "file"],
    default: "text"
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const OneToOneMessage = mongoose.model("OneToOneMessage", oneToOneMessageSchema);
export default OneToOneMessage;
