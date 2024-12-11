/* eslint-disable */
import React, { useState, useEffect } from "react";
import Image from "./Image";
import trophy from "/images/images/trophy.svg";
import donut from "/images/images/donut.svg";
import loser from "/images/images/loser.svg";
import winner from "/images/images/winner.svg";
import Confetti from "react-confetti";

const ScoreView = ({ score, accumulativeScore, handleReturnToStart }) => {
  const [confetti, setConfetti] = useState(false);
  const [fadeOutClass, setFadeOutClass] = useState("");

  useEffect(() => {
    if (totalScore >= 5) {
      setConfetti(true); // Show confetti immediately

      const confettiDuration = 8000; // Confetti will show for 8 seconds
      const fadeOutStartTime = 5000; // Start fading at 4 seconds

      // Confetti will stop after 8 seconds
      const timer = setTimeout(() => {
        setConfetti(false);
      }, confettiDuration);

      // Start fading out at 5 seconds
      const fadeOutTimer = setTimeout(() => {
        setFadeOutClass("fade-out"); // Trigger fade-out class
      }, fadeOutStartTime);

      // Cleanup timeouts
      return () => {
        clearTimeout(timer);
        clearTimeout(fadeOutTimer);
      };
    }
  }, []);

  // Sum up the total score of all the score values of the present quiz
  const totalScore = Object.values(score).reduce((acc, curr) => {
    return acc + curr.score;
  }, 0);

  // Convert the accumulative score object to an array of key-value pairs
  const ObjArray = Object.entries(accumulativeScore);
  // Filter the entries where the count value is greater than 0
  const filteredResults = ObjArray.filter(([key, value]) => value.count > 0);

  return (
    <div className="scoreview-container">
      {confetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          className={fadeOutClass}
        />
      )}

      {totalScore === 10 && (
        <>
          <Image
            src={winner}
            alt="Winner image for the scoreboard"
            className="jump-in-distance"
          />
          <div>WOW, you got a perfect score!</div>
          <div>Your score is {totalScore} out of 10.</div>
        </>
      )}
      {totalScore >= 5 && totalScore < 10 && (
        <>
          <Image
            src={trophy}
            alt="Trophy image for the scoreboard"
            className="jump-in-distance"
          />
          <div>
            Well done! Your score is {totalScore} out of 10.
          </div>
        </>
      )}

      {totalScore < 5 && totalScore > 0 && (
        <>
          <Image
            src={donut}
            alt="Donut stop trying image"
            className="jump-in-distance"
          />
          <div>You will do better next time!</div>
          <div>Your score is {totalScore} out of 10.</div>
        </>
      )}

      {totalScore === 0 && (
        <>
          <Image
            src={loser}
            alt="Loser image for the scoreboard"
            className="jump-in-distance"
          />
          <div>Err, better luck next time!</div>
          <div>Your score is {totalScore} out of 10.</div>
        </>
      )}

      <div className="breakdown-container">
        <div style={{ marginTop: "1rem", fontWeight: "bold" }}>Breakdown:</div>
        {filteredResults.map((results) => (
          <div key={results[0]}>
            {results[0]}: {results[1].score}/{results[1].count}
          </div>
        ))}
      </div>

      <button onClick={handleReturnToStart} className="play-again-button">
        Play again
      </button>
    </div>
  );
};

export default ScoreView;
