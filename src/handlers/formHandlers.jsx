// Form submission handler
export const handleSubmit = (e, setFormData, values, setValues, hasFetched) => {
    e.preventDefault();
    setFormData(values);
    setValues({
      amount: 1,
      topic: "",
    });
    hasFetched.current = false;
  };

// input change handler
export const handleChange = (e, setValues) => {
    const { name, value } = e.target;
    setValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

// go to next question handler
export const handleNextQuestion = (setIndex, questionsToDisplay) => {
    setIndex((prevIndex) =>
      Math.min(prevIndex + 1, questionsToDisplay.length - 1)
    );
  };

// generate AI quiz handler on "start" page
export const handleShowAIQuiz = (e, setShowState, setFormData, values, setValues, hasFetched, setLoading) => {
    setShowState(true);
    e.preventDefault();
    setFormData(values);
    setValues({
      amount: 1,
      topic: "",
    });
    hasFetched.current = false;
    setLoading(true);
  };