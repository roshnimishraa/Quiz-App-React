import { useState } from "react"
import QUESTIONS from "../questions.js"
import QuestionTimer from "./QuestionTimer.jsx";
import quizCompleteImg from "../assets/quiz-complete.png"

export default function Quiz(){
    
    const [userAnswers, setUserAnswers] = useState([]);
    
    // userAnswers = ['A', 'B'] -> 2 answers given 
    // the next question shown should be the third question 
    // the index of that next question would be 2 (becz indexes start at 0)

    const activeQuestionIndex = userAnswers.length;

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

     function handleSelectAnswer(selectedAnswer){
     setUserAnswers((prevUserAnswers) => {
         return [...prevUserAnswers, selectedAnswer];   
     });
     }

     if(quizIsComplete){
        return (
        <div id="summary">
          <img src={quizCompleteImg} alt="Quiz Completed"/>
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
     <div id= "quiz">
         <div id="questions">
            <QuestionTimer timeout={10000}
             onTimeout={() => handleSelectAnswer(null)}
              />
    <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
     <ul id="answers">
        {QUESTIONS[activeQuestionIndex].answers.map((answer) => (
            <li key = {answer} className="answer">
                <button onClick={ () => handleSelectAnswer(answer )}>{answer}</button>
            </li>
        ))}
     </ul>
        </div>
     </div>
    )
}