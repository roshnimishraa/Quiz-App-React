import {useRef} from 'react';

export default function Answers({answers, selectedAnswer, answerState, onSelect}) {

    //useRef = will not change if the component function is executed again
  const shuffledAnswers = useRef();


      if(!shuffledAnswers.current){
    
      //creating new array(copy) so that don't edit the original array
       shuffledAnswers.current = [...answers];
    
      // sort will not return new array but instead edit the array
      // if -ve no. -1 then those elements will be swapped
      // if +ve no. they will stay in the order they are
      shuffledAnswers.current.sort(() => Math.random() - 0.5);
      }

    return (
        <>
         <ul id="answers">
           
           {shuffledAnswers.current.map((answer) => {
              
            const isSelected = selectedAnswer === answer;

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
              <button onClick={() => onSelect(answer)}
              className={cssClasses}
              >
                {answer}
              </button>
            </li>
            )
           })}
     
        </ul>
        </>
    )
}