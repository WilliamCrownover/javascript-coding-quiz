// GLOBL VARIABLES
//Element Variables
var correctAnswersEL = document.querySelector("#correctAnswers");
var timerEl = document.querySelector("#timerValue");
var startScreenEl = document.querySelector("#startScreen");
var startQuizBtn = document.querySelector("#startQuizButton");
var questionScreenEl = document.querySelector("#questionScreen");
var questionCoutdownEl = document.querySelector("#questionCountDown");
var questionEl = document.querySelector("#theQuestion");
var correctEl = document.querySelector(".correct");
var wrongEl = document.querySelector(".wrong");
var finishedScreenEl = document.querySelector("#finishScreen");
var correctScoreSpan = document.querySelector("#answeredCorrectScore");
var timerScoreSpan = document.querySelector("#finalScoreTime");
var initalsFormEl = document.querySelector("#initalsForm");
var initalsEl = document.querySelector("#initials");

var index;
var correctAnswers = 0;
var timeLeft = 15*questions.length;

correctAnswersEL.textContent = correctAnswers;
timerEl.textContent = timeLeft;

// --------------------------------------------------------------------------------
// DECLARED FUNCTIONS
function endGame() {
    if(timeLeft < 0) {
        timeLeft = 0;
        timerEl.textContent = timeLeft;
    }

    questionScreenEl.classList.add("hidden");
    finishedScreenEl.classList.remove("hidden");
    
    correctScoreSpan.textContent = correctAnswers;
    timerScoreSpan.textContent = timeLeft;
}

function startTimer() {
    var timerInterval = setInterval(function() {
        timeLeft -= 1;
        timerEl.textContent = timeLeft;

        if(timeLeft <= 0 || index === questions.length) {
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
    questionCoutdownEl.textContent = questions.length - index;

    questions[index].choices = shuffleArray(questions[index].choices);

    for(var i = 0; i < questions[index].choices.length; i++) {
        questionScreenEl.children[2 + i].textContent = questions[index].choices[i];
        questionScreenEl.children[2 + i].value = questions[index].choices[i];
    }
}

function startGame() {
    startScreenEl.classList.add("hidden");
    questionScreenEl.classList.remove("hidden");
    
    index = 0;
    correctAnswers = 0;
    timeLeft = 15*questions.length;
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
    if(event.target.type === "submit") {
        var answer = event.target.value;
        if(answer === questions[index].correct) {
            correctAnswers++;
            correctAnswersEL.textContent = correctAnswers;
            correctEl.classList.remove("hidden");
            nextQuestion();
            
        } else {
            timeLeft -= 10;
            wrongEl.classList.remove("hidden");
            nextQuestion();
        }
    }
}

function saveScore(event) {
    event.preventDefault();

    var scoreData = {
        initals: initalsEl.value,
        answerScore: correctAnswers,
        timeScore: timeLeft
    };

    var storedHighscoresJSON = localStorage.getItem("storedHighscores");
    var storedHighscores;

    if(storedHighscoresJSON) {
        storedHighscores = JSON.parse(storedHighscoresJSON);
        storedHighscores.push(scoreData);
    } else {
        storedHighscores = [scoreData];
    }

    localStorage.setItem("storedHighscores", JSON.stringify(storedHighscores));

    window.location = "./Assets/html/highscores.html";
}

// --------------------------------------------------------------------------------
// EVENT LISTENERS
startQuizBtn.addEventListener("click", startGame );
questionScreenEl.addEventListener("click", checkAnswer);
initalsFormEl.addEventListener("submit", saveScore);