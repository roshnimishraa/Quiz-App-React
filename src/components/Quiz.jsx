import { useState } from "react"
import QUESTIONS from "../questions.js"


export default function Quiz(){
    
    const [userAnswers, setUserAnswers] = useState([]);
    
    // userAnswers = ['A', 'B'] -> 2 answers given 
    // the next question shown should be the third question 
    // the index of that next question would be 2 (becz indexes start at 0)

    const activeQuestionIndex = userAnswers.length;

     function handleSelectAnswer(selectedAnswer){
     setUserAnswers((prevUserAnswers) => {
         return [...prevUserAnswers, selectedAnswer];   
     });
     }
    return (
     <div id= "quiz">
         <div id="questions">
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