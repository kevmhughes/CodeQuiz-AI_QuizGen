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
import Image from "./components/Image";

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
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const questionIndex = index;
  const hasFetched = useRef(false); // UseRef to track fetch status

  // useEffect to fetch questions only once after the first render
  useEffect(() => {
    if (hasFetched.current) return; // Prevent refetching

    // Mark as fetched
    hasFetched.current = true;

    const fetchQuestions = async () => {
      /* setLoading(true) */ // Ensure loading is set to true before the request

      try {
        if (AiDb) {
          // AI GENERATED QUESTION
          const response = await axios.get(
            `https://codequestapi.onrender.com/api/v1/questions/ai?amount=${formData.amount}&topic=${formData.topic}`
          );

          setQuestions(response.data.results); // Update questions state
        }

        /* if (randomDb) {
        // RANDOMLY GENERATED QUESTION
        const response = await axios.get(
          `https://codequestapi.onrender.com/api/v1/questions/random?amount=${formData.amount}`
        );
        
        setQuestions(response.data.results); 
        } */

        if (randomDb) {
          // BACK UP QUESTIONS
          setQuestions(backUpArray[0].results);
        }

        setError(null); // Reset error if the request was successful
      } catch (error) {
        setError("There was an error fetching the data.");
        console.error("Error fetching data:", error.response);
      } finally {
        setLoading(false); // Ensure loading is set to false when request is complete
      }
    };

    fetchQuestions();
  }, [formData, AiDb, randomDb, showQuizPage]);

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
      <div className="loader-container">
        <Image
          alt="CodeBrain app logo rotating during loading"
          className="rotating-image"
          src={logo}
        />
      </div>
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
  };

  const handleSeeScore = () => {
    setShowScore(true);
    setShowExplanationButton(false);
    setSelectedAnswer(null);
  };

  return (
    <>
      <header>
        <Image
          src={logo}
          className="header-logo"
          alt="Logo of the CodeBrain app in the header"
          handleReturnToStart={handleReturnToStart}
        />
      </header>
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
            />
          ) : (
            <>
              <h1 className="codebrain-title-text">&lt;CodeBrain&gt;</h1>
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
          <ScoreView score={score} handleReturnToStart={handleReturnToStart} />
        )}
      </div>
    </>
  );
}

export default App;
