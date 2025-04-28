import { useEffect } from "react";
import { useApp } from "../../context/AppContext"
import { toast } from 'react-toastify';
import axios from "axios";
import AdminNav from "./AdminNav";
import { useParams } from "react-router-dom";
import AdminSide from "./AdminSide";
import Dashboard from "./Dashboard";


const AdminDashBoard = () => {
  const {id}=useParams();
  const {admin,tabClick,setTabClick}=useApp();

  useEffect(()=>{
    console.log(admin);
    console.log(id)
   fetchAdmin();
  },[admin]);
  console.log("Admin: ", admin);

  const fetchAdmin=async()=>{
    try{
        const response= await axios.post("http://localhost:5000/api/admin/fetchAdmin", {_id:id});
        if (!response.data.success) {
            console.log(response.data.message);
        }
        console.log(response.data.data);
    }catch(error){
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    }
}

  return (
    <div>
      <AdminNav />
      <AdminSide />
      {
        tabClick==="Students" && <StudentList />
      }  
      {
        tabClick === "Dashboard" && <Dashboard/> 
      }
    </div>
  )
}

export default AdminDashBoard;
