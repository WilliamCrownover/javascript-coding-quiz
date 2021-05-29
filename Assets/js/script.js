// GLOBAL VARIABLES
// Element Variables
var correctAnswersEL = document.querySelector("#correctAnswers");
var timerEl = document.querySelector("#timerValue");
var startScreenEl = document.querySelector("#startScreen");
var startQuizBtn = document.querySelector("#startQuizButton");
var questionScreenEl = document.querySelector("#questionScreen");
var questionCoutdownEl = document.querySelector("#questionCountDown");
var questionEl = document.querySelector("#theQuestion");
var buttonContainerEl = document.querySelector("#buttonContainer");
console.log("~ buttonContainerEl", buttonContainerEl);
var correctEl = document.querySelector(".correct");
var wrongEl = document.querySelector(".wrong");
var finishedScreenEl = document.querySelector("#finishScreen");
var correctScoreSpan = document.querySelector("#answeredCorrectScore");
var timerScoreSpan = document.querySelector("#finalScoreTime");
var initalsFormEl = document.querySelector("#initalsForm");
var initalsEl = document.querySelector("#initials");

// Tracking Variables
var index;
var correctAnswers;
var timeLeft;
var timerInterval;
var correctWrongTimeout;

// --------------------------------------------------------------------------------
// DECLARED FUNCTIONS
// Updates the timer value to immediate value
function updateTimerValue() {
    timerEl.textContent = timeLeft;
}

// Stops the timer and switches content to finished screen with score
function endGame() {
    clearInterval(timerInterval);
    updateTimerValue();

    if(timeLeft < 0) {
        timeLeft = 0;
        updateTimerValue();
    }

    questionScreenEl.classList.add("hidden");
    finishedScreenEl.classList.remove("hidden");
    
    correctScoreSpan.textContent = correctAnswers;
    timerScoreSpan.textContent = timeLeft;
}

// Starts the timer countdown interval and tracks game end conditions
function startTimer() {
    timerInterval = setInterval(function() {
        timeLeft -= 1;

        updateTimerValue();

        if(timeLeft <= 0 || index === questions.length) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// Fisher-Yates shuffle: shuffles the question order and answer order
function shuffleArray(array) {
    for( var i = array.length - 1; i > 0; i-- ) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// Loads a question object's properties to the question section of html generating buttons for each answer
function loadQuestion() {
    buttonContainerEl.innerHTML = "";
    questionEl.textContent = questions[index].question;
    questionCoutdownEl.textContent = questions.length - index;
    questions[index].choices = shuffleArray(questions[index].choices);

    for(var i = 0; i < questions[index].choices.length; i++) {
        var button = document.createElement("button");
        button.setAttribute("data-answer", questions[index].choices[i]);
        button.textContent = `${i+1} ${questions[index].choices[i]}`;
        buttonContainerEl.append(button);
    }
}

// Activated on button click, switches to question content and initializes variable values
function startGame() {
    startScreenEl.classList.add("hidden");
    questionScreenEl.classList.remove("hidden");
    
    index = 0;
    correctAnswers = 0;
    timeLeft = 10*questions.length;
    questions = shuffleArray(questions);
    
    startTimer();
    loadQuestion();
}

// Hides the "correct" or "wrong" elements
function hideCorrectWrong() {
    correctEl.classList.add("hidden");
    wrongEl.classList.add("hidden");
}

// Keeps track of how long the "correct" or "wrong" elements have been displayed
function correctWrongTimer() {
    correctWrongTimeout = setTimeout(hideCorrectWrong, 1000);
}

// Updates index to load next question or end the game once all questions have been answered
function nextQuestion() {
    index++;

    if(index === questions.length) {
        correctWrongTimer();
        endGame();
        return
    }

    correctWrongTimer();
    loadQuestion();
}

// Evaluates if the answer button value was correct or wrong and updates counters in response
function checkAnswer(event) {
    if(event.target.type === "submit") {
        var answer = event.target.getAttribute("data-answer");

        clearTimeout(correctWrongTimeout);
        hideCorrectWrong()

        if(answer === questions[index].correct) {
            correctAnswers++;
            correctAnswersEL.textContent = correctAnswers;
            correctEl.classList.remove("hidden");
            nextQuestion();
        } else {
            timeLeft -= 10;
            updateTimerValue();
            wrongEl.classList.remove("hidden");
            nextQuestion();
        }
    }
}

// Saves the players score from a form and stores the data as a JSON object array locally
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