
import "./Sidebar.css";
import {
  FaUser, FaFlag, FaChalkboardTeacher,
  FaBriefcase, FaComments, FaBookmark,
  FaUsers, FaLayerGroup,
  FaBook,
  FaRegCalendarAlt
} from "react-icons/fa";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { user,tab, setTab } = useApp();
  const navigate=useNavigate();
  const handleTabClick = (label) => {
    let myId=user._id;
    if(user.role==="Teacher") myId=user.id;
    else myId=user._id;
    if(label==="Chat"){
      navigate(`/student/${myId}/chat`);
    }
    setTab(label);
  };

  return (
    <div className="sidebar-container">
      <div className={`features-tabs ${tab === "Profile" ? "active-tab" : ""}`} onClick={() => handleTabClick("Profile")}>
        <FaUser /> Profile
      </div>
      <div className={`features-tabs ${tab === "Classrooms" ? "active-tab" : ""}`} onClick={() => handleTabClick("Classrooms")}>
        <FaChalkboardTeacher /> Classrooms
      </div>
      <div className={`features-tabs ${tab === "Placement Cell" ? "active-tab" : ""}`} onClick={() => handleTabClick("Placement Cell")}>
        <FaBriefcase /> Placement Cell
      </div>
      <div className={`features-tabs ${tab === "General Chat" ? "active-tab" : ""}`} onClick={() => handleTabClick("General Chat")}>
        <FaComments /> General Chat
      </div>
      <div className={`features-tabs ${tab === "Chat" ? "active-tab" : ""}`} onClick={() => handleTabClick("Chat")}>
        <FaUsers /> Chat
      </div>
      <div className={`features-tabs ${tab === "Blog" ? "active-tab" : ""}`} onClick={() => handleTabClick("Blog")}>
        <FaBook /> Create Blogs
      </div>

      <div className={`features-tabs ${tab === "Blog" ? "active-tab" : ""}`} onClick={() => navigate('/blogs')}>
        <FaBook /> Show Blogs
      </div>

      <div className={`features-tabs ${tab === "Blog" ? "active-tab" : ""}`} onClick={() => navigate('/events')}>
        <FaRegCalendarAlt/> Events
      </div>
      <div className={`features-tabs ${tab === "Blog" ? "active-tab" : ""}`} onClick={() => navigate('/notices')}>
        <FaRegCalendarAlt/> Notices
      </div>
     
    </div>
  );
};

export default Sidebar;
