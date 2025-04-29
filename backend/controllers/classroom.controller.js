import StudentModel from "../models/student.models.js";
import TeacherModel from "../models/teacher.models.js";
import AdminModel from "../models/admin.models.js";
import ClassroomModel from "../models/classroom.models.js";
import PostModel from "../models/posts.classsroom.models.js";
import Question from "../models/options.models.js";
import Test from "../models/mcq.models.js";

// check role for the google classroom
export const checkRole = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const student = await StudentModel.findOne({ email });
    if (student) {
      return res.status(200).json({ success: true, role: "student" });
    }

    const teacher = await TeacherModel.findOne({ email });
    if (teacher) {
      return res.status(200).json({ success: true, role: "teacher" });
    }

    return res.status(404).json({ success: false, message: "User not found" });

  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// controller for creating the class
export const createClass = async (req, res) => {
  const { name, subject, code, id } = req.body;
  console.log(req.body)

  try {
    if (!name || !subject || !code || !id) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const teacher = await TeacherModel.findById(id);
    if (!teacher) {
      return res.status(404).json({ success: false, message: "Teacher does not exist" });
    }

    const isCodeExist = await ClassroomModel.findOne({ code });
    if (isCodeExist) {
      return res.status(409).json({ success: false, message: "Class code already exists" });
    }

    const classroom = new ClassroomModel({
      name,
      subject,
      code,
      teacher: teacher._id,
    });

    await classroom.save();

    teacher.classrooms.push(classroom._id);
    await teacher.save();

    return res.status(201).json({ success: true, classroom });
  } catch (error) {
    console.error("Error in createClass:", error);
    return res.status(500).json({ success: false, message: "Server error while creating class" });
  }
};


// controller for delete the class
export const deleteClass = async (req, res) => {

}

// controller for add members in a class by teacher
export const addMember = async (req, res) => {

}


// controller for removing the member by teacher
export const removeMember = async (req, res) => {

}


// controller for student to join the class
export const joinClass = async (req, res) => {
  const { email, code } = req.body;
  try {
    if (!email || !code) {
      return res.status(400).json({ success: false, message: "Incomplete data received." });
    }

    const user = await StudentModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "Student not found." });
    }

    const classroom = await ClassroomModel.findOne({ code });
    if (!classroom) {
      return res.status(404).json({ success: false, message: "Classroom not found." });
    }

    if (classroom.student.includes(user._id)) {
      return res.status(400).json({ success: false, message: "You have already joined this class." });
    }

    classroom.student.push(user._id);
    user.classrooms.push(classroom._id);

    await classroom.save();
    await user.save();

    return res.status(200).json({ success: true, message: "Joined class successfully." });
  } catch (error) {
    console.error("Join class error:", error);
    return res.status(500).json({ success: false, message: "Server error while joining class." });
  }
};


// controller for student to getting the joined class
export const joinedClasses = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required." });
    }

    const user = await StudentModel.findOne({ email }).populate('classrooms');
    if (!user) {
      return res.status(404).json({ success: false, message: "Student not found." });
    }

    if (!user.classrooms || user.classrooms.length === 0) {
      return res.status(200).json({ success: true, classrooms: [], message: "No classes joined yet." });
    }

    return res.status(200).json({ success: true, classrooms: user.classrooms });
  } catch (error) {
    console.error("Error in joinedClasses:", error);
    return res.status(500).json({ success: false, message: "Server error while fetching joined classes." });
  }
};

// controller for opening the classroom single
export const getClassDataById = async (req, res) => {
  const { classid } = req.body;

  try {
    if (!classid) {
      return res.status(400).json({ success: false, message: "Class ID is required." });
    }

    const classroom = await ClassroomModel.findById(classid).populate('student').populate('teacher').populate('posts');
    if (!classroom) {
      return res.status(404).json({ success: false, message: "Classroom not found." });
    }

    return res.status(200).json({ success: true, class: classroom, message: "Classroom fetched successfully." });
  } catch (error) {
    console.error("Error in getClassDataById:", error);
    return res.status(500).json({ success: false, message: "Server error while fetching classroom data." });
  }
};

// teacher for posting the posts
const createPosts = async (req, res) => {
  const { classid } = req.body;
}



// controller for get all class for the dashbard
export const getAllClass = async (req, res) => {
  try {
    const classes = await ClassroomModel.find();
    if (!classes) return res.status(404).json({ success: false, message: "classroom not found" });
    return res.status(200).json({ success: true, class: classes });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error in the catch block" })
  }
}

