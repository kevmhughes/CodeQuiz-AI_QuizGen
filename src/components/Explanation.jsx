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
    <div style={{ marginTop: "1rem", width: "100%" }}>
      <button
        onClick={toggleExplanation}
        style={{ width: "100%", padding: "12px" }}
      >
        {isExplanationVisible ? "Hide Explanation" : "Show Explanation"}
      </button>
      {/* add style to CSS file later */}
      <div
        className="explanation-container"
        style={{
          width: "100%",
          marginTop: "1rem",
          display: isExplanationVisible ? "block" : "none",
        }}
      >
        {questions[index].explanation}
      </div>
    </div>
  );
};

export default Explanation;
