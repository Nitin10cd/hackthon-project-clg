import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { useApp } from '../../context/AppContext';
import './class.css';
import JoinedClasses from './JoinedClasses';
import { useNavigate } from 'react-router-dom';

const Classroomlist = () => {
  const { availableClass, setAvailableClass, user, currentClass, setCurrentClass } = useApp();
  const [openDialogId, setOpenDialogId] = useState(null);
  const [classCode, setClassCode] = useState("");
  const [email] = useState(user.email);
  const [role, setRole] = useState("");
  const [teacherClassroom, setTeacherClassroom] = useState([]);
  const navigate = useNavigate();
  const [createClassToggle , setCreateClassToggle] = useState(false)

  // teacher form for the create class
  const [teacherForm, setTeacherForm] = useState({
    name: '',
    subject: '',
    code: '',
    id: user.id,
  });

  useEffect(() => {
    const storedClass = localStorage.getItem('curr_classroom');
    if (storedClass) {
      const parsedClass = JSON.parse(storedClass);
      setCurrentClass(parsedClass);
    }
  }, [setCurrentClass]);

  const getClassesOfTeacher = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/classroom/teacherClasses`, { email: user.email });
      if (!response.data.success) {
        toast.error(response.data.message);
      }
      setTeacherClassroom(response.data.classrooms);
    } catch (error) {
      toast.error(error)
    }
  }

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


  // checking the role 
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

  useEffect(() => {
    const fetchRole = async () => {
      const Role = await checkRole();
      console.log("Role in Use: ", Role);
      setRole(Role);
    };

    fetchRole();
  }, []);

  useEffect(() => {
    if (role === 'teacher') {
      getClassesOfTeacher();
    }
  }, [role]);





  useEffect(() => {
    async function fetchClass() {
      try {
        const response = await axios.get(`http://localhost:5000/api/classroom/get-classes`);
        if (!response.data.success) {
          toast.error("Error in fetching classes");
        } else {
          setAvailableClass(response.data.class);
        }
      } catch (error) {
        toast.error("Server error while fetching classes");
        console.error("Fetch error:", error);
      }
    }

    fetchClass();
  }, []);




  // const joinClassRoom = async () => {

  // }

  return (
    <>
      {role === 'student' ? (
        <div className='room-container'>
         <div className="room-student-container">
         <div className="student-joined-class">
          <h2>Joined Classes</h2>
          <JoinedClasses />
          </div>
          <div className='available-classes'>
          <h2>Available-Classes</h2>
          {availableClass && availableClass.length > 0 ? (
            availableClass.map((classroom, index) => (
              <div key={index} className='room-container'>
                <p>{classroom.name}</p>
                <p>{classroom.subject}</p>
                {openDialogId ? (
                  <></>
                ) : (
                  <button onClick={() => setOpenDialogId(classroom._id)}>Join Class</button>
                )}

                {openDialogId === classroom._id && (
                  <div className="join-dialog">
                    <input
                      type='text'
                      placeholder='Enter the code'
                      value={classCode}
                      onChange={(e) => setClassCode(e.target.value)}
                    />
                    <button onClick={() => setOpenDialogId(false)}>Confirm</button>
                    <button onClick={() => setOpenDialogId(null)}>Cancel</button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No classes available.</p>
          )}
          </div>
          
         </div>
        </div>
      ) : (
        <div className='room-container'>

          {createClassToggle ? ( <div className="teacher-form-container">
            <h2>Create a New Class</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const response = await axios.post("http://localhost:5000/api/classroom/create-class", teacherForm);
                  if (response.data.success) {
                    toast.success("Classroom created successfully!");
                    setTeacherForm({ name: "", subject: "", code: "", id: localStorage.getItem('user').id });
                  } else {
                    toast.error(response.data.message);
                  }
                } catch (err) {
                  toast.error(err);
                }
              }}
              className="teacher-form"
            >
              <input
                type="text"
                placeholder="Classroom Name"
                value={teacherForm.name}
                onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Subject"
                value={teacherForm.subject}
                onChange={(e) => setTeacherForm({ ...teacherForm, subject: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Unique Code"
                value={teacherForm.code}
                onChange={(e) => setTeacherForm({ ...teacherForm, code: e.target.value })}
                required
              />
              <button type="submit">Create Class</button>
            </form>
          </div>): (     <div className="teacher-classroom-list">
            {teacherClassroom && teacherClassroom.length > 0 ? (
              <div className="teacher-classroom-grid">
                {teacherClassroom.map((classroom, index) => (
                  <div key={index} className="teacher-classroom-card">
                    <h4>{classroom.name}</h4>
                    <p><strong>Subject:</strong> {classroom.subject}</p>
                    <p><strong>Code:</strong> {classroom.code}</p>
                    <button onClick={() => navigateToTheSpecificeClass(classroom)}>Visit</button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No classrooms created yet.</p>
            )}
          </div>)}

        </div>
      )}
    </>
  );
};

export default Classroomlist;
