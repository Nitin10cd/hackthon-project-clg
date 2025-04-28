import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './stuAuth.css'

const StudentRegister = () => {
  const [user, setUser] = useState({
    name: '',
    rollno: '',
    email: '',
    contactNo: '',
    password: '',
    year: '',
    batch: '',
    college: '',
  });

  const [colleges, setColleges] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/allColleges'); 
        setColleges(response.data.data);
      } catch (error) {
        console.log(error);
        toast.error('Failed to load colleges');
      }
    };

    fetchColleges();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/stuRegister', user);
      if (response.status === 201) {
        toast.success('Registration successful!');
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="student-register-container">
      <form className="student-register-form" onSubmit={handleSubmit} >
      <h2 className="student-register-heading">Register as a Student</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Roll Number</label>
            <input
              type="text"
              name="rollno"
              value={user.rollno}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="text"
              name="contactNo"
              value={user.contactNo}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Year</label>
            <input
              type="text"
              name="year"
              value={user.year}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Batch</label>
            <input
              type="text"
              name="batch"
              value={user.batch}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>College</label>
            <select
              name="college"
              value={user.college}
              onChange={handleChange}
              required
              className="form-select"
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

        <div className="form-button-group">
          <button type="submit" className="submit-button">Register</button>
        </div>
      </form>
    </div>
  );
};

export default StudentRegister;
