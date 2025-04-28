import React, { useEffect, useState } from 'react';
import './PlacementCell.css';
import { useApp } from '../../context/AppContext';

const PlacementJobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { placementOption, setPlacementOption } = useApp();

  const categories = ['All', 'Sales', 'Marketing', 'Engineering', 'Finance', 'Customer Support', 'Healthcare', 'Education', 'IT'];

  useEffect(() => {
    const fetchPlacementJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/placement/placement-jobs');
        const data = await response.json();
        setJobs(data.data);
        setFilteredJobs(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching placement jobs:', error);
        setLoading(false);
      }
    };

    fetchPlacementJobs();
  }, []);

  const toggler = () => {
    setPlacementOption((prev) => !prev);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter((job) =>
        job.skills && job.skills.some((skill) => skill.toLowerCase().includes(category.toLowerCase()))
      );
      setFilteredJobs(filtered);
    }
  };

  if (loading) {
    return (
      <div className="loading-message">
        Loading placement jobs...
      </div>
    );
  }

  return (
    <div className="jobs-container">
      <h2 className="jobs-heading">🔥 Available Placement Job Opportunities</h2>
      <button onClick={toggler}>Placement Cell Opportunity</button>

      {/* Filters */}
      <div className="filter-buttons">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Jobs */}
      <div className="jobs-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <div key={index} className="job-card">
              <h3 className="job-title">{job.title}</h3>
              <p className="job-by">{job.by}</p>
              <p className="job-location">📍 {job.location || 'Location not specified'}</p>
              <p className="job-skills">
                <strong>Skills Required:</strong> {job.skills.join(', ')}
              </p>
              <p className="job-qualification">
                <strong>Qualifications:</strong> {job.qualification.join(', ')}
              </p>
              {job.description && (
                <p className="job-description">
                  {job.description.length > 250 ? job.description.slice(0, 250) + '...' : job.description}
                </p>
              )}
              <a
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="apply-button"
              >
                🚀 Apply Now
              </a>
            </div>
          ))
        ) : (
          <p className="no-jobs-message">
            No placement jobs found in "{selectedCategory}" category.
          </p>
        )}
      </div>
    </div>
  );
};

export default PlacementJobsList;
