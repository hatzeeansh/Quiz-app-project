
console.log('this is game.js page')

const ques=document.getElementById('question')
console.log(ques)

const choice=Array.from(document.getElementsByClassName('choice-text'))
const quesCount= document.getElementById('questioncount')
const scores=document.getElementById('score');
const pgb=document.getElementById('progressbar-full')
console.log(choice)
let questionCounter=0;
let score=0;
let availableQuestion=[];
let acceptinngAnswer=false;
let currentQuestion={};
let questions=[];
let game=document.getElementById('game')
let loader=document.getElementById('loader')
// fetch("question.json").then(res=>res.json())
// .then(lq=>{
//     console.log(lq);
//     questions=lq;
//     console.log(lq)
//     startGame();
// }).catch(err=>{
//     console.log(err)
// })
//some constant for the quiz

fetch(" https://the-trivia-api.com/api/questions")
.then(res=>res.json())
.then(data=>{
    console.log(data);
   questions= data.map(d=>{
        const formatedques={
            question:d.question
        };

        const answerchoice=[...d.incorrectAnswers];
        formatedques.answer=Math.floor(Math.random()*3)+1;
        answerchoice.splice(formatedques.answer-1,0,d.correctAnswer);
        console.log(answerchoice)
        answerchoice.forEach((choice,index)=>{
            formatedques["choice"+(index+1)]=choice;
        })
        return formatedques
    })
   
    startGame();
})

const corrrectBonus=10;
const maxQuestion=3;

startGame=()=>{
    questionCounter=0;
    score=0;
    availableQuestion=[...questions]
    console.log(availableQuestion)
    getNewQuestion();
    game.classList.remove('hidden')
    loader.classList.add('hidden')
}

getNewQuestion=()=>{
    if(availableQuestion.length===0 || questionCounter>=maxQuestion)
    {
        window.location.assign("/end.html")
        localStorage.setItem('RecentScore',score)
        // read about this as well
    }
    else
    {
        questionCounter++;
quesCount.innerText=` Question: ${questionCounter}/${maxQuestion}`
pgb.style.width=`${(questionCounter/maxQuestion)*100}%`
console.log(pgb.style.width)
const questionIndex=Math.floor(Math.random()*availableQuestion.length)
currentQuestion=availableQuestion[questionIndex];

ques.innerText=currentQuestion.question;
choice.forEach((ch)=>{
    const num=ch.dataset['number'];
   // console.log(num)
    let co=currentQuestion['choice'+num];
    ch.innerText=co;
});
availableQuestion.splice(questionIndex,1)
acceptinngAnswer=true;
    }

}

choice.forEach((ch)=>{
    ch.addEventListener('click',e=>{
        if(!acceptinngAnswer) return;
        acceptinngAnswer=false;
        const selected=e.target
        const selectedans=e.target.dataset["number"];
        const classtoApply= selectedans==currentQuestion.answer?'correct':'incorrect';
        if(classtoApply==='correct')
        {
            UpdateScore();
        }
        console.log(selected.parentElement)
        selected.classList.add(classtoApply);
        setTimeout(()=>{
            selected.classList.remove(classtoApply);
            getNewQuestion();
        },1000)

        
    })
})
UpdateScore=()=>{
    score+=corrrectBonus;
     scores.innerText=score;
}

