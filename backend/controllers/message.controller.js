import MessageModel from "../models/message.model.js";
import OneToOneMessage from "../models/onetoonemessage.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { sender, receiver, content, messageType } = req.body;
    const newMessage = new OneToOneMessage({ sender, receiver, content, messageType });
    await newMessage.save();
    res.status(200).json({ success: true, data: newMessage });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const fetchMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    
    const messages = await OneToOneMessage.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId }
      ]
    }).sort({ timestamp: 1 });
    res.status(200).json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


export const fetchGroupMessages = async (req, res) => {
  const { groupId } = req.body;
  try {
    const messages = await MessageModel.find({ chat: groupId })
      .populate("sender", "-password");

    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching group messages", error: error.message });
  }
};
