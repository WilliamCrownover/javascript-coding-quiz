// GLOBL VARIABLES
// --------------------------------------------------------------------------------
//Element Variables
var highscoresListEl = document.querySelector("#highscoresList");

var storedHighscoresJSON = localStorage.getItem("storedHighscores");
var storedHighscores;

if(storedHighscoresJSON) {
    storedHighscores = JSON.parse(storedHighscoresJSON);
} else {
    storedHighscores = [];
}

for(var i = 0; i < storedHighscores.length; i++) {
    var li = document.createElement("li");
    li.textContent = `${storedHighscores[i].initals} --- ${storedHighscores[i].answerScore} Correct in ${storedHighscores[i].timeScore} Seconds`;
    highscoresListEl.append(li);
}
