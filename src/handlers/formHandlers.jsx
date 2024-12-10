// Form submission handler
export const handleSubmit = (
  e,
  setFormData,
  values,
  setValues,
  hasFetched,
  setLoading
) => {
  e.preventDefault();
  setFormData(values);
  setValues({
    amount: 10,
    topic: "",
  });
  hasFetched.current = false;
  setLoading(true);
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
export const handleNextQuestion = (
  setIndex,
  questionsToDisplay,
  setShowExplanationButton,
  setSelectedAnswer
) => {
  setIndex((prevIndex) =>
    Math.min(prevIndex + 1, questionsToDisplay.length - 1)
  );
  setShowExplanationButton(false);
  setSelectedAnswer(null);
};

// generate AI quiz handler on "start" page
export const handleShowAIQuiz = (
  e,
  setShowQuizPage,
  setFormData,
  values,
  setValues,
  hasFetched,
  setLoading,
  setAiDb,
  setRandomDb
) => {
  e.preventDefault();
  setAiDb(true);
  setRandomDb(false);
  setShowQuizPage(true);
  setFormData(values);
  setValues({
    amount: 10,
    topic: "",
  });
  hasFetched.current = false;
  setLoading(true);
};
