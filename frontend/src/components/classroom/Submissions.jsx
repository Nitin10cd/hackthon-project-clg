import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import "./Test.css"; 

const Submissions = () => {
  const [tests, setTests] = useState([]);
  const { currentClass } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentClass?._id) return;

    const fetchTests = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/classroom/get-test/${currentClass._id}`
        );
        if (response.ok) {
          const data = await response.json();
          setTests(data.tests);
        }
      } catch (error) {
        console.error("Failed to fetch tests:", error);
      }
    };

    fetchTests();
  }, [currentClass]);

  const viewResult = (testId) => {
    navigate(`/result/${testId}`);
  };

  return (
    <div className="submissions-container">
      <h2>Submissions</h2>
      <div className="test-list">
        {tests.length === 0 ? (
          <p className="no-tests">No tests available.</p>
        ) : (
          tests.map((test) => (
            <div key={test._id} style={{"backgroundColor": "#444", padding: "10px" , display: "flex", justifyContent: "space-between"}} className="test-card">
              <h3>{test.name}</h3>
              <button
                style={{width: "200px", height: "40px"}}
                className="view-result-btn"
                onClick={() => viewResult(test._id)}
              >
                View Submission
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Submissions;
