/* eslint-disable */
import React, { useState, useEffect } from "react";
import { fisherYatesShuffle } from "../utils/fisherYatesShuffle";

const Answers = ({
  questions,
  handleNextQuestion,
  index,
  setIndex,
  showExplanationButton,
  setShowExplanationButton,
  setSelectedAnswer,
  selectedAnswer,
  setScore,
}) => {
  // Function to handle when an answer is selected
  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer); // Store the selected answer
    setShowExplanationButton(true); // Show the explanation button
    if (answer.isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  // Shuffling answers on initial render (not on every re-render)
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    // Shuffle answers when the component is mounted or when the question changes
    setShuffledAnswers(fisherYatesShuffle(questions[index].answerOptions));
  }, [index, questions]);

  return (
    <div className="answers-container">
      {shuffledAnswers.map((answer, answerIndex) => {
        const isCorrect = answer.isCorrect;
        let buttonStyle = { padding: "12px" };
        let borderStyle = {};

        // Check if the answer is selected
        if (selectedAnswer === answer) {
          buttonStyle = {
            backgroundColor: isCorrect ? "green" : "red",
            color: "white",
          };
        }

        if (showExplanationButton) {
          // For non-selected answers, add a border based on correctness
          borderStyle = {
            border: `8px solid ${isCorrect && "green"}`,
            boxSizing: "border-box",
            padding: `${isCorrect && "4px"}`, // Remove padding equal to the border size // Ensure the border is inside the button
          };
        }

        return (
          <button
            key={answerIndex}
            onClick={() => handleAnswerClick(answer)}
            style={{ ...buttonStyle, ...borderStyle }}
            disabled={selectedAnswer !== null}
          >
            {answer.answer}
          </button>
        );
      })}

      {selectedAnswer && questions.length !== index + 1 && (
        <button
          style={{ padding: "12px" }}
          onClick={() => handleNextQuestion(setIndex, setShowExplanationButton)}
        >
          Next Question
        </button>
      )}
    </div>
  );
};

export default Answers;
