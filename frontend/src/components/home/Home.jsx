import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import ProfileTab from '../tabs/ProfileTab';
import './Home.css'
import Classroomlist from '../classroom/Classroomlist';
import PlacementCell from '../plcementCell/PlacementCell';
const Home = () => {
  const { user, tab, setUser, logout, setIsLoggedIn, isLoggedIn } = useApp();
  const [localUser, setLocalUser] = useState(null); 

  useEffect(() => {
    const state = localStorage.getItem('isloggedIn');
    const bool = state === "true";
    setIsLoggedIn(bool);
    console.log(isLoggedIn);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setLocalUser(storedUser);
    }

  
    if (storedUser && storedUser.id) {
      const fetchUserData = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/student/fetchDetails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: storedUser.id }),
          });

          if (response.ok) {
            const data = await response.json();
       
            setUser(data.data); 
            console.log('User data fetched successfully:', data);
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }

  }, [setIsLoggedIn, isLoggedIn, setUser]); 

  useEffect(()=>{
    console.log("User",user);
  },[user]);

  

  return (
    <div className='whole-container'>
      <Navbar />

      {isLoggedIn ? (

        <div>
          <div className='homeContainer'>
          <Sidebar />
          {
            (tab == "Profile") && <ProfileTab />
            
          }
          {(tab == "Classrooms") && <Classroomlist/>}
          { (tab == "Placement Cell" && <PlacementCell/>)}
          </div>
          
        </div>
      ) : (
        <div>
          <h2>You are not logged in</h2>
        </div>
      )}
    </div>
  );
};

export default Home;
