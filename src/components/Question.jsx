/* eslint-disable */

import React from "react";

const Question = ({ questions, index }) => {
  return <div className="question-container">{questions[index].question}</div>;
};

export default Question;
