import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import react-router-dom
import { AppProvider } from "./context/AppContext"
import StudentRegister from './components/auth/StudentRegister'; // Your StudentRegister component
import Home from './components/home/Home';
import { ToastContainer } from 'react-toastify'; // To show toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Import the toast styles
import Login from './components/auth/Login';
import TeacherRegister from './components/auth/TeacherRegoster';
import TeacherClassroom from './components/classroom/TeacherClassroom';
import StudentClassroom from './components/classroom/StudentClassroom';
import Chats from './components/Chat/Chats';
import PlacementCell from './components/plcementCell/PlacementCell';
import AdminDashBoard from './components/admin/AdminDashBoard';
import EventCreation from './components/events/EventCreation';
import EventDetailed from './components/events/EventDetailed';
import NoticeCreation from './components/notices/NoticeCreation';
import Notices from './components/notices/Notices'
import EventsPage from './components/events/EventPage';
import Dashboard from './components/admin/Dashboard';
import StudentList from './components/admin/StudentList';
import TeacherComponent from './components/admin/TeacherComponent';
import StartTest from './components/classroom/StartTest';
import TestResults from './components/classroom/TestResults';


const App = () => {
  return (

      <Router>
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/register" element={<StudentRegister />} /> 
            <Route path='/login' element={<Login/>} />
            <Route path='/teacherRegister' element= {<TeacherRegister/>} />
            <Route path='/teacherclassroom' element = {<TeacherClassroom />} />
            <Route path='/studentclassroom' element ={<StudentClassroom/>} />
            <Route path='/student/:id/chat' element={<Chats/>}/>
            <Route path='/admin/:id' element={<AdminDashBoard/>}/>
            <Route path='/events' element={<EventsPage/>}/>
            <Route path='/eventscreation' element={<EventCreation/>}/>
            <Route path='/events/:eventid' element={<EventDetailed/>}/>
            <Route path="/createnotice" element={<NoticeCreation/>}/>
            <Route path='/notices' element={<Notices/>}/>
            <Route path='/dashboard' element = {<Dashboard/>}/>
            <Route path='/student-list' element = {<StudentList/>} />
            <Route path='/teacher-list' element ={<TeacherComponent/>} />
            <Route path='/test/:testId' element = {<StartTest/> } />
            <Route path='/result/:testId' element = {<TestResults/>} />
          </Routes>
      </Router>
  );
};

export default App;
