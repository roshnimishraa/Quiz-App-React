import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";
import quizCompleteImg from "../assets/quiz-complete.png";

export default function Quiz() {
//useRef = will not change if the component function is executed again
  // useRef();
  const [answerState, setAnswerState] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);
  
  // userAnswers = ['A', 'B'] -> 2 answers given
  // the next question shown should be the third question
  // the index of that next question would be 2 (becz indexes start at 0)

  const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setAnswerState('answered');
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
    setTimeout(() => {
       if(selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]){
        setAnswerState('correct');
       }
       else{
        setAnswerState('wrong');
       }

       //reset 
       setTimeout(() => {
        setAnswerState('');
       }, 2000)
    }, 3000);
  },
  [activeQuestionIndex]);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Quiz Completed" />
        <h2>Quiz Completed</h2>
      </div>
    );
  }

  //creating new array(copy) so that don't edit the original array
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];

  // sort will not return new array but instead edit the array
  // if -ve no. -1 then those elements will be swapped
  // if +ve no. they will stay in the order they are
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="questions">
        <QuestionTimer 
        key={activeQuestionIndex }
        timeout={10000} onTimeout={handleSkipAnswer}
         />

        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>

        <ul id="answers">
           
           {shuffledAnswers.map((answer) => {
              
            const isSelected = userAnswers[userAnswers.length - 1] === answer;

             let cssClasses = '';

             if(answerState === 'answered' && isSelected)
             {
              cssClasses = 'selected';
             }

             if((answerState === 'correct' || answerState === 'wrong') 
            && isSelected)
             {
              cssClasses = answerState;
             }

            return (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}
              className={cssClasses}
              >
                {answer}
              </button>
            </li>
            )
           })}
     
        </ul>
      </div>
    </div>
  );
}
