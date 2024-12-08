/* eslint-disable */
import React, { useEffect, useState } from "react";

const Explanation = ({ questions, index }) => {
  useEffect(() => {
    setIsExplanationVisible(false);
  }, [index]);

  const [isExplanationVisible, setIsExplanationVisible] = useState(false);

  const toggleExplanation = () => {
    setIsExplanationVisible((prevState) => !prevState);
  };

  if (!questions || !questions[index]) {
    return <div>Loading...</div>;
  }

  if (!questions[index].explanation) {
    return <></>;
  }

  return (
    <div className="explanation-button-text-container" >
      <button
        onClick={toggleExplanation}
        className="explanation-button"
      >
        {isExplanationVisible ? "Hide Explanation" : "Show Explanation"}
      </button>
      {/* add style to CSS file later */}
      <div
        className="explanation-text-container"
        style={{
          display: isExplanationVisible ? "block" : "none",
        }}
      >
        {questions[index].explanation}
      </div>
    </div>
  );
};

export default Explanation;
