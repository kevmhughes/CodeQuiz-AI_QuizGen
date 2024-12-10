/* eslint-disable */
import React from "react";
import Image from "./Image";
import logo from "/images/logo/logo.svg";

const Loader = () => {
  return (
    <div className="loader-container">
      <Image
        alt="CodeQuiz app logo rotating during loading"
        className="rotating-image"
        src={logo}
      />
    </div>
  );
};

export default Loader;