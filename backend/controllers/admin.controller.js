import AdminModel from "../models/admin.models.js";
import StudentModel from "../models/student.models.js";
import TeacherModel from "../models/teacher.models.js";
import ClassroomModel from "../models/classroom.models.js";

// for getting the whole data of the student 
export const getAllStudentData = async (req,res) => {
    try {
        const studentList = await StudentModel.find().countDocuments();
        const studentListData = await StudentModel.find();
        if (!studentList) return res.status(404).json({success: false, message: "Error in getting the student list"});

        return res.status(201).json({success: true, message: "student is fethced" , studentList: studentList, studentData: studentListData});
    } catch (error) {
        return res.status(500).json({success: false, message: "Error caught in the catch block"})
    }
}

export const getAllTeachers = async (req,res) => {
    try {
        const teacherList = await TeacherModel.find().countDocuments();
        const teacherListData = await TeacherModel.find();
        if (!teacherList) return res.status(404).json({success: false, message: "Error in getting the student list"});

        return res.status(201).json({success: true, message: "student is fethced" , teacherList: teacherList, teacherListData: teacherListData});
    } catch (error) {
        return res.status(500).json({success: false, message: "Error caught in the catch block"})
    }
}

export const getAllClassroom = async (req,res) => {
    try {
        const classroomList = await ClassroomModel.find().countDocuments();
        const classroomListData = await ClassroomModel.find();
        if (!classroomList) return res.status(404).json({success: false, message: "Error in getting the student list"});

        return res.status(201).json({success: true, message: "student is fethced" , classroomList: classroomList, classroomListData: classroomListData});
    } catch (error) {
        return res.status(500).json({success: false, message: "Error caught in the catch block"})
    }
}

export const getAllGroups = async (req,res) => {
    try {
        const teacherList = await ClassroomModel.find().countDocuments();
        const teacherListData = await ClassroomModel.find();
        if (!teacherList) return res.status(404).json({success: false, message: "Error in getting the student list"});

        return res.status(201).json({success: true, message: "student is fethced" , teacherList: teacherList, teacherListData: teacherListData});
    } catch (error) {
        return res.status(500).json({success: false, message: "Error caught in the catch block"})
    }
}


// deleting controllers
export const deleteStudent = async (req, res) => {
    const { email } = req.body;
  
    try {
      if (!email) {
        return res.status(400).json({ success: false, message: "Roll number is required." });
      }
  
      const deletedUser = await StudentModel.findOneAndDelete({ email: email });
  
      if (!deletedUser) {
        return res.status(404).json({ success: false, message: "Student not found." });
      }
  
      return res.status(200).json({ success: true, message: "Student deleted successfully.", deletedStudent: deletedUser });
    } catch (error) {
      console.error("Error deleting student:", error);
      return res.status(500).json({ success: false, message: "Server error while deleting student." });
    }
};
  
export const deleteTeacher = async (req,res) => {
    const { email } = req.body;
  
    try {
      if (!email) {
        return res.status(400).json({ success: false, message: "Roll number is required." });
      }
  
      const deletedUser = await TeacherModel.findOneAndDelete({ email: email });
  
      if (!deletedUser) {
        return res.status(404).json({ success: false, message: "Student not found." });
      }
  
      return res.status(200).json({ success: true, message: "Student deleted successfully.", deletedStudent: deletedUser });
    } catch (error) {
      console.error("Error deleting student:", error);
      return res.status(500).json({ success: false, message: "Server error while deleting student." });
    }
};

export const deleteClassroom = async (req,res) => {

};


export const fetchAdmin=async(req,res)=>{
    try{
      const {_id}=req.body;
  
      console.log("Id is Here",_id)
      if(!_id){
        res.status(400).json({success:false,message:"Missing Required field"});
      }

      const admin=await AdminModel.findById(_id);
      if (!admin) return res.status(404).json({success: false, message: "Error i fetching the admin"});
      return res.status(201).json({success: true, data: admin});

    }catch(error){
        return res.status(500).json({success: false, message: "Error caught in the catch block"})
    }
};



export const addStudents = async(req,res) => {
    const {name , email , rollno , course , yr} = req.body;

}
