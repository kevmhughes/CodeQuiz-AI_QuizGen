import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  handleSubmit,
  handleChange,
  handleNextQuestion,
  handleShowAIQuiz,
} from "./handlers/formHandlers";
import ScoreView from "./components/ScoreView";
import ChoicesView from "./components/ChoicesView";
import QuizView from "./components/QuizView";
import "./assets/styles/styles.css";
import logo from "/images/logo/logo.svg";
import backUpArray from "../src/utils/backUpArray";
import Header from "./components/Header";
import Loader from "./components/Loader";

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    amount: 10,
    topic: "",
  });
  const [values, setValues] = useState({
    amount: 10,
    topic: "",
  });
  const [showQuizPage, setShowQuizPage] = useState(false);
  const [index, setIndex] = useState(0);
  const [showExplanationButton, setShowExplanationButton] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [AiDb, setAiDb] = useState(false);
  const [randomDb, setRandomDb] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [score, setScore] = useState({
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
  const [accumulativeScore, setAccumulativeScore] = useState({
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
  const [showScore, setShowScore] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const questionIndex = index;
  const hasFetched = useRef(false); // UseRef to track fetch status

  useEffect(() => {
    // On mount, retrieve the accumulativeScore from localStorage
    const savedScores = localStorage.getItem("accumulativeScore");
    if (savedScores) {
      console.log("saved scores", JSON.parse(savedScores));
      setAccumulativeScore(JSON.parse(savedScores)); // Set state with retrieved score
    }
  }, []); // This only runs once when the component mounts

  // useEffect to fetch questions only once after the first render
  useEffect(() => {
    if (hasFetched.current) return; // Prevent refetching

    // Mark as fetched
    hasFetched.current = true;

    const fetchQuestions = async () => {
      setLoading(true);

      try {
        if (AiDb) {
          // AI GENERATED QUESTION
          const response = await axios.get(
            `https://codequestapi.onrender.com/api/v1/questions/ai?amount=${formData.amount}&topic=${formData.topic}`
          );

          setQuestions(response.data.results); // Update questions state
        }

        if (randomDb) {
          // RANDOMLY GENERATED QUESTION
          const response = await axios.get(
            `https://codequestapi.onrender.com/api/v1/questions/random?amount=${formData.amount}`
          );

          setQuestions(response.data.results);
        }

        /* if (randomDb) {
          // BACK UP QUESTIONS
          setQuestions(backUpArray[0].results);
        } */

        setError(null); // Reset error if the request was successful
      } catch (error) {
        setError("There was an error fetching the data.");
        console.error("Error fetching data:", error.response);
      } finally {
        setLoading(false); // Ensure loading is set to false when request is complete
      }
    };

    fetchQuestions();
  }, [formData, AiDb, randomDb, showQuizPage, accumulativeScore]);

  const questionsToDisplay =
    questions.length > 0 ? questions : backUpArray[0].results;

  // handlers
  const nextQuestion = () => {
    handleNextQuestion(
      setIndex,
      questionsToDisplay,
      setShowExplanationButton,
      setSelectedAnswer
    );
  };
  const submit = (e) => {
    handleSubmit(e, setFormData, values, setValues, hasFetched, setLoading);
  };
  const change = (e) => {
    handleChange(e, setValues);
  };
  const showAIQuiz = (e) => {
    handleShowAIQuiz(
      e,
      setShowQuizPage,
      setFormData,
      values,
      setValues,
      hasFetched,
      setLoading,
      setAiDb,
      setRandomDb
    );
  };

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  // If no questions are available (both fetch failed and backup is empty), show a fallback message
  if (questionsToDisplay.length === 0) {
    return (
      <div>No questions available at the moment. Please try again later.</div>
    );
  }

  // Show error if there are no questions
  if (error && questions.length > 0) {
    return <div>{error}</div>;
  }

  const handleRandomDb = (e) => {
    e.preventDefault();
    setLoading(true);
    setRandomDb(true);
    setShowQuizPage(true);
    setFormData(values);
    setValues({
      amount: 10,
    });
    hasFetched.current = false;
    setAiDb(false);
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleReturnToStart = () => {
    setShowForm(false);
    setShowScore(false);
    setIndex(0);
    setShowQuizPage(false);
    setScore(0);
    setShowExplanationButton(false);
    setSelectedAnswer(null);
    setQuestions([]);
    localStorage.setItem(
      "accumulativeScore",
      JSON.stringify(accumulativeScore)
    );
  };

  const handleCombineScores = () => {
    // Get the previous scores from localStorage
    const savedPreviousScoresObject = localStorage.getItem("accumulativeScore");
    const parsedScoresObject = savedPreviousScoresObject
      ? JSON.parse(savedPreviousScoresObject)
      : accumulativeScore; // Use existing accumulativeScore if no saved data

    // Combine the score and count for each category
    const combinedScores = Object.keys(score).reduce((acc, key) => {
      // Safely add previous score and current score
      acc[key] = {
        score: (score[key]?.score || 0) + (parsedScoresObject[key]?.score || 0),
        count: (score[key]?.count || 0) + (parsedScoresObject[key]?.count || 0),
      };
      return acc;
    }, {});

    // Update the accumulativeScore state with the combined scores
    setAccumulativeScore((prevScore) => ({
      ...prevScore, // Keep previous score values
      ...combinedScores, // Add the newly combined scores
    }));
  };

  const handleSeeScore = () => {
    setShowScore(true);
    setShowExplanationButton(false);
    setSelectedAnswer(null);

    // Combine scores and update state
    handleCombineScores();
  };

  return (
    <>
      <Header logo={logo} handleReturnToStart={handleReturnToStart} />
      <div className="main-container">
        {!showScore ? (
          showQuizPage ? (
            <QuizView
              questions={questions}
              questionIndex={questionIndex}
              questionsToDisplay={questionsToDisplay}
              formData={formData}
              nextQuestion={nextQuestion}
              showExplanationButton={showExplanationButton}
              setShowExplanationButton={setShowExplanationButton}
              setSelectedAnswer={setSelectedAnswer}
              selectedAnswer={selectedAnswer}
              index={index}
              setScore={setScore}
              handleSeeScore={handleSeeScore}
              AiDb={AiDb}
              randomDb={randomDb}
            />
          ) : (
            <>
              <h1 className="codequiz-title-text">&lt;CodeQuiz&gt;</h1>
              <ChoicesView
                handleShowForm={handleShowForm}
                showForm={showForm}
                handleShowAIQuiz={showAIQuiz}
                handleSubmit={submit}
                handleChange={change}
                values={values}
                handleRandomDb={handleRandomDb}
                logo={logo}
              />
            </>
          )
        ) : (
          <ScoreView
            score={score}
            accumulativeScore={accumulativeScore}
            handleReturnToStart={handleReturnToStart}
            showStats={showStats}
            setShowStats={setShowStats}
            setShowScore={setShowScore}
            setAccumulativeScore={setAccumulativeScore}
          />
        )}
      </div>
    </>
  );
}

export default App;