export const createPost = async (req, res) => {
  const { classroomId, authorId, title, content } = req.body;

  try {
    const classroom = await ClassroomModel.findById(classroomId);
    if (!classroom) {
      return res.status(404).json({
        success: false,
        message: "Classroom not found"
      });
    }

    const attachments = req.files?.map(file => {
      const ext = file.originalname.split('.').pop().toLowerCase();
      return {
        url: `/uploads/${file.filename}`,
        fileType: ext,
        fileName: file.originalname
      };
    }) || [];

    const newPost = new PostModel({
      classroom: classroom._id,
      author: authorId,
      title,
      content,
      attachments
    });
    await newPost.save();

    classroom.posts.push(newPost._id);
    await classroom.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: newPost
    });

  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create post",
      error: error.message
    });
  }
};


export const deletePost = async (req, res) => {

};

export const addComment = async (req, res) => {

}

// getting all the post of the classrooms
export const getPosts = async (req,res) => {
  const {classroomId} = req.body;
  try {
    if (!classroomId) return res.status(404).json({success: false, message: "all details are required"})
    const classroomCheck = await ClassroomModel.findById(classroomId);
    if (!classroomCheck) return res.status(404).json({success: false, message: "Classroom not found"});

    const posts = await PostModel.find({classroom: classroomId})
  } catch (error) {
    
  }
};

export const getTeacherClassses = async (req,res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required." });
    }

    const user = await TeacherModel.findOne({ email }).populate('classrooms');
    if (!user) {
      return res.status(404).json({ success: false, message: "Student not found." });
    }

    if (!user.classrooms || user.classrooms.length === 0) {
      return res.status(200).json({ success: true, classrooms: [], message: "No classes joined yet." });
    }

    return res.status(200).json({ success: true, classrooms: user.classrooms });
  } catch (error) {
    console.error("Error in joinedClasses:", error);
    return res.status(500).json({ success: false, message: "Server error while fetching joined classes." });
  }
}


// controller for the questions

export const createTest = async (req, res) => {
  const { name, totalMarks, timeDuration, classroom, questions } = req.body;

  try {
    // Check if the classroom exists
    const classroomExists = await ClassroomModel.findById(classroom);
    if (!classroomExists) {
      return res.status(404).json({ message: "Classroom not found" });
    }

    // Create a new test instance
    const newTest = new Test({
      name,
      totalMarks,
      timeDuration,
      classroom,
      questions,
    });

    // Save the new test to the database
    await newTest.save();
    res.status(201).json({ message: "Test created successfully", test: newTest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getTestsForClassroom = async (req, res) => {
  try {
    const { classroomId } = req.params;
    console.log(classroomId)

    const tests = await Test.find({ classroom: classroomId }).populate('questions');
    console.log("test:", tests)
    if (!tests || tests.length === 0) {
      return res.status(404).json({ message: 'No tests found for this classroom' });
    }

    return res.status(200).json({ tests });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching tests', error: error.message });
  }
};
export const startTestForStudent = async (req, res) => {
  try {
    const { testId } = req.params;

    const test = await Test.findById(testId).populate('questions');

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    // Format questions to send only name and options (no correct answer)
    const formattedQuestions = test.questions.map((q) => ({
      _id: q._id,
      name: q.name,
      options: [q.optionA, q.optionB, q.optionC, q.optionD],
    }));

    return res.status(200).json({
      test: {
        _id: test._id,
        name: test.name,
        timeDuration: test.timeDuration,
        questions: formattedQuestions,
      },
    });
  } catch (error) {
    console.error("Error in startTestForStudent:", error);
    return res.status(500).json({ message: "Error starting test", error: error.message });
  }
};

export const submitTest = async (req, res) => {
  try {
    const { studentId, testId, answers } = req.body;

    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    const student = await StudentModel.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    let correctAnswers = 0;
    const totalQuestions = test.questions.length;
    const marksPerQuestion = test.totalMarks / totalQuestions;
    for (const question of test.questions) {
      const questionId = question._id.toString(); // assuming each question has a unique _id

      const selectedAnswer = answers[questionId]; // match by question ID

      if (
        selectedAnswer &&
        selectedAnswer.trim().toLowerCase() === question.answer.trim().toLowerCase()
      ) {
        correctAnswers++;
      }
    }

    const finalScore = correctAnswers * marksPerQuestion;
    test.submissions.push({
      student: studentId,
      marks: Math.round(finalScore * 100) / 100,
    });

    await test.save();

    return res.status(200).json({
      message: 'Test submitted successfully',
      correctAnswers,
      totalQuestions,
      score: Math.round(finalScore * 100) / 100,
      totalMarks: test.totalMarks,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error submitting test', error: error.message });
  }
};




export const getTestResults = async (req, res) => {
  try {
    const { testId } = req.params;

    const test = await Test.findById(testId).populate({
      path: 'submissions.student',
      select: 'name rollno'
    });
    
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    return res.status(200).json({ submissions: test.submissions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching test results', error: error.message });
  }
};


