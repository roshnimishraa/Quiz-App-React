import { useCallback, useState, useEffect } from "react";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [numQuestions, setNumQuestions] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);

  // Fetch categories when component mounts
  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("https://opentdb.com/api_category.php");
      const data = await res.json();
      setCategories(data.trivia_categories);
    }
    fetchCategories();
  }, []);

  // Fetch questions once category + difficulty + number are chosen
  async function startQuiz() {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=${numQuestions}&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`
    );
    const data = await res.json();

    const formatted = data.results.map((q, index) => ({
      id: `q${index + 1}`,
      text: decodeHTMLEntities(q.question),
      answers: shuffleArray([q.correct_answer, ...q.incorrect_answers]),
      correctAnswer: q.correct_answer,
    }));

    setQuestions(formatted);
    setUserAnswers([]);
  }

  function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }

  function decodeHTMLEntities(text) {
    const txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
  }

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete =
    questions.length > 0 && activeQuestionIndex === questions.length;

  const handleSelectAnswer = useCallback((selectedAnswer) => {
    setUserAnswers((prev) => [...prev, selectedAnswer]);
  }, []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  // Show category + difficulty + numQuestions selection if no quiz started
  if (questions.length === 0) {
    return (
      <div className="quiz-options-card">
        <h2>Select Quiz Options</h2>

        {/* Category Dropdown */}
        <div className="quiz-form-group">
          <label>Category:</label>
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory || ""}
            className="quiz-dropdown"
          >
            <option value="">-- Choose a Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Dropdown */}
        <div className="quiz-form-group">
          <label>Difficulty:</label>
          <select
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            value={selectedDifficulty}
            className="quiz-dropdown"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Number of Questions Dropdown */}
        <div className="quiz-form-group">
          <label>No. of Questions:</label>
          <select
            onChange={(e) => setNumQuestions(e.target.value)}
            value={numQuestions}
            className="quiz-dropdown"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>

        {/* Start Button */}
        <button
          onClick={startQuiz}
          disabled={!selectedCategory}
          className={`quiz-start-btn ${
            selectedCategory ? "enabled" : "disabled"
          }`}
        >
          Start Quiz
        </button>
      </div>
    );
  }

  if (quizIsComplete) {
    return (
      <Summary
        userAnswers={userAnswers}
        questions={questions}
        onRestart={() => {
          // reset everything
          setQuestions([]);
          setUserAnswers([]);
          setSelectedCategory(null);
        }}
      />
    );
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
        questions={questions}
      />
    </div>
  );
}
