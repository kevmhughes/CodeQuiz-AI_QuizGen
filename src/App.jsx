import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  handleSubmit,
  handleChange,
  handleNextQuestion,
  handleShowAIQuiz,
} from "./handlers/formHandlers"
import Question from "./components/Question";
import Answers from "./components/Answers";
import Explanation from "./components/Explanation";
import AiInputChoices from "./components/AiInputChoices";
import "./assets/styles/styles.css";
import backUpArray from "../src/utils/backUpArray";
import Image from "./components/Image";

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    amount: 1,
    topic: "",
  });
  const [values, setValues] = useState({
    amount: 1,
    topic: "",
  });
  const [showQuizPage, setShowQuizPage] = useState(false);
  const [index, setIndex] = useState(0);
  const [showExplanationButton, setShowExplanationButton] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [AiDb, setAiDb] = useState(false);
  const [randomDb, setRandomDb] = useState(false);
  const [showForm, setShowForm] = useState(false);

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

    fetchQuestions(); // Fetch questions only once on mount
  }, [formData, AiDb, randomDb]);

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
        <Image alt="CodeBrain app logo rotating during loading" className="rotating-image" />
      </div>
    );
  }

  // If no questions are available (both fetch failed and backup is empty), show a fallback message
  if (questionsToDisplay.length === 0) {
    return (
      <div>No questions available at the moment. Please try again later.</div>
    );
  }

  // Don't show the error message if we're using the backup array
  if (error && questions.length > 0) {
    return <div>Testing</div>; /* <div>{error}</div>; */
  }

  const handleRandomDb = (e) => {
    e.preventDefault();
    setLoading(true);
    setRandomDb(true);
    setShowQuizPage(true);
    setFormData(values);
    setValues({
      amount: 1,
    });
    hasFetched.current = false;
    setAiDb(false);
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleReturnToStart = () => {
    setShowQuizPage(false);
    setShowForm(false);
  };

  return (
    <>
      <header>
        <Image
          className="header-logo"
          alt="Logo of the CodeBrain app in the header"
          handleReturnToStart={handleReturnToStart}
        />
      </header>
      <div className="main-container">
        <h1>&lt;CodeBrain&gt;</h1>
        {showQuizPage ? (
          <div className="quiz-container">
            <h1>
              Question: {questionIndex + 1}/{questionsToDisplay.length}
            </h1>
            <Question questions={questionsToDisplay} index={index} />
            <Answers
              questions={questionsToDisplay}
              handleNextQuestion={nextQuestion}
              setShowExplanationButton={setShowExplanationButton}
              setSelectedAnswer={setSelectedAnswer}
              selectedAnswer={selectedAnswer}
              index={index}
            />
            {showExplanationButton && (
              <Explanation questions={questionsToDisplay} index={index} />
            )}
            <br />
            {index + 1 === questions.length ? (
              <button onClick={handleReturnToStart} style={{ width: "100%" }}>
                See Your Score
              </button>
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <div className="choices-container">
            <Image alt="Logo of the CodeBrain app"/>
            <div className="AI-input-choices-container">
              <div>
                {showForm ? (
                  <AiInputChoices
                    handleShowAIQuiz={showAIQuiz}
                    handleSubmit={submit}
                    handleChange={change}
                    values={values}
                    showForm={showForm}
                  />
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            {showForm ? (
              <div></div>
            ) : (
              <>
                <div style={{ marginTop: "3rem" }}>Choose A Quiz:</div>
                <div className="start-page-buttons-container">
                  <button
                    style={{
                      width: "100%",
                      marginTop: "1rem",
                      backgroundColor: "#0097B2",
                    }}
                    onClick={handleShowForm}
                  >
                    AI
                  </button>
                  <button
                    style={{
                      width: "100%",
                      marginTop: "1rem",
                      backgroundColor: "#004AAD",
                    }}
                    onClick={handleRandomDb}
                  >
                    CB Quiz
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
