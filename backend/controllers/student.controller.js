import StudentModel from "../models/student.models.js";
import TeacherModel from "../models/teacher.models.js";

export const fetchDetails = async (req, res) => {
  const { _id } = req.body;

  try {
    // Finding the student by ID
    const student = await StudentModel.findById(_id);

    if (!student) {
      // If student not found, return an error response
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    // If student found, return the student data
    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    // If there's any error during the process, return a 500 status
    console.error("Error fetching student details:", error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching student details',
    });
  }
};


export const getUsers = async (req, res) => {
  try {
    const data = [];

    const students = await StudentModel.find({}, "_id name rollno");
    const teachers = await TeacherModel.find({}, "_id name teacher_id");

    const formattedStudents = students.map((student) => ({
      ...student._doc,
      role: "student",
    }));

    const formattedTeachers = teachers.map((teacher) => ({
      ...teacher._doc,
      role: "teacher",
    }));

    const allUsers = [...formattedStudents, ...formattedTeachers];

    res.status(200).json({ message: "Fetched Successfully", data: allUsers });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const addFriend = async (req, res) => {
  try {
    const { _id, friendId ,role} = req.body;
    console.log(role)
    if (!_id || !friendId ) {
      return res.status(400).json({ message: "Missing required fields." });
    }
    const user1Student = await StudentModel.findById(_id);
    const user2Student = await StudentModel.findById(friendId);
    const user1Teacher = await TeacherModel.findById(_id);
    const user2Teacher = await TeacherModel.findById(friendId);

    if (user1Student) {
      if (!user1Student.friendsChat.includes(friendId)) {
        user1Student.friendsChat.push(friendId);
        await user1Student.save();
      }

      if (user2Student) {
        if (!user2Student.friendsChat.includes(_id)) {
          user2Student.friendsChat.push(_id);
          await user2Student.save();
        }
      } else if (user2Teacher) {
        if (!user2Teacher.friends.includes(_id)) {
          user2Teacher.friends.push(_id);
          await user2Teacher.save();
        }
      }

      return res.status(200).json({ message: "Friendship added for Student" });
    }

    if (user1Teacher) {
      if (!user1Teacher.friends.includes(friendId)) {
        user1Teacher.friends.push(friendId);
        await user1Teacher.save();
      }

      if (user2Student) {
        if (!user2Student.friendsChat.includes(_id)) {
          user2Student.friendsChat.push(_id);
          await user2Student.save();
        }
      } else if (user2Teacher) {
        if (!user2Teacher.friends.includes(_id)) {
          user2Teacher.friends.push(_id);
          await user2Teacher.save();
        }
      }

      return res.status(200).json({ message: "Friendship added for Teacher" });
    }

    return res.status(404).json({ message: "User not found" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
