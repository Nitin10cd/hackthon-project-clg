import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useApp } from '../../context/AppContext';
import './auth.css'

const TeacherRegister = () => {
  const [teacher, setTeacher] = useState({
    name: '',
    teacher_id: '',
    email: '',
    contactno: '',
    password: '',
    qualification: '',
    designation: '',
    college: ''
  });

  const [colleges, setColleges] = useState([]);
  const navigate = useNavigate();
  const { setUser } = useApp();

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/allColleges');
        setColleges(response.data.data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load colleges');
      }
    };
    fetchColleges();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/teacherRegister', teacher);
      if (response.status === 201) {
        toast.success('Teacher registered successfully!');
        localStorage.setItem('user', response.data.teacher);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('isloggedIn', true);
        setUser(response.data.teacher);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-page">
      <div className="register-form-container">
        <h2 className="register-heading">Teacher Registration</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Name</label>
              <input
                className="form-input"
                type="text"
                name="name"
                value={teacher.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Teacher ID</label>
              <input
                className="form-input"
                type="text"
                name="teacher_id"
                value={teacher.teacher_id}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                className="form-input"
                type="email"
                name="email"
                value={teacher.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Contact Number</label>
              <input
                className="form-input"
                type="text"
                name="contactno"
                value={teacher.contactno}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                className="form-input"
                type="password"
                name="password"
                value={teacher.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Qualification</label>
              <input
                className="form-input"
                type="text"
                name="qualification"
                value={teacher.qualification}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Designation</label>
              <input
                className="form-input"
                type="text"
                name="designation"
                value={teacher.designation}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>College</label>
              <select
                className="form-select"
                name="college"
                value={teacher.college}
                onChange={handleChange}
                required
              >
                <option value="">Select a college</option>
                {colleges.map((college, index) => (
                  <option key={index} value={college._id}>
                    {college.name} - {college.code} - {college.address}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-button-wrapper">
            <button type="submit" className="submit-button">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherRegister;
