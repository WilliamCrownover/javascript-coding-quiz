// GLOBL VARIABLES
// --------------------------------------------------------------------------------
//Element Variables
var highscoresListEl = document.querySelector("#highscoresList");
var clearScoresBtn = document.querySelector("#clearHighscoresButton");

var storedHighscoresJSON = localStorage.getItem("storedHighscores");
var storedHighscores;

if(storedHighscoresJSON) {
    storedHighscores = JSON.parse(storedHighscoresJSON);
} else {
    storedHighscores = [];
}

for(var i = 0; i < storedHighscores.length; i++) {
    var li = document.createElement("li");
    li.textContent = `${i+1}. ${storedHighscores[i].initals} --- ${storedHighscores[i].answerScore} Correct in ${storedHighscores[i].timeScore} Seconds`;
    highscoresListEl.append(li);
}

clearScoresBtn.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
} );
