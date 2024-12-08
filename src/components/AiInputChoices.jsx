/* eslint-disable */
import React from "react";
import Form from "./Form";

const AiInputChoices = ({
  showForm,
  handleSubmit,
  handleChange,
  handleShowAIQuiz,
  values,
}) => {
  return (
    <div className="AI-input-choices-container">
      <div>
        {showForm && (
          <div className="AI-inputs">
            <Form
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              handleShowAIQuiz={handleShowAIQuiz}
              values={values}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AiInputChoices;
