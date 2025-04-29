import { useEffect } from "react";
import { useApp } from "../../context/AppContext"
import { toast } from 'react-toastify';
import axios from "axios";
import AdminNav from "./AdminNav";
import { useParams } from "react-router-dom";
import AdminSide from "./AdminSide";
import Dashboard from "./Dashboard";
import StudentList from "./StudentList"
import TeacherComponent from "./TeacherComponent"
import ClassroomList from "./ClassroomList";
import AdminProfile from "./AdminProfile";
import EventCreation from "../events/EventCreation";
import NoticeCreation from "../notices/NoticeCreation";
import EventsPage from "../events/EventPage";
import Notices from "../notices/Notices";


const AdminDashBoard = () => {
  const {id}=useParams();
  const {admin,setAdmin,tabClick,setTabClick}=useApp();

  useEffect(()=>{
    console.log(admin);
    console.log(id)
   fetchAdmin();
  },[id]);
  console.log("Admin: ", admin);

  const fetchAdmin=async()=>{
    try{
        const response= await axios.post("http://localhost:5000/api/admin/fetchAdmin", {_id:id});
        if (!response.data.success) {
            console.log(response.data.message);
        }
        console.log(response.data.data);
        setAdmin(response.data.data);
    }catch(error){
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    }
}

  return (
    <div>
      <AdminNav />
      <AdminSide />
      {
        tabClick==="Profile" && <AdminProfile/>
      }
      {
        tabClick==="Students" && <StudentList />
      }  
      {
        tabClick === "Dashboard" && <Dashboard/> 
      }
      {
        tabClick==="Teachers" && <TeacherComponent />
      }
      {
        tabClick==="Classrooms" && <ClassroomList />
      }
      {
        tabClick === "Create Events" && <EventCreation/>
      }
      {tabClick === "Create Notices" && <NoticeCreation />}
      {tabClick === "Events" && <EventsPage/> }
      {tabClick === "Notices" && <Notices />}
    </div>
  )
}

export default AdminDashBoard;
