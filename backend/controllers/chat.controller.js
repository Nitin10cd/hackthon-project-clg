import mongoose from "mongoose";
import ChatModel from "../models/chat.model.js";
import StudentModel from "../models/student.models.js";
import TeacherModel from "../models/teacher.models.js";

export const createGroupChat = async (req, res) => {
  try {
    const { chatName, members, admins, createdBy } = req.body;

    if (!chatName || !members || !admins || !createdBy) {
      return res.status(400).json({
        message: "chatName, members, admins, and createdBy are required",
      });
    }

    if (!Array.isArray(members) || members.length < 2) {
      return res.status(400).json({ message: "At least 2 members needed" });
    }

    if (!Array.isArray(admins) || admins.length === 0) {
      return res.status(400).json({ message: "At least 1 admin required" });
    }

    // Validate all IDs
    const allIds = [...members, ...admins, createdBy];
    for (let id of allIds) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: `Invalid ID: ${id}` });
      }
    }

    // Create the group
    const newGroup = await ChatModel.create({
      chatName,
      isGroupChat: true,
      members,
      admins,
      createdBy,
    });

    // Now update each user (Student or Teacher)
    const updateCommunities = async (userId) => {
      let student = await StudentModel.findById(userId);
      if (student) {
        if (!student.communitiesChat.includes(newGroup._id)) {
          student.communitiesChat.push(newGroup._id);
          await student.save();
        }
      } else {
        let teacher = await TeacherModel.findById(userId);
        if (teacher) {
          if (!teacher.communities.includes(newGroup._id)) {
            teacher.communities.push(newGroup._id);
            await teacher.save();
          }
        }
      }
    };

    // Update for all members, admins, and createdBy
    const allUsers = new Set([...members, ...admins, createdBy]); // avoid re-updating same person
    for (let id of allUsers) {
      await updateCommunities(id);
    }

    res.status(201).json({
      message: "Group chat created and users updated successfully",
      chat: newGroup,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};


export const fetchGroups = async (req, res) => {
  try {
    const { _id } = req.body;

    let groupIds = [];

    const student = await StudentModel.findById(_id);
    if (student) {
      groupIds = student.communitiesChat;
    } else {
      const teacher = await TeacherModel.findById(_id);
      if (teacher) {
        groupIds = teacher.communities;
      } else {
        return res.status(404).json({
          message: "User not found in either Student or Teacher model",
        });
      }
    }

    // Fetch groups from ChatModel
    const groups = await ChatModel.find(
      { _id: { $in: groupIds } },
      "_id chatName members admins createdBy"  // You can add more fields if needed
    );

    return res.status(200).json({ groups });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      message: "Error fetching groups", 
      error: error.message 
    });
  }
};


export const fetchFriends = async (req, res) => {
  try {
    const { _id } = req.body;

    let friendIds = [];

    const student = await StudentModel.findById(_id);
    if (student) {
      friendIds = student.friendsChat;
    } else {
      const teacher = await TeacherModel.findById(_id);
      if (teacher) {
        friendIds = teacher.friends;
      } else {
        return res.status(404).json({
          message: "User not found in either Student or Teacher model",
        });
      }
    }

    const [studentFriends, teacherFriends] = await Promise.all([
      StudentModel.find({ _id: { $in: friendIds } }, "_id name rollno"),
      TeacherModel.find({ _id: { $in: friendIds } }, "_id name teacher_id"),
    ]);

    const allFriends = [...studentFriends, ...teacherFriends];

    return res.status(200).json({ friends: allFriends });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error fetching friends",
      error: error.message,
    });
  }
};

export const fetchUser = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({ message: "Missing Required Fields" });
    }

    // Check for student
    const student = await StudentModel.findById(_id);
    if (student) {
      return res.status(200).json({
        message: "Chat ID Details fetched",
        data: {
          _id: student._id,
          name: student.name,
          rollno: student.rollno,
          role:"Student"
        }
      });
    }

    // Check for teacher
    const teacher = await TeacherModel.findById(_id);
    if (teacher) {
      return res.status(200).json({
        message: "Chat ID Details fetched",
        data: {
          _id: teacher._id,
          name: teacher.name,
          teach_id: teacher.teacher_id,
          role:"Teacher"
        }
      });
    }

    return res.status(404).json({ message: "User not found" });

  } catch (error) {
    console.error("Fetch User Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const fetchGroup = async (req, res) => {
  const { groupId } = req.body;
  try {
    const group = await ChatModel.findById(groupId)
      .populate("members", "-password")
      .populate("admins", "-password");

    if (!group) {
      return res.status(404).json({ success: false, message: "Group not found" });
    }

    res.status(200).json({ success: true, data: group });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching group", error: error.message });
  }
};