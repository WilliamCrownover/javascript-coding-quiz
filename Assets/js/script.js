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

var index;
var correctAnswers = 0;
var timeLeft = 100;

correctAnswersEL.textContent = correctAnswers;
timerEl.textContent = timeLeft;

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
        timeLeft -= 1;
        timerEl.textContent = timeLeft;

        if(timerEl.textContent == 0 || index === questions.length) {
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
        questionScreenEl.children[2 + i*2].value = questions[index].choices[i];
    }
}

function startGame() {
    startScreenEl.classList.add("hidden");
    questionScreenEl.classList.remove("hidden");
    
    index = 0;
    questions = shuffleArray(questions);
    
    startTimer();
    loadQuestion();
}

function hideCorrectWrong() {
    setTimeout(function() {
        correctEl.classList.add("hidden");
        wrongEl.classList.add("hidden");
    }, 1000);
}

function nextQuestion() {
    index++;
    if(index === questions.length) {
        endGame();
        return
    }

    hideCorrectWrong();
    loadQuestion();
}

function checkAnswer(event) {
    var choice = event.target.value;
    if(choice === questions[index].correct) {
        correctAnswers++;
        correctAnswersEL.textContent = correctAnswers;
        correctEl.classList.remove("hidden");
        nextQuestion();
        
    } else {
        timeLeft -= 10;
        timerEl.textContent = timeLeft;
        wrongEl.classList.remove("hidden");
        nextQuestion();
    }
}

// EVENT LISTENERS
// --------------------------------------------------------------------------------
startQuizBtn.addEventListener("click", startGame );
questionScreenEl.addEventListener("click", checkAnswer);