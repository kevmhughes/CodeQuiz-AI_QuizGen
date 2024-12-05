/* eslint-disable */
import React from 'react'

const Form = ( {handleChange, handleSubmit, values} ) => {
  return (
    <form onSubmit={handleSubmit}>
    <input
      type="number"
      name="amount"
      onChange={handleChange}
      placeholder="amount"
      value={values.amount}
      min={0}
      max={10}
    />
    <input
      type="text"
      name="topic"
      onChange={handleChange}
      placeholder="Choose a topic"
      value={values.topic}
    />
    <button type="submit">Submit</button>
  </form>
  )
}

export default Form
