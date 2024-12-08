/* eslint-disable */
import React, { useState, useEffect } from "react";
import Image from "./Image";
import trophy from "/images/images/trophy.svg";
import donut from "/images/images/donut.svg";
import loser from "/images/images/loser.svg";
import winner from "/images/images/winner.svg";
import Confetti from "react-confetti";

const ScoreView = ({ score, handleReturnToStart }) => {
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    if (score >= 5) {
      setConfetti(true);
      const timer = setTimeout(() => {
        setConfetti(false);
      }, 5000); // Confetti will show for 5 seconds

      // Clean up timeout on component unmount or when score changes
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="scoreview-container">
      {/* Confetti effect */}
      {confetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      {score === 10 && (
        <>
          <Image
            src={winner}
            alt="Winner image for the scoreboard"
            className="jump-in-distance"
          />
          <div>WOW, you got a perfect score!</div>
          <div>Your final score is {score} out of 10</div>
        </>
      )}
      {score >= 5 && score < 10 && (
        <>
          <Image
            src={trophy}
            alt="Trophy image for the scoreboard"
            className="jump-in-distance"
          />
          <div>Well done! Your final score is {score} out of 10</div>
        </>
      )}

      {score < 5 && score > 0 && (
        <>
          <Image
            src={donut}
            alt="Donut stop trying image"
            className="jump-in-distance"
          />
          <div>You will do better next time!</div>
          <div>Your final score is {score} out of 10</div>
        </>
      )}

      {score === 0 && (
        <>
          <Image
            src={loser}
            alt="Loser image for the scoreboard"
            className="jump-in-distance"
          />
          <div>Err, better luck next time!</div>
          <div>Your final score is {score} out of 10</div>
        </>
      )}
      <button onClick={handleReturnToStart} className="play-again-button">
        Play again
      </button>
    </div>
  );
};

export default ScoreView;
