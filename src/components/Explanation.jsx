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

  if (!questions[index].explanation) {
    return (
        <>
        </>
    )
  } 

  return (
    <div style={{ marginTop: "1rem" }}>
      <button onClick={toggleExplanation} style={{ width: "100%" }}>
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
