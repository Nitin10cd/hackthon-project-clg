import "../Sidebar.css";
import {
  FaUser,                  // Profile
  FaChalkboardTeacher,     // Classrooms
  FaUserGraduate,          // Students
  FaChalkboard,            // Teachers
  FaLayerGroup,            // Groups
  FaTachometerAlt,         // Dashboard
  FaCalendarPlus,          // Create Events
  FaBullhorn,              // Create Notices
  FaRegCalendarAlt,        // Events
  FaStickyNote,            // Notices
} from "react-icons/fa";

import { useApp } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const AdminSide = () => {
  const { admin, tabClick, setTabClick } = useApp();
  const navigate = useNavigate();

  const handleTabClick = (label) => {
    setTabClick(label);
  };

  return (
    <div className="sidebar-container">
      <div className={`features-tabs ${tabClick === "Profile" ? "active-tab" : ""}`} onClick={() => handleTabClick("Profile")}>
        <FaUser /> Profile
      </div>
      <div className={`features-tabs ${tabClick === "Classrooms" ? "active-tab" : ""}`} onClick={() => handleTabClick("Classrooms")}>
        <FaChalkboardTeacher /> Classrooms
      </div>
      <div className={`features-tabs ${tabClick === "Students" ? "active-tab" : ""}`} onClick={() => handleTabClick("Students")}>
        <FaUserGraduate /> Students
      </div>
      <div className={`features-tabs ${tabClick === "Teachers" ? "active-tab" : ""}`} onClick={() => handleTabClick("Teachers")}>
        <FaChalkboard /> Teachers
      </div>
      <div className={`features-tabs ${tabClick === "Groups" ? "active-tab" : ""}`} onClick={() => handleTabClick("Groups")}>
        <FaLayerGroup /> Groups
      </div>
      <div className={`features-tabs ${tabClick === "Dashboard" ? "active-tab" : ""}`} onClick={() => handleTabClick("Dashboard")}>
        <FaTachometerAlt /> Dashboard
      </div>
      <div className={`features-tabs ${tabClick === "Create Events" ? "active-tab" : ""}`} onClick={() => handleTabClick("Create Events")}>
        <FaCalendarPlus /> Create Events
      </div>
      <div className={`features-tabs ${tabClick === "Create Notices" ? "active-tab" : ""}`} onClick={() => handleTabClick("Create Notices")}>
        <FaBullhorn /> Create Notices
      </div>
      <div className={`features-tabs ${tabClick === "Events" ? "active-tab" : ""}`} onClick={() => navigate('/events')}>
        <FaRegCalendarAlt /> Events
      </div>
      <div className={`features-tabs ${tabClick === "Notices" ? "active-tab" : ""}`} onClick={() => navigate('/notices')}>
        <FaStickyNote /> Notices
      </div>
    </div>
  );
};

export default AdminSide;
