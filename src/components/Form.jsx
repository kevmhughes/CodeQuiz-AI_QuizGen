/* eslint-disable */
import React from "react";
import { topics } from "../utils/topics";
import GeneratorButton from "./GeneratorButton";

const Form = ({ handleChange, handleSubmit, values, handleShowAIQuiz }) => {
  return (
    <form onSubmit={handleSubmit}>
      <select
        name="topic"
        onChange={handleChange}
        value={values.topic}
        required
      >
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
