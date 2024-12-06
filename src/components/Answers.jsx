/* eslint-disable */
import React from 'react'

const Answers = ({ questions, handleNextQuestion, index }) => {
    console.log("question", questions)
  return (
    <div className="answers-container">
    {questions[index].answerOptions.map((answer, answerIndex) => (
      <button key={answerIndex}>
        {answer.answer} <b>{answer.isCorrect ? "correct" : "incorrect"}</b>
      </button>
    ))}
    <button onClick={handleNextQuestion}>Next Question</button>
  </div>
  )
}

export default Answers
