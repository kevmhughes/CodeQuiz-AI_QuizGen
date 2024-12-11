/* eslint-disable */
import React from 'react'
import Image from './Image'

const Header = ({ logo, handleReturnToStart }) => {
  return (
    <header>
    <Image
      src={logo}
      className="header-logo"
      alt="Logo of the CodeQuiz app in the header"
      handleReturnToStart={handleReturnToStart}
    />
  </header>
  )
}

export default Header
