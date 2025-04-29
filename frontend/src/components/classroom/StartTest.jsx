import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import "./Test.css"; 

const StartTest = () => {
  const { testId } = useParams();
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const { user } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/classroom/start-test/${testId}`
        );
        if (response.ok) {
          const data = await response.json();
          setTest(data.test);
          setTimeRemaining(data.test.timeDuration * 60); // minutes to seconds
        }
      } catch (error) {
        console.error("Failed to fetch test:", error);
      }
    };

    fetchTest();

    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [testId]);

  const handleAnswerChange = (questionId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/classroom/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentId: user.id, testId, answers }),
      });

      if (response.ok) {
        alert("Test submitted successfully!");
        navigate("/");
      } else {
        alert("Failed to submit test!");
      }
    } catch (error) {
      console.error("Error submitting test:", error);
    }
  };

  if (!test) {
    return <div className="starttest-loading">Loading test...</div>;
  }

  return (
    <div className="starttest-container">
      <div className="starttest-header">
        <h2>{test.name}</h2>
        <p>Time Remaining: {Math.floor(timeRemaining / 60)}m {timeRemaining % 60}s</p>
      </div>

      <div className="starttest-questions">
        {test.questions.map((question) => (
          <div key={question._id} className="question-card">
            <h3>{question.name}</h3>
            <div className="options-container">
              {question.options.map((option, index) => (
                <label key={index} className="option-item">
                  <input
                    type="radio"
                    name={question._id}
                    value={option}
                    checked={answers[question._id] === option}
                    onChange={() => handleAnswerChange(question._id, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        className="submit-test-btn"
        onClick={handleSubmit}
        disabled={timeRemaining === 0}
      >
        {timeRemaining === 0 ? "Time Over" : "Submit Test"}
      </button>
    </div>
  );
};

export default StartTest;
