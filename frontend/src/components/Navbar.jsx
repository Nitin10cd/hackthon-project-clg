import { Link, useNavigate } from "react-router-dom";
import { GiGraduateCap } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-logo">
        <GiGraduateCap className="navbar-logo-icon" />
        <div className="navbar-logo-text">
          <span>Campus</span>
          <span>Connect</span>
        </div>
      </div>

      <div className="navbar-links">
        <Link className="navbar-link" to="/">Home</Link>
        <Link className="navbar-link" to="/profile">Profile</Link>
        <Link className="navbar-link" to="/college">College</Link>
      </div>

      <div className="navbar-logout">
        <button className="navbar-logout-btn" onClick={logout}>
          <FiLogOut style={{ marginRight: "6px" }} />
          Log out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
