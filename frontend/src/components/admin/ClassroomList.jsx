import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './classroomList.css'; // Create this similar to studentList.css
import { toast } from "react-toastify";

const ClassroomList = () => {
  const [classrooms, setClassrooms] = useState([]);

  const fetchClassrooms = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/get-classrooms');
      if (res.data.success) {
        setClassrooms(res.data.classroomListData);
      } else {
        console.error('Failed to fetch classroom list');
      }
    } catch (error) {
      console.error('Error fetching classroom list:', error);
    }
  };

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const handleDelete = async (classroomId) => {
    try {
      const response = await axios.delete("http://localhost:5000/api/admin/delete-classroom", {
        data: { id: classroomId }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setClassrooms((prevClassrooms) => prevClassrooms.filter(classroom => classroom._id !== classroomId));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting classroom");
      console.log(error);
    }
  };

  const handleView = (classroomId) => {
    console.log('View classroom with ID:', classroomId);
    // Future: You can navigate to classroom details or open a modal
  };

  return (
    <div className="classroom-list-container">
      <h2>Classroom List</h2>
      <table className="classroom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Teacher</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classrooms.length > 0 ? (
            classrooms.map((classroom) => (
              <tr key={classroom._id}>
                <td>{classroom.name}</td>
                <td>{classroom.subject}</td>
                <td>{classroom.teacherName || 'Unknown'}</td>
                <td>
                  <button className="view-btn" onClick={() => handleView(classroom._id)}>View</button>
                  <button className="delete-btn" onClick={() => handleDelete(classroom._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No classrooms found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClassroomList;
