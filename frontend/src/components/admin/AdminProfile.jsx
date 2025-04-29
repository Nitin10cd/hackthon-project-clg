import React from "react";
import { FaUserShield, FaCamera } from "react-icons/fa";
import { useApp } from "../../context/AppContext";
import "./AdminProfile.css"; // Updated CSS file for admin profile

const AdminProfileTab = () => {
  const { admin } = useApp(); // Use 'admin' instead of 'user'

  return (
    <div className="admin-profile-container">
      <h2 className="section-title">Admin Profile</h2>

      <div className="avatar-container">
        <FaUserShield className="avatar-icon" /> {/* Shield icon for Admin */}
        <div className="camera-icon">
          <FaCamera />
        </div>
      </div>

      <h3 className="profile-name">{admin.name}</h3>

      <div className="profile-info-box">{admin.email}</div>
    </div>
  );
};

export default AdminProfileTab;
