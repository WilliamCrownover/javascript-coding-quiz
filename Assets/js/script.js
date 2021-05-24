// GLOBL VARIABLES
//Element Variables
var correctAnswersEL = document.querySelector("#correctAnswers");
var timerEl = document.querySelector("#timerValue");
var startScreenEl = document.querySelector("#startScreen");
var startQuizBtn = document.querySelector("#startQuizButton");
var questionScreenEl = document.querySelector("#questionScreen");
var questionEl = document.querySelector("#theQuestion");
var correctEl = document.querySelector(".correct");
var wrongEl = document.querySelector(".wrong");
var finishedScreenEl = document.querySelector("#finishScreen");
var correctScoreSpan = document.querySelector("#answeredCorrectScore");
var timerScoreSpan = document.querySelector("#finalScoreTime");

correctAnswersEL.textContent = 0;
timerEl.textContent = 5;

function endGame() {
    questionScreenEl.classList.add("hidden");
    finishedScreenEl.classList.remove("hidden");
    
    correctScoreSpan.textContent = correctAnswersEL.textContent;
    timerScoreSpan.textContent = timerEl.textContent;
}

function startTimer() {
    var timerInterval = setInterval(function() {
        timerEl.textContent -= 1;

        if(timerEl.textContent == 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function loadQuestion() {
    questionEl.textContent = questions[0].question;
    for(var i = 0; i < questions[0].choices.length; i++) {
        questionScreenEl.children[2 + i*2].textContent = questions[0].choices[i];
    }
}

function startGame() {
    startScreenEl.classList.add("hidden");
    questionScreenEl.classList.remove("hidden");
    
    startTimer();
    loadQuestion();
}

startQuizBtn.addEventListener("click", function() {
    startGame();
} );