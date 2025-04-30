import React, { useEffect, useState } from 'react';
import { Form, useParams } from 'react-router-dom';
import axios from 'axios';
import './EventDetailed.css';
import { toast } from 'react-toastify';

const EventDetailed = () => {
  const { eventid } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const options = ['UseFul', 'NotUseFul'];
  const [select, setselect] = useState('');

  const fetchEventDetails = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/events/eventdetails", { _id: eventid });
      setEvent(res.data.event);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching event details", err);
      setLoading(false);
    }
  };
  const changeHandler = async (option) => {
    setselect(option);
    const storeduser = localStorage.getItem('user');
    const parseduser = storeduser ? JSON.parse(storeduser) : undefined;

    if (parseduser) {
      const role = parseduser.role;
      const eventid = event?._id ;
      const userid = parseduser.id ;
       if (role === "student") {
    try {
      const res = await axios.post("http://localhost:5000/api/events/eventpoll", {
        eventid,
        userid
      });
      console.log(res.data);
      toast.success("Your vote has been recorded!");
    } catch (error) {
      console.error("Poll submission failed:", error.message);
    }
  } else {
  }

    }
  }
  useEffect(() => {
    fetchEventDetails();
  }, []);

  if (loading) {
    return (
      <div className="event-loading">
        <div className="event-loading-text">Loading Event...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="event-not-found">
        Event not found.
      </div>
    );
  }

  return (
    <div className="event-page">
      <div className="event-card">
    
        <h2 className="event-title">{event.title}</h2>
        <p className="event-category">{event.category} Event</p>

        <div className="event-info-grid">
          <div>
            <p className="event-label">📍 Location:</p>
            <p>{event.location}</p>
          </div>
          <div>
            <p className="event-label">🗓️ Date:</p>
            <p>{new Date(event.date).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="event-label">⏰ Time:</p>
            <p>{event.time}</p>
          </div>
        </div>

        <div className="event-description-box">
          <p className="event-label">📖 Description:</p>
          <p>{event.description}</p>
        </div>
        <div className="poll-container">
          <p className="poll-question">Was this event helpful?</p>
          <div className="poll-options">
            {options.map((option) => (
              <button
                key={option}
                className={`poll-btn ${select === option ? 'selected' : ''}`}
                onClick={() => changeHandler(option)}
                type="button"
              >
                {option}
                {select === option && <span className="tick-mark">✔</span>}
              </button>
            ))}
          </div>
        </div>



      </div>

    </div>
  );
};

export default EventDetailed;