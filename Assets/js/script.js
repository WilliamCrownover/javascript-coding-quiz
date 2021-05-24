// GLOBL VARIABLES
//Element Variables
var correctAnswersEL = document.querySelector("#correctAnswers");
var timerEl = document.querySelector("#timerValue");
var startScreenEl = document.querySelector("#startScreen");
var startQuizBtn = document.querySelector("#startQuizButton");
var questionScreenEl = document.querySelector("#questionScreen");
var correctEl = document.querySelector(".correct");
var wrongEl = document.querySelector(".wrong");
var finishedScreenEl = document.querySelector("#finishScreen");
var correctScoreSpan = document.querySelector("#answeredCorrectScore");
var timerScoreSpan = document.querySelector("#finalScoreTime");

correctAnswersEL.textContent = 0;
timerEl.textContent = 5;
correctScoreSpan.textContent = correctAnswersEL.textContent;
timerScoreSpan.textContent = timerEl.textContent;

function startTimer() {
    var timerInterval = setInterval(function() {
        timerEl.textContent -= 1;

        if(timerEl.textContent == 0) {
            clearInterval(timerInterval);
            endGame();
        }

    }, 1000);
}

function startGame() {
    startScreenEl.classList.add("hidden");
    questionScreenEl.classList.remove("hidden");
    startTimer();
}

startQuizBtn.addEventListener("click", function() {
    startGame();
} );