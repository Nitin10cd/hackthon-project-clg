import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './teacherList.css'; 

const TeacherComponent = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/get-teachers');
        if (res.data.success) {
          setTeachers(res.data.teacherListData);
        } else {
          console.error('Failed to fetch teacher list');
        }
      } catch (error) {
        console.error('Error fetching teacher list:', error);
      }
    };

    fetchTeachers();
  }, []);

  const handleDelete = (teacherId) => {
    console.log('Delete teacher with ID:', teacherId);
  };

  const handleView = (teacherId) => {
    console.log('View teacher with ID:', teacherId);
  };

  return (
    <div className="teacher-list-container">
      <h2>Teacher List</h2>
      <table className="teacher-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subject/Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.length > 0 ? (
            teachers.map((teacher) => (
              <tr key={teacher._id}>
                <td>{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>{teacher.subject || teacher.course || 'N/A'}</td>
                <td>
                  <button className="view-btn" onClick={() => handleView(teacher._id)}>View</button>
                  <button className="delete-btn" onClick={() => handleDelete(teacher._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No teachers found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherComponent;
