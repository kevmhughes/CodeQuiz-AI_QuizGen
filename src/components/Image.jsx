/* eslint-disable */
import React from 'react'
import logo from "/images/logo/logo.svg";

const Image = ({ handleReturnToStart, className, alt }) => {
  return (
    <img
    src={logo}
    alt={alt}
    onClick={handleReturnToStart}
    className={className}
  />
  )
}

export default Image
