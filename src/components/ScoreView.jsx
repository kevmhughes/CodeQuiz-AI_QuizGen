/* eslint-disable */
import React, { useState, useEffect } from "react";
import Image from "./Image";
import trophy from "/images/images/trophy.svg";
import donut from "/images/images/donut.svg";
import loser from "/images/images/loser.svg";
import winner from "/images/images/winner.svg";
import Confetti from "react-confetti";

const ScoreView = ({
  score,
  accumulativeScore,
  setAccumulativeScore,
  handleReturnToStart,
  showStats,
  setShowScore,
  setShowStats,
}) => {
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

  const handleSeeYourStats = () => {
    setShowStats(true);
    localStorage.setItem(
      "accumulativeScore",
      JSON.stringify(accumulativeScore)
    );
  };

  const handleResetYourStats = () => {
    setAccumulativeScore({
      Angular: { score: 0, count: 0 },
      "Cloud Computing": { score: 0, count: 0 },
      CSS: { score: 0, count: 0 },
      DOM: { score: 0, count: 0 },
      Express: { score: 0, count: 0 },
      HTML: { score: 0, count: 0 },
      Git: { score: 0, count: 0 },
      JavaScript: { score: 0, count: 0 },
      MongoDB: { score: 0, count: 0 },
      MySQL: { score: 0, count: 0 },
      Other: { score: 0, count: 0 },
      PHP: { score: 0, count: 0 },
      Python: { score: 0, count: 0 },
      Node: { score: 0, count: 0 },
      React: { score: 0, count: 0 },
      "REST API": { score: 0, count: 0 },
      Testing: { score: 0, count: 0 },
      SQL: { score: 0, count: 0 },
      TypeScript: { score: 0, count: 0 },
      Vue: { score: 0, count: 0 },
      Random: { score: 0, count: 0 },
    });
    setShowScore(false);
    setShowStats(false);
    handleReturnToStart();
    localStorage.clear();
  };

  return (
    <>
      {showStats ? (
        <div className="stats-outer-container">
          {!filteredResults && (
            <div></div>
          )}
          <h1 style={{ marginTop: "1rem", fontWeight: "bold", textAlign:"center", marginBottom:"2rem" }}>
              Your Global Statistics
          </h1>
          <div className="stats-inner-container">
            {filteredResults &&
              filteredResults.map((results) => (
                <div className="stat-container" key={`${results[0]}-stat-container`}>
                  <div key={results[0]}>
                    <b>{results[0]}:</b> {results[1].score}/{results[1].count}
                  </div>
                  <div
                    key={`${results[0]}-piechart`}
                    className="pie"
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundImage: `conic-gradient(darkgray 0% ${
                        (results[1].score / results[1].count) * 100
                      }% , lightgray ${
                        (results[1].score / results[1].count) * 100
                      }% 100%)`,
                      borderRadius: "50%",
                    }}
                  ></div>
                  <div className="stat-percent">
                    {Math.ceil((results[1].score / results[1].count) * 100)}%
                  </div>
                </div>
              ))}
          </div>
          <button onClick={handleResetYourStats} className="reset-button">
            Reset Your Statistics
          </button>
        </div>
      ) : (
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
              <div>Well done! Your score is {totalScore} out of 10.</div>
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

          {accumulativeScore && (
            <div style={{ marginTop: "1rem" }}>
              Click{" "}
              <span
                onClick={handleSeeYourStats}
                className="see-your-stats"
              >
                here{" "}
              </span>
              to see your global statistics.
            </div>
          )}
        </div>
      )}
      <button onClick={handleReturnToStart} className="play-again-button">
        Play Again
      </button>
    </>
  );
};

export default ScoreView;
