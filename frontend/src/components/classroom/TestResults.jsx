import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Test.css"; 

const TestResults = () => {
  const { testId } = useParams(); 
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!testId) return;

    const fetchResults = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/classroom/test-result/${testId}`);
        if (response.ok) {
          const data = await response.json();
          setResults(data.submissions);
        } else {
          console.error("Failed to fetch results");
        }
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, [testId]);

  if (!results || results.length === 0) {
    return <div className="test-results-loading">No results found yet.</div>;
  }

  return (
    <div className="test-results-container">
      <h2 className="test-results-header">Test Results</h2>
      <div className="test-results-list">
        {results.map((result) => (
          <div key={result.student?._id || Math.random()} className="test-result-item">
            <p className="student-name">{result.student?.name || "Unnamed Student"}</p>
            <p className="marks">Marks: {result.marks}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestResults;
