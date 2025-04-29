import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import './Test.css'

const TestList = () => {
  const [tests, setTests] = useState([]);
  const [classroomId, setClassroomId] = useState("");
  const { currentClass } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentClass?._id) {
      setClassroomId(currentClass._id);
    }
  }, [currentClass]);

  useEffect(() => {
    if (!classroomId) return;

    const fetchTests = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/classroom/get-test/${classroomId}`
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
  }, [classroomId]);

  const startTest = (testId) => {
    navigate(`/test/${testId}`);
  };

  return (
    <div>
      <h2>Assigned Tests</h2>
      <div>
        {tests.length === 0 ? (
          <p>No tests assigned yet.</p>
        ) : (
          tests.map((test) => (
            <div key={test._id}>
              <h3>{test.name}</h3>
              <button onClick={() => startTest(test._id)}>Start Test</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TestList;
