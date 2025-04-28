import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import "./dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    classrooms: 0,
  });

  const [studentData, setStudentData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [classroomData, setClassroomData] = useState([]);

  const COLORS = ['#4caf50', '#ff9800', '#00acc1'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentRes, teacherRes] = await Promise.all([
          axios.get('http://localhost:5000/api/admin/get-students'),
          axios.get('http://localhost:5000/api/admin/get-teachers'),
        ]);

        const classroomRes = await axios.get('http://localhost:5000/api/admin/get-classrooms');
        if (!classroomRes.data.success) {
            console.log(classroomRes.data.message);
        }

        console.log("Classroom data:",classroomRes.data)
        setStats({
          students: studentRes.data.studentList,
          teachers: teacherRes.data.teacherList,
          classrooms: classroomRes.data.classroomList,
        });

        setStudentData(studentRes.data.studentData || []);
        setTeacherData(teacherRes.data.teacherListData || []);
        setClassroomData(classroomRes.data.classroomListData || []);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  },[]);

  const pieData = [
    { name: 'Students', value: stats.students },
    { name: 'Teachers', value: stats.teachers },
    { name: 'Classrooms', value: stats.classrooms },
  ];

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-heading">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="stats-cards">
        <div className="card">
          <h2>Total Students</h2>
          <p>{stats.students}</p>
        </div>
        <div className="card">
          <h2>Total Teachers</h2>
          <p>{stats.teachers}</p>
        </div>
        <div className="card">
          <h2>Total Classrooms</h2>
          <p>{stats.classrooms}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-section">
        <div className="chart-container">
          <h3>Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Statistics Bar</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pieData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#4caf50" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
