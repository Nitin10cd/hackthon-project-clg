import React, { useEffect, useState } from 'react';
import './PlacementCell.css'
import { useApp } from '../../context/AppContext';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
    const {placementOption , setPlacementOption} = useApp();

  const categories = ['All', 'Sales', 'Marketing', 'Engineering', 'Finance', 'Customer Support', 'Healthcare', 'Education', 'IT'];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/jobs');
        const data = await response.json();
        setJobs(data.data);
        setFilteredJobs(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);
// const toggle function 
const toggler = () => {
  setPlacementOption(prev => !prev)
}
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter((job) =>
        job.tags && job.tags.some((tag) => tag.toLowerCase().includes(category.toLowerCase()))
      );
      setFilteredJobs(filtered);
    }
  };

  if (loading) {
    return (
      <div className="loading-message">
        Loading jobs...
      </div>
    );
  }

  return (
    <div className="jobs-container">
      <h2 className="jobs-heading">🔥 Available Job Opportunities</h2>
      <button onClick={toggler}>Placement Cell Opportunity</button>

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
              <p className="job-company">{job.company_name}</p>
              <p className="job-location">
                📍 {job.location}
                {job.remote && <span className="remote-badge"> (Remote Available)</span>}
              </p>
              <p className="job-type">
                <strong>Job Type:</strong> {job.job_types && job.job_types.length > 0 ? job.job_types.join(', ') : 'N/A'}
              </p>
              {job.description && (
                <p className="job-description">
                  {job.description.length > 250 ? job.description.slice(0, 250) + '...' : job.description}
                </p>
              )}
              <a
                href={job.url}
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
            No jobs found in "{selectedCategory}" category.
          </p>
        )}
      </div>
    </div>
  );
};

export default JobsList;
