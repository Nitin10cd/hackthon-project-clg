import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import "./Teststu.css"; 

const StartTest = () => {
  const { testId } = useParams();
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { user } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/classroom/start-test/${testId}`);
        if (response.ok) {
          const data = await response.json();
          setTest(data.test);
          setTimeRemaining(data.test.timeDuration * 60);
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

    setTimeout(() => {
      if (currentQuestionIndex < test.questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    }, 300);
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

  const currentQuestion = test.questions[currentQuestionIndex];

  return (
    <div className="starttest-wrapper">
      <div className="starttest-header">
        <h1>{test.name}</h1>
        <div className="timer">
          ⏰ {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, '0')}
        </div>
      </div>

      <div className="question-container slide">
        <div className="question-number">
          Question {currentQuestionIndex + 1} of {test.questions.length}
        </div>
        <h2 className="question-text">{currentQuestion.name}</h2>
        <div className="options-list">
          {currentQuestion.options.map((option, index) => (
            <label key={index} className={`option ${answers[currentQuestion._id] === option ? "selected" : ""}`}>
              <input
                type="radio"
                name={currentQuestion._id}
                value={option}
                checked={answers[currentQuestion._id] === option}
                onChange={() => handleAnswerChange(currentQuestion._id, option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {currentQuestionIndex === test.questions.length - 1 && (
        <button
          className="submit-test-btn"
          onClick={handleSubmit}
          disabled={timeRemaining === 0}
        >
          {timeRemaining === 0 ? "Time Over" : "Submit Test"}
        </button>
      )}
    </div>
  );
};

export default StartTest;
