/* eslint-disable */
import React from "react";
import AiInputChoices from "./AiInputChoices"; // Assuming this is a separate component
import Image from "./Image"; // Assuming Image is a separate component

const ChoicesView = ({
  showForm,
  handleShowForm,
  handleShowAIQuiz,
  handleSubmit,
  handleChange,
  values,
  handleRandomDb,
  logo,
}) => (
  <div className="choices-container">
    <Image alt="Logo of the CodeBrain app" src={logo} className="main-logo" />
    <div className="AI-input-choices-container">
      {showForm ? (
        <AiInputChoices
          handleShowAIQuiz={handleShowAIQuiz}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          values={values}
          showForm={showForm}
        />
      ) : (
        <div className="choose-your-quiz-text">
          Choose Your Quiz
        </div>
      )}
    </div>
    {!showForm && (
      <div className="start-page-buttons-container">
        <button className="choices-view-button-left" onClick={handleShowForm}>
          <span className="choices-view-button-left-span">AI</span>
        </button>
        <button className="choices-view-button-right" onClick={handleRandomDb}>
          <span className="choices-view-button-right-span">CB</span>
        </button>
      </div>
    )}
  </div>
);

export default ChoicesView;
