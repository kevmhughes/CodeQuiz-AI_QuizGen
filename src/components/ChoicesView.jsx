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
        <div style={{ marginTop: "4rem", fontSize: "1.5rem" }}>
          Choose Your Quiz
        </div>
      )}
    </div>
    {!showForm && (
      <div className="start-page-buttons-container">
        <button className="choices-view-button-left" onClick={handleShowForm}>
          AI Quiz
        </button>
        <button className="choices-view-button-right" onClick={handleRandomDb}>
          CB Quiz
        </button>
      </div>
    )}
  </div>
);

export default ChoicesView;
