import React from "react";
import "./Features.css";

const featureList = [
  {
    title: "Peer-to-Peer Communication",
    description:
      "Enable real-time messaging between students and teachers using Socket.io with abusive message detection and admin ban control.",
    icon: "🗣️",
  },
  {
    title: "Placement Cell",
    description:
      "Access online job opportunities and exclusive campus placements in one unified dashboard.",
    icon: "🎯",
  },
  {
    title: "Digital Classrooms",
    description:
      "Teachers can create classrooms, share all file types (PDF, video, docs), conduct tests, and review student submissions and marks.",
    icon: "🏫",
  },
  {
    title: "AI Event Generator",
    description:
      "Students can create events by describing them, and AI generates structured event content and notices, displayed on the dashboard.",
    icon: "🤖",
  },
  {
    title: "Notice Board",
    description:
      "Smart notice system with filters by department, date, or type—centralized for easy access.",
    icon: "📢",
  },
  {
    title: "Blog Section",
    description:
      "Teachers can create or delete blogs, providing students with academic content and insights.",
    icon: "📝",
  },
  {
    title: "Admin Dashboard",
    description:
      "Centralized control for managing users, reviewing chat flags, banning users, and monitoring the platform.",
    icon: "🛡️",
  },
];

const Features = () => {
  return (
    <div className="features-container">
      <h2>Core Features</h2>
      <div className="features-grid">
        {featureList.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
