/* eslint-disable */
import React from "react";

const GeneratorButton = ({ handleShowAIQuiz }) => {
  return (
    <button style={{ width: "100%", backgroundColor: "#0097B2" }} onClick={handleShowAIQuiz}>
      AI Generator
    </button>
  );
};

export default GeneratorButton;
