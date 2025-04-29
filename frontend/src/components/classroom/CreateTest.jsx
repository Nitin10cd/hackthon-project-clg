import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { toast } from "react-toastify";
import "./Test.css";

const CreateTest = () => {
  const [questions, setQuestions] = useState([]);
  const [name, setName] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [timeDuration, setTimeDuration] = useState("");
  const [classroomId, setClassroomId] = useState("");
  const navigate = useNavigate();
  const { currentClass } = useApp();

  useEffect(() => {
    setClassroomId(currentClass._id);
  }, [currentClass]);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { name: "", optionA: "", optionB: "", optionC: "", optionD: "", answer: "" },
    ]);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const testData = {
      name,
      classroom: classroomId,
      totalMarks,
      timeDuration,
      questions,
    };

    const response = await fetch("http://localhost:5000/api/classroom/createTest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    if (response.ok) {
      setName("");
      setTimeDuration("");
      setQuestions([]);
      setTotalMarks("");
      toast.success("Created Test Successfully");
    } else {
      console.error("Test not created");
    }
  };

  return (
    <div className="create-test-container">
      <h2>Create MCQ Test</h2>
      <form className="create-test-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Test Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Total Marks"
          value={totalMarks}
          onChange={(e) => setTotalMarks(e.target.value)}
        />
        <input
          type="number"
          placeholder="Time Duration (in minutes)"
          value={timeDuration}
          onChange={(e) => setTimeDuration(e.target.value)}
        />
        <input
          type="text"
          value={classroomId}
          readOnly
          required
        />

        <button type="button" onClick={addQuestion}>
          Add Question
        </button>

        <button type="submit">Create Test</button>
        <h3>Questions</h3>
        {questions.map((question, index) => (
          <div key={index} className="question-card">
            <input
              type="text"
              placeholder="Question"
              value={question.name}
              onChange={(e) => handleQuestionChange(index, "name", e.target.value)}
            />
            <input
              type="text"
              placeholder="Option A"
              value={question.optionA}
              onChange={(e) => handleQuestionChange(index, "optionA", e.target.value)}
            />
            <input
              type="text"
              placeholder="Option B"
              value={question.optionB}
              onChange={(e) => handleQuestionChange(index, "optionB", e.target.value)}
            />
            <input
              type="text"
              placeholder="Option C"
              value={question.optionC}
              onChange={(e) => handleQuestionChange(index, "optionC", e.target.value)}
            />
            <input
              type="text"
              placeholder="Option D"
              value={question.optionD}
              onChange={(e) => handleQuestionChange(index, "optionD", e.target.value)}
            />
            <input
              type="text"
              placeholder="Correct Answer (A, B, C, D)"
              value={question.answer}
              onChange={(e) => handleQuestionChange(index, "answer", e.target.value)}
            />
            <button type="button" onClick={() => removeQuestion(index)}>
              Remove Question
            </button>
          </div>
        ))}

      </form>
    </div>
  );
};

export default CreateTest;
