/* eslint-disable */
import React, { useState, useEffect } from "react";
import { fisherYatesShuffle } from "../utils/fisherYatesShuffle";
import categoryString from "../utils/formatCategoryString";

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
  AiDb,
  randomDb,
  formData
}) => {
  // Function to handle when an answer is selected
  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer); // Store the selected answer
    setShowExplanationButton(true); // Show the explanation button

    let formattedCategory;

    if (AiDb) {
      formattedCategory = categoryString(formData.topic);
    } else if (randomDb) {
      formattedCategory = categoryString(questions[index].categories[0]);
    }

    // If the answer is correct, update the score and count for the category
    if (answer.isCorrect) {
      setScore((prevScore) => {
        // Get the current stats for the category or initialize them if undefined
        const currentCategoryStats = prevScore[formattedCategory] || {
          score: 0,
          count: 0,
        };

        return {
          ...prevScore, // Spread the previous state to maintain other categories
          [formattedCategory]: {
            score: currentCategoryStats.score + 1, // Increment score by 1
            count: currentCategoryStats.count + 1, // Increment count by 1
          },
        };
      });
    } else {
      // Increment count only if the answer is incorrect or to track question attempts
      setScore((prevScore) => {
        const currentCategoryStats = prevScore[formattedCategory] || {
          score: 0,
          count: 0,
        };

        return {
          ...prevScore,
          [formattedCategory]: {
            ...currentCategoryStats,
            count: currentCategoryStats.count + 1, // Increment count (whether correct or not)
          },
        };
      });
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
            border: `2px solid ${isCorrect && "green"}`,
            boxSizing: "border-box",
            padding: `${isCorrect && "10px"}`,
          };
        }

        return (
          <button
            key={answerIndex}
            onClick={() => handleAnswerClick(answer)}
            className="answer-buttons"
            style={{ ...buttonStyle, ...borderStyle }}
            disabled={selectedAnswer !== null}
          >
            {answer.answer}
          </button>
        );
      })}

      {selectedAnswer && questions.length !== index + 1 && (
        <button
          className="next-question-button"
          onClick={() => handleNextQuestion(setIndex, setShowExplanationButton)}
        >
          Next Question
        </button>
      )}
    </div>
  );
};

export default Answers;
