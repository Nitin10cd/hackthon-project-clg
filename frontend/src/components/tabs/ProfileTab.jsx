import React from "react";
import "./ProfileTab.css";
import { FaUserCircle, FaCamera } from "react-icons/fa";
import { useApp } from "../../context/AppContext";

const ProfileTab = () => {
  const { user } = useApp();

  return (
    <div className="profile-tab-container">
      <h2 className="section-title">Profile</h2>
      
      <div className="avatar-container">
        <FaUserCircle className="avatar-icon" />
        <div className="camera-icon">
          <FaCamera />
        </div>
      </div>

      <h3 className="profile-name">{user.name}</h3>

      <div className="profile-info-box">{user.email}</div>
    </div>
  );
};

export default ProfileTab;
