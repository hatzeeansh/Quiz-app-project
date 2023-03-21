console.log('we are in highscore page')

let highscores=JSON.parse(localStorage.getItem('highScore') )||[];

let listitem= document.getElementById('list');

listitem.innerHTML= highscores.map((score)=>{
    return `<li class="high-score">${score.username}  -  ${score.score}</li>`
}).join("")