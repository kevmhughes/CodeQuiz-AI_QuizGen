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
  AiDb,
  randomDb,
  docco
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
      <Question
        questions={questionsToDisplay}
        index={index}
        AiDb={AiDb}
        randomDb={randomDb}
        docco={docco} 
      />
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
      {index + 1 === questions.length && showExplanationButton && (
        <button onClick={handleSeeScore} className="see-score-button">
          See Your Score
        </button>
      )}
      {showExplanationButton && (
        <Explanation questions={questionsToDisplay} index={index} />
      )}
    </div>
  );
};

export default QuizView;
