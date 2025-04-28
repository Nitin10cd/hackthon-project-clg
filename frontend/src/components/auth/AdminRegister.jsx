import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './stuAuth.css'

const AdminRegister = () => {
   const [user, setUser] = useState({
      name: '',
      email: '',
      contact: '',
      password: ''
    });

     const navigate = useNavigate();

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
          const response = await axios.post('http://localhost:5000/api/auth/admin-register', user);
          if (response.status === 201) {
            toast.success('Registration successful!');
            navigate('/admin');
          }
        } catch (error) {
          toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
        }
      };

  return (
    <div className="student-register-container">
      <form action="student-register-form"  onSubmit={handleSubmit} >
        <h2 className='student-register-heading'> Admin Register</h2>
        <div className='form-grid'>
          <div className='form-group'>
            <label>Name</label>
            <input type="text" name="name" value={user.name} className="form-input" onChange={handleChange} required/>
          </div>
          <div className='form-group'>
            <label>Email</label>
            <input type="text" name="email" value={user.email} className="form-input" onChange={handleChange} required/>
          </div>
          <div className='form-group'>
            <label>Contact</label>
            <input type="text" name="contact" value={user.contact} className="form-input" onChange={handleChange} required/>
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input type="text" name="password" value={user.password} className="form-input" onChange={handleChange} required/>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AdminRegister;
