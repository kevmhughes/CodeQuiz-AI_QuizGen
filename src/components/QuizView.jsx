/* eslint-disable */
import React from "react";
import categoryString from "../utils/formatCategoryString";
import Question from "./Question";
import Answers from "./Answers";
import Explanation from "./Explanation";

const QuizView = ({
  questions,
  questionIndex,
  questionsToDisplay,
  formData,
  nextQuestion,
  showExplanationButton,
  setShowExplanationButton,
  setSelectedAnswer,
  selectedAnswer,
  index,
  setScore,
  handleSeeScore,
}) => {
  return (
    <div className="quiz-container">
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <b>Question:</b> {questionIndex + 1}/{questionsToDisplay.length}
        </div>
        <div>
          <b>Category:</b> {categoryString(formData.topic)}
        </div>
      </div>
      <Question questions={questionsToDisplay} index={index} />
      <Answers
        questions={questionsToDisplay}
        handleNextQuestion={nextQuestion}
        showExplanationButton={showExplanationButton}
        setShowExplanationButton={setShowExplanationButton}
        setSelectedAnswer={setSelectedAnswer}
        selectedAnswer={selectedAnswer}
        index={index}
        setScore={setScore}
      />
      {showExplanationButton && (
        <Explanation questions={questionsToDisplay} index={index} />
      )}
      {index + 1 === questions.length && showExplanationButton && (
        <button onClick={handleSeeScore} className="see-score-button">
          See Your Score
        </button>
      )}
    </div>
  );
};

export default QuizView;
