/* eslint-disable */
import React from 'react'

const Answers = ({ questions, handleNextQuestion }) => {
  return (
    <div className="answers-container">
    {questions[0].answerOptions.map((answer, answerIndex) => (
      <button key={answerIndex}>
        {answer.answer} <b>{answer.isCorrect ? "correct" : "incorrect"}</b>
      </button>
    ))}
    <button onClick={handleNextQuestion}>Next Question</button>
  </div>
  )
}

export default Answers
