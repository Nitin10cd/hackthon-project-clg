import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useApp } from '../../context/AppContext';

const Login = () => {
  const { admin,setAdmin, setIsLoggedIn } = useApp();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    role: 'Student',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(credentials.role==="Admin"){
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
        console.log("Login Response:", response);
        
        const { success, token, user } = response.data;
  
        if (success) {
          
          localStorage.setItem('token', token);
          setAdmin(user);
          console.log(user,admin)
          localStorage.setItem('isloggedIn', true);
          toast.success('Login successful!');
          setTimeout(() => navigate(`/admin/${user.id}`), 500);
        } else {
          toast.error('Login failed. Please try again.');
        }
      } catch (error) {
        console.error("Login Error:", error);
        toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
      }
    }
    else{

      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
        console.log("Login Response:", response);
        
        const { success, token, user } = response.data;
  
        if (success) {
          if (localStorage.getItem('user')) {
            localStorage.removeItem('user');
            localStorage.removeItem('token')
          }
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('isloggedIn', true);
          toast.success('Login successful!');
          setTimeout(() => navigate('/'), 500);
        } else {
          toast.error('Login failed. Please try again.');
        }
      } catch (error) {
        console.error("Login Error:", error);
        toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
      }
    }
  };

  return (
    <div className="login-page">
    <div className="login-form-container">
      <h2 className="login-heading">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
            className="login-form-input"
          />
        </div>
        <div className="login-form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            className="login-form-input"
          />
        </div>
        <div className="login-form-group">
          <label>Role</label>
          <select
            name="role"
            value={credentials.role}
            onChange={handleChange}
            required
            className="login-form-select"
          >
            <option value="Student">Student</option>
            <option value="Admin">Admin</option>
            <option value="Teacher">Teacher</option>
          </select>
        </div>
        <div className="login-form-button-wrapper">
          <button type="submit" className="login-submit-button">Login</button>
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default Login;
