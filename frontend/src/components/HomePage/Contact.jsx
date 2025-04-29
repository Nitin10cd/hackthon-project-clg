import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import "./HomePage.css";

const teamMembers = [
  {
    name: "Nikhil Saxena",
    linkedin: "https://www.linkedin.com/in/nikhilsaxena",
    email: "mailto:nikhil@example.com"
  },
  {
    name: "Nitin Saxena",
    linkedin: "https://www.linkedin.com/in/nitinsaxena",
    email: "mailto:nitin@example.com"
  },
  {
    name: "Ronak Varshney",
    linkedin: "https://www.linkedin.com/in/ronakvarshney",
    email: "mailto:ronak@example.com"
  },
  {
    name: "Pratham Gupta",
    linkedin: "https://www.linkedin.com/in/prathamgupta",
    email: "mailto:pratham@example.com"
  }
];

const Contact = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-heading">Campus Connect</h2>
      <p className="contact-subheading">Made with 💚 by Our Team</p>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <h4>{member.name}</h4>
            <div className="team-icons">
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="team-icon linkedin" />
              </a>
              <a href={member.email}>
                <FaEnvelope className="team-icon email" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
