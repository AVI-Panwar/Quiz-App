const questions= [
    {
        question:"Javascript is an _______ language?" ,
            
        answers: [
            { text:"Object-Oriented", correct:true} , 
            { text:"Object-Based", correct:false} , 
            { text:"Procedural", correct:false} , 
            { text:"None of the above", correct:false} , 

        ]
                
    },
    {
        question:"Among the given statements, which statement defines closures in JavaScript?" ,
            
        answers: [
            { text:"JavaScript is a function that is enclosed with references to its inner function scope", correct:false} , 
            { text:"JavaScript is a function that is enclosed with references to its lexical environment", correct:true} , 
            { text:"JavaScript is a function that is enclosed with the object to its inner function scope", correct:false} , 
            { text:"None of the above", correct:false} , 

        ]
                
    },
    {
        question:"Arrays in JavaScript are defined by which of the following statements?" ,
            
        answers: [
            { text:"It is an ordered list of values", correct:true} , 
            { text:" It is an ordered list of objects", correct:false} , 
            { text:"It is an ordered list of string", correct:false} , 
            { text:"It is an ordered list of functions", correct:false} , 

        ]
                
    },
    {
        question:"Which of the following scoping type does JavaScript use?" ,
            
        answers: [
            { text:"Sequential", correct:false} , 
            { text:"Segmental ", correct:false} , 
            { text:"Lexical", correct:true} , 
            { text:"Literal", correct:false} , 

        ]
                
    },
    {
        question:"Which of the following is the property that is triggered in response to JS errors?" ,
            
        answers: [
            { text:"onclick", correct:false} , 
            { text:"onerror", correct:true} , 
            { text:"onmessage", correct:false} , 
            { text:"onexception", correct:false} , 

        ]
                
    }

];

const questionElement = document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons")
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

// when we start the quiz this function will start 
function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; 

    currentQuestion.answers.forEach(answer=>{
              const button = document.createElement("button");
              button.innerHTML=answer.text; 
              button.classList.add("btn");
              answerButtons.appendChild(button);
              if(answer.correct)
              {
                button.dataset.correct=answer.correct;
              }
              button.addEventListener("click" , selectAnswer)
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild)
    { 
       answerButtons.removeChild(answerButtons.firstChild);   
    }
}

function selectAnswer(e)
{
      const selectedBtn=e.target;
      const isCorrect=selectedBtn.dataset.correct==="true";
      if(isCorrect)
      {
        selectedBtn.classList.add("correct");
        score++;
      }
      else
      {
        selectedBtn.classList.add("incorrect");
      }
      Array.from(answerButtons.children).forEach(button=>
        {
            if(button.dataset.correct==="true")
            {
                 button.classList.add("correct");
            }
            button.disabled=true;
        });
        nextButton.style.display="block";
}
function showScore()
{
    resetState();
    questionElement.innerHTML= `You scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex<questions.length)
  {
    showQuestion();
  }
  else
  {
    showScore();
  }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex<questions.length)
    {
        handleNextButton();
    }
    else
    {
        startQuiz();
    }
})
startQuiz();
