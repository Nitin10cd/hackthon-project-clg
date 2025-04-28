import { Link, useNavigate } from "react-router-dom";
import { GiGraduateCap } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import "../Navbar.css";

const AdminNav = () => {
  const navigate=useNavigate();
  const goBack=()=>{
    navigate("/");
  }
  return (
    <div className="navbar">
    <div className="logo-section">
      <GiGraduateCap className="logo-icon" />
      <div className="logo-text">
        <span>Admin</span>
        <span>Panel</span>
      </div>
    </div>
    <div className="logout-button">
      <button onClick={goBack}>
        <FiLogOut style={{ marginRight: "6px" }} />
        Log out
      </button>
    </div>
  </div>
  )
}

export default AdminNav
