import React from "react";
import "./HomeNav.css";
import { useNavigate } from "react-router-dom"; // ✅ Correct import

const HomeNav = () => {
  const navigate = useNavigate(); // ✅ Initialize the navigate function

  return (
    <nav className="navbar">
      <div className="navbar-logo">Campus Connect</div>
      <ul className="navbar-links">
        <li><a href="#">Home</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
        <button style={{ background: "rgb(142 82 178)" }} onClick={() => navigate("/login")}>Login</button>
        <button style={{ background: "rgb(54 18 76)" }} onClick={() => navigate("/register")}>Register</button>
      </div>
    </nav>
  );
};

export default HomeNav;
