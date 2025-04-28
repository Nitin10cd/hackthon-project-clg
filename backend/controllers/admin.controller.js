import AdminModel from "../models/admin.models.js";
import StudentModel from "../models/student.models.js";

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
}