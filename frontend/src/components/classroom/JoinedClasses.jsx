import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useApp } from '../../context/AppContext';
import './classroom.css'

const JoinedClasses = () => {
  const { user, joinedClasses, setJoinedClasses, currentClass, setCurrentClass } = useApp();
  const [email] = useState(user.email);
  const navigate = useNavigate();

  const MyJoinedClasses = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/classroom/joined-classes`, { email });
      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }
      setJoinedClasses(response.data.classrooms);
    } catch (error) {
      toast.error("Failed to fetch joined classes");
      console.error(error);
    }
  };

  const checkRole = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/classroom/check-role`, { email });
      if (!response.data.success) {
        toast.error(response.data.message);
        return "none";
      }
      return response.data.role;
    } catch (error) {
      toast.error(error.message || "Error checking role");
      return "none";
    }
  };

  const navigateToTheSpecificeClass = async (classroom) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/classroom/get-class-by-id`, {
        classid: classroom._id,
      });

      if (response.data.success) {
        const classData = response.data.class;
        setCurrentClass(classData);
        localStorage.setItem("curr_classroom", JSON.stringify(classData));
        console.log("Current Class: ", currentClass);
        const role = await checkRole();
        if (role === "student") {
          navigate(`/studentclassroom`);
        } else if (role === "teacher") {
          navigate(`/teacherclassroom`);
        } else {
          toast.error("No role found. Please sign in.");
        }
      } else {
        toast.error(response.data.message || "Failed to get class info");
      }
    } catch (error) {
      toast.error("Server error while fetching class");
      console.error(error);
    }
  };

  useEffect(() => {
    MyJoinedClasses();
  }, []);

  return (
    <div className="room-container">
      {joinedClasses && joinedClasses.length > 0 ? (
        joinedClasses.map((classroom, index) => (
          <div key={index} className="room-box">
            <p><strong>Name:</strong> {classroom.name}</p>
            <p><strong>Subject:</strong> {classroom.subject}</p>
            <button onClick={() => navigateToTheSpecificeClass(classroom)}>Open</button>
          </div>
        ))
      ) : (
        <p style={{ padding: '20px', fontWeight: 500 }}>You haven't joined any classes yet.</p>
      )}
    </div>
  );
};

export default JoinedClasses;
