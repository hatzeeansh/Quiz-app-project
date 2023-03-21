console.log('welcome to end.js')

const savebutton= document.getElementById('savescore');
let mostRecentScore=localStorage.getItem('RecentScore');
const input= document.getElementById('username');
let scores=document.getElementById('finalscore')

const highscore= JSON.parse(localStorage.getItem('highScore'))|| []
console.log(highscore)

scores.innerText=mostRecentScore;
input.addEventListener('keyup',(e)=>{
    console.log(e.target.value)
    savebutton.disabled=!input.value
})
savebutton.addEventListener('click',(e)=>{
    e.preventDefault();
console.log('high score saved')
const score={
    score:mostRecentScore,
    username:input.value
}
console.log(score)
highscore.push(score);
console.log(highscore)
highscore.sort(function(a,b){return b.score-a.score})
highscore.splice(5)
localStorage.setItem('highScore',JSON.stringify(highscore));
window.location.assign("/index.html")
})