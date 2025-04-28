import React, { useEffect, useState } from 'react';
import './EventPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events/eventsfetch");
        console.log(res.data);
        setEvents(res.data.events);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="events-container">
      <h1 className="events-title">Campus Events</h1>
      <div className="events-grid">
        {events?.map((event) => (
          <div className="event-card" key={event._id} onClick={() => navigate(`/events/${event._id}`)}>
            <div className="event-card-inner">
              <img src={event.imageUrl} alt={event.title} className="event-image" />
              <div className="event-content">
                <h2 className="event-title">{event.title}</h2>
                <p className="event-date">{event.date} at {event.time}</p>
                <p className="event-location">📍 {event.location}</p>
                <p className="event-description">{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;