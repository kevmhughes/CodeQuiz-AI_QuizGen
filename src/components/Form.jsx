/* eslint-disable */
import React from "react";
import GeneratorButton from "./GeneratorButton";

const Form = ({
  handleChange,
  handleSubmit,
  values,
  handleShowAIQuiz,
}) => {
  const topics = [
    "Algorithms",
    "API Development",
    "Data Structures",
    "Databases and SQL",
    "Debugging and Testing",
    "Functional Programming",
    "JavaScript Advanced Concepts",
    "JavaScript Basics",
    "Mobile App Development",
    "Object-Oriented Programming (OOP)",
    "Version Control with Git",
    "Web Development (HTML/CSS/JS)",
    "Web Frameworks (React, Angular, Vue)",
  ];

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        name="amount"
        onChange={handleChange}
        placeholder="amount"
        value={values.amount}
        min={1}
        max={10}
      />
      <select name="topic" onChange={handleChange} value={values.topic}>
        <option value="">Select a programming topic</option>
        {topics.map((topic, index) => (
          <option key={index} value={topic.toLowerCase().replace(/\s+/g, "")}>
            {topic}
          </option>
        ))}
      </select>
      <GeneratorButton handleShowAIQuiz={handleShowAIQuiz} />
    </form>
  );
};

export default Form;
