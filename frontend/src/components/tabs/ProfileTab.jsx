import React from "react";
import "./ProfileTab.css";
import { FaUserCircle, FaCamera } from "react-icons/fa";
import { useApp } from "../../context/AppContext";

const ProfileTab = () => {
  const { user } = useApp();

  return (
    <div className="profile-tab-container">
      <h2 className="section-title" style={{color: "purple"}}>Profile</h2>
      
      <div className="avatar-container">
        <FaUserCircle className="avatar-icon" style={{color: "purple"}} />
        <div className="camera-icon">
          <FaCamera />
        </div>
      </div>

      <h3 className="profile-name" style={{color: "purple"}}>{user.name}</h3>

      <div className="profile-info-box" style={{backgroundColor: "purple"}}>{user.email}</div>
    </div>
  );
};

export default ProfileTab;
