/* eslint-disable */
import React, { useState, useEffect } from "react";
import { fisherYatesShuffle } from "../utils/fisherYatesShuffle";

const Answers = ({
  questions,
  handleNextQuestion,
  index,
  setIndex,
  setShowExplanationButton,
  setSelectedAnswer,
  selectedAnswer,
}) => {
  // Function to handle when an answer is selected
  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer); // Store the selected answer
    setShowExplanationButton(true); // Show the explanation button
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
        let buttonStyle = {};

        // Determine the color based on whether the answer is correct or not
        if (selectedAnswer === answer) {
          buttonStyle = {
            backgroundColor: isCorrect ? "green" : "red",
            color: "white",
          };
        }

        return (
          <button
            key={answerIndex}
            onClick={() => handleAnswerClick(answer)}
            style={buttonStyle}
            disabled={selectedAnswer !== null}
          >
            {answer.answer}
          </button>
        );
      })}

      {selectedAnswer && questions.length !== index + 1 ? (
        <button
          onClick={() => handleNextQuestion(setIndex, setShowExplanationButton)}
        >
          Next Question
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Answers;
