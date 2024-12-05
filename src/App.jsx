import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Question from "./components/Question";
import Form from "./components/Form";
import Answers from "./components/Answers";
import "./assets/styles/styles.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add an error state to display errors
  const [formData, setFormData] = useState({
    amount: 5,
    topic: "",
  });
  const [values, setValues] = useState({
    amount: 1,
    topic: "",
  });
  const [index, setIndex] = useState(0);

  const questionIndex = index;

  const hasFetched = useRef(false); // UseRef to track fetch status

  // useEffect to fetch questions only once after the first render
  useEffect(() => {
    if (hasFetched.current) return; // Prevent refetching

    // Mark as fetched
    hasFetched.current = true;

    const fetchQuestions = async () => {
      setLoading(true); // Ensure loading is set to true before the request

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
  }, [formData]); // Empty dependency array ensures this runs only once on mount

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    setFormData(values);
    setValues({
      amount: 5,
      topic: "",
    });
    hasFetched.current = false;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) {
    return <div>AI is generating your questions with your settings...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Handle the next question click
  const handleNextQuestion = () => {
    setIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));
  };

  return (
    <div className="main-container">
      <h1>AI Powered Programming Quiz Master</h1>
      <Form
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        values={values}
      />
      <h1>
        Question number: {questionIndex + 1} out of {questions.length}
      </h1>
      <Question question={questions[index]} />
      <Answers questions={questions} handleNextQuestion={handleNextQuestion}/>
      <br />
    </div>
  );
}

export default App;
