import { Link, useNavigate } from "react-router-dom";
import { GiGraduateCap } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import "../Navbar.css";
import { useApp } from "../../context/AppContext";

const Navy = () => {
    const {setTab}=useApp();
    const navigate=useNavigate();
  return (
    <div className="navbar">
      <div className="logo-section">
        <GiGraduateCap className="logo-icon" />
        <div className="logo-text">
          <span>Campus</span>
          <span>Connect</span>
        </div>
      </div>
      
      <div className="logout-button">
        <button onClick={()=>{
           setTab("Profile");
           navigate("/");
        }}>
          <FiLogOut style={{ marginRight: "6px" }} />
          Go back
        </button>
      </div>
    </div>
  );
};

export default Navy;
