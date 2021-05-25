// GLOBL VARIABLES
// --------------------------------------------------------------------------------
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

var index = 0;

correctAnswersEL.textContent = 0;
timerEl.textContent = 5;

// DECLARED FUNCTIONS
// --------------------------------------------------------------------------------
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

// Fisher-Yates shuffle
function shuffleArray(array) {
    for( var i = array.length - 1; i > 0; i-- ) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function loadQuestion() {
    questionEl.textContent = questions[index].question;

    questions[index].choices = shuffleArray(questions[index].choices);
    
    for(var i = 0; i < questions[index].choices.length; i++) {
        questionScreenEl.children[2 + i*2].textContent = questions[index].choices[i];
    }
}

function startGame() {
    startScreenEl.classList.add("hidden");
    questionScreenEl.classList.remove("hidden");
    
    questions = shuffleArray(questions);
    startTimer();
    loadQuestion();
}

// EVENT LISTENERS
// --------------------------------------------------------------------------------
startQuizBtn.addEventListener("click", startGame );
