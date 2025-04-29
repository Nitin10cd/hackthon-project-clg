import React from "react";
import HomeNav from "./HomeNav";
import Features from "./Features";
import "./HomePage.css";
import hero from './hero.png'

const teamMembers = [
  {
    name: "Nikhil Saxena",
    linkedin: "https://www.linkedin.com/in/nikhilsaxena",
    email: "mailto:nikhil@example.com",
  },
  {
    name: "Nitin Saxena",
    linkedin: "https://www.linkedin.com/in/nitinsaxena",
    email: "mailto:nitin@example.com",
  },
  {
    name: "Ronak Varshney",
    linkedin: "https://www.linkedin.com/in/ronakvarshney",
    email: "mailto:ronak@example.com",
  },
  {
    name: "Pratham Gupta",
    linkedin: "https://www.linkedin.com/in/prathamgupta",
    email: "mailto:pratham@example.com",
  },
];

const HomePage = () => {
  return (
   <div className="homebody">
     <div className="home-container">
      <HomeNav />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Campus Connect</h1>
          <p>
            Bridging Students, Teachers, and Opportunities — One Unified Platform
            Campus Connect is a collaborative web application designed specifically
          for colleges, enabling seamless peer-to-peer communication, academic
          collaboration, and placement opportunity tracking. With real-time chat,
          AI-generated event notices, abusive message detection, and a complete
          admin dashboard — it's your one-stop platform for college productivity.
          </p>
          <a href="#features" className="get-started-btn">Explore Features</a>
        </div>
        <div className="hero-image">
          <img src={hero} alt="Campus Connect" />
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>About Campus Connect</h2>
        <p>
          Campus Connect is a collaborative web application designed specifically
          for colleges, enabling seamless peer-to-peer communication, academic
          collaboration, and placement opportunity tracking. With real-time chat,
          AI-generated event notices, abusive message detection, and a complete
          admin dashboard — it's your one-stop platform for college productivity.
        </p>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <Features />
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2>Meet the Team</h2>
        <div className="team-grid">
          {teamMembers.map((member) => (
            <div className="team-member" key={member.name}>
              <h3>{member.name}</h3>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={member.email}>Email</a>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Campus Connect. All rights reserved.</p>
      </footer>
    </div>
   </div>
  );
};

export default HomePage;
