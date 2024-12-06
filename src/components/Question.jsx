/* eslint-disable */

import React from 'react'

const Question = ({ questions, index }) => {
  return (
    <div>
      {questions[index].question}
    </div>
  )
}

export default Question
