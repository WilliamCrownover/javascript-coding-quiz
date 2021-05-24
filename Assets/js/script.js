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
timerEl.textContent = 100;
correctScoreSpan.textContent = correctAnswersEL.textContent;
timerScoreSpan.textContent = timerEl.textContent;

