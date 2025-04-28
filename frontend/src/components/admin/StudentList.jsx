import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './studentList.css';
import { toast } from "react-toastify";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/get-students');
      if (res.data.success) {
        setStudents(res.data.studentData);
      } else {
        console.error('Failed to fetch student list');
      }
    } catch (error) {
      console.error('Error fetching student list:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (email) => {
    try {
      const response = await axios.delete("http://localhost:5000/api/admin/delete-student", {
        data: { email: email }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        // Remove the deleted student from local state
        setStudents((prevStudents) => prevStudents.filter(student => student.email !== email));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting student");
      console.log(error);
    }
  };

  const handleView = (studentId) => {
    console.log('View student with ID:', studentId);
    // Future: You can show a modal with full student details
  };

  return (
    <div className="student-list-container">
      <h2>Student List</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roll-no</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.rollno}</td>
                <td>
                  <button className="view-btn" onClick={() => handleView(student._id)}>View</button>
                  <button className="delete-btn" onClick={() => handleDelete(student.email)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No students found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
