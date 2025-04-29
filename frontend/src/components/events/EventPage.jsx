import React, { useEffect, useState } from 'react';
import './EventPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [selectrole, setselectrole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events/eventsfetch");
        setEvents(res.data.events);
      } catch (error) {
        console.error("Failed to fetch events:", error.message);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = selectrole
    ? events.filter(event => event.eventfor === selectrole)
    : events;

  const roles = ["Admin", "Teacher", "Student"];

  return (
    <div className="events-container">
      <div className="filter-buttons">
        {roles.map(role => (
          <button
            key={role}
            className={`filter-btn ${selectrole === role ? "active" : ""}`}
            onClick={() => setselectrole(role)}
          >
            {role}'s Events
          </button>
        ))}
        <button
          className={`filter-btn ${selectrole === null ? "active" : ""}`}
          onClick={() => setselectrole(null)}
        >
          All Events
        </button>
      </div>

      <h1 className="events-title">Campus Events</h1>

      <div className="events-grid">
        {filteredEvents.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#555" }}>
            No events available for the selected role.
          </p>
        ) : (
          <div className="events-list">
            {filteredEvents.map(event => (
              <div
                className="event-card"
                key={event._id}
                onClick={() => navigate(`/events/${event._id}`)}
              >
                {/* Optional image here if needed */}
                {/* <img src={event.imageUrl} alt="Event" className="event-image" /> */}
                <div className="event-content">
                  <h2 className="event-title">{event.title}</h2>
                  <p className="event-date">{event.date} at {event.time}</p>
                  <p className="event-location">📍 {event.location}</p>
                  <p className="event-description">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
