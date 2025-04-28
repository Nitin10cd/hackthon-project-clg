import { Link, useNavigate } from "react-router-dom";
import { GiGraduateCap } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import "./Navbar.css";

const Navbar = () => {

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  }
  return (
    <div className="navbar">
      <div className="logo-section">
        <GiGraduateCap className="logo-icon" />
        <div className="logo-text">
          <span>Campus</span>
          <span>Connect</span>
        </div>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/college">College</Link>
      </div>
      <div className="logout-button">
        <button onClick={logout}>
          <FiLogOut style={{ marginRight: "6px" }} />
          Log out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
