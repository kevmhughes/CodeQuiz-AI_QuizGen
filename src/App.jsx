import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  handleSubmit,
  handleChange,
  handleNextQuestion,
  handleShowAIQuiz,
} from "./handlers/formhandlers";
import Question from "./components/Question";
import Form from "./components/Form";
import Answers from "./components/Answers";
import Explanation from "./components/Explanation";
import "./assets/styles/styles.css";
import backUpArray from "../src/utils/backUpArray";

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
  const [showState, setShowState] = useState(false);
  const [index, setIndex] = useState(0);

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
        const response = await axios.get(
          `https://codequestapi.onrender.com/api/v1/questions/ai?amount=${formData.amount}&topic=${formData.topic}`
        );
        setQuestions(response.data.results); // Update questions state
        setError(null); // Reset error if the request was successful
      } catch (error) {
        setError("There was an error fetching the data.");
        console.error("Error fetching data:", error.response);
      } finally {
        setLoading(false); // Ensure loading is set to false when request is complete
      }
    };

    fetchQuestions(); // Fetch questions only once on mount
  }, [formData]);

  const questionsToDisplay =
    questions.length > 0 ? questions : backUpArray[0].results;

  // handlers
  const nextQuestion = () => {
    handleNextQuestion(setIndex, questionsToDisplay);
  };
  const submit = (e) => {
    handleSubmit(e, setFormData, setValues, values, hasFetched);
  };
  const change = (e) => {
    handleChange(e, setValues);
  };
  const showAIQuiz = (e) => {
    handleShowAIQuiz(
      e,
      setShowState,
      setFormData,
      values,
      setValues,
      hasFetched,
      setLoading
    );
  };

  if (loading) {
    return <div>AI is generating your questions with your settings...</div>;
  }

  // If no questions are available (both fetch failed and backup is empty), show a fallback message
  if (questionsToDisplay.length === 0) {
    return (
      <div>No questions available at the moment. Please try again later.</div>
    );
  }

  // Don't show the error message if we're using the backup array
  if (error && questions.length > 0) {
    return <div>Hello</div>; /* <div>{error}</div>; */
  }

  return (
    <div className="main-container">
      {showState ? (
        <>
          <h1>Quiz Master</h1>
          <h1>
            Question: {questionIndex + 1}/{questionsToDisplay.length}
          </h1>
          <Question questions={questionsToDisplay} index={index} />
          <Answers
            questions={questionsToDisplay}
            handleNextQuestion={nextQuestion}
            index={index}
          />
          <Explanation questions={questionsToDisplay} index={index} />
          <br />
          <Form handleSubmit={submit} handleChange={change} values={values} />
        </>
      ) : (
        <div>
          Choose A Quiz
          <Form
            handleSubmit={submit}
            handleChange={change}
            handleShowAIQuiz={showAIQuiz}
            values={values}
            showState={showState}
          />
        </div>
      )}
    </div>
  );
}

export default App;
