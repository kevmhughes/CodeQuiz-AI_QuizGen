/* eslint-disable */
import React from 'react'

const Image = ({ handleReturnToStart, className, alt, src }) => {
  return (
    <img
    src={src}
    alt={alt}
    onClick={handleReturnToStart}
    className={className}
  />
  )
}

export default Image
