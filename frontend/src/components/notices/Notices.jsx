import React, { useEffect, useState } from 'react';
import './Notices.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';






const Notices = () => {

  const [Notices, setNotices] = useState([]);
  const storeduser = localStorage.getItem("user");
  const userrole = storeduser ? JSON.parse(storeduser).role : undefined;
  useEffect(() => {
    const FetchNotices = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/notices", { withCredentials: true });
        console.log(res.data);
        if (res.data.success) {
          setNotices(res.data.notices);
        }
      }
      catch (error) {
        console.log(error.message);
      }
    }

    FetchNotices();
  }, [])

  const DeleteHandler = async (id) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/deletenotice", { _id: id }, { withCredentials: true });
      console.log(res.data);
      if (res.data.success) {
        toast.success("Notice Deleted Successfully");
      }
    }
    catch (error) {
      console.log(error.message);
    }
  }

  console.log("notices", Notices)
  return (
    <div className="notices-container">
      <h2 className="notices-heading">📢 Latest Notices</h2>

      <div className="notices-list">
        {Notices?.map((notice, index) => (
          <div key={index} className="notice-card">
            <h3 className="notice-title">{notice.title}</h3>
            <p className="notice-description">{notice.description}</p>
            <div className="notice-footer">
              <span>👨‍💼 {notice.author}</span>
              <span>🎯 {notice.targetAudience}</span>
              <span>🗓️ {notice.date}</span>
            </div>
            {
              userrole == "admin" && (
                <div>
                  <button className="delete-button" onClick={() => DeleteHandler(notice._id)}>
                    Delete Notice
                  </button>
                </div>
              )
            }
          </div>
        ))}

      </div>
      <ToastContainer />
    </div>
  );
};

export default Notices;