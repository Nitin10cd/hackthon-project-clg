import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
      required: true,
      trim: true,
    },
    isGroupChat: {
      type: Boolean,
      default: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Student", // or your main User model if you have one
      },
    ],
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Student",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Student",
    },
  },
  {
    timestamps: true,
  }
);

const ChatModel = mongoose.model("Chat", chatSchema);

export default ChatModel;
