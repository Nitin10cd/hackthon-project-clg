import React, { useEffect, useState } from 'react';
import './EventCreation.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EventCreation = () => {
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    image: '',
    category: '',
    organizer: '' ,
    eventfor : ""
  });

  const [generatedDescription, setGeneratedDescription] = useState('');
  const [generateImage, setGenerateImage] = useState('');
  const [loading, setLoading] = useState(false);  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/events/eventcreation", { eventData , generateImage , generatedDescription });
      if (res.data.success) {
        toast.success("Event Created");
        navigate("/events");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const state = eventData.title && eventData.category;

  useEffect(() => {
    const generateAiData = async () => {
      if (state && !loading) {
        setLoading(true);  // Set loading to true before generating
        try {
          const res = await axios.post("http://localhost:5000/api/events/generatecontent", {
            title: eventData.title,
            category: eventData.category 
          });
          if (res.data && res.data.response) {
            console.log(res.data)
            setGeneratedDescription(res.data.response.description);
            setGenerateImage(res.data.response.imageUrl);
          }
        } catch (error) {
          console.log(error.message);
        } finally {
          setLoading(false);  // Set loading to false after generation
        }
      }
    };

    generateAiData();
  }, [state]);

  console.log(eventData)

  return (
    <div className="event-wrapper">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="form-title">Create New Event</h2>

        <div className="form-grid">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={eventData.title}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="time"
            value={eventData.time}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={eventData.location}
            onChange={handleChange}
            required
          />
          <select
            name="category"
            value={eventData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="technical">Technical</option>
            <option value="cultural">Cultural</option>
            <option value="sports">Sports</option>
            <option value="workshop">Workshop</option>
            <option value="seminar">Seminar</option>
          </select>
          <input
            type="text"
            name="organizer"
            placeholder="Enter Organizer Name"
            value={eventData.organizer}
            onChange={handleChange}
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={eventData.image || generateImage}
            onChange={handleChange}
          />
          <input 
          type='text' 
          name='eventfor'
          placeholder='select target auidence '
          value={eventData.eventfor} 
          onChange={handleChange}/>
        </div>

        <textarea
          name="description"
          className="full-width-textarea"
          placeholder="Event Description"
          value={eventData.description || generatedDescription}  // Show AI-generated description if available
          onChange={handleChange}
          required
        />

        {loading && <div className="loading-spinner">Loading AI content...</div>}

        <button type="submit" className="submit-btn" disabled={loading}>Create Event</button>
      </form>
    </div>
  );
};

export default EventCreation;