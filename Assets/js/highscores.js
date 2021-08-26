// GLOBL VARIABLES
// Element Variables
var highscoresListEl = document.querySelector( '#highscoresList' );
var clearScoresBtn = document.querySelector( '#clearHighscoresButton' );

// Retrieve local data variable
var storedHighscores = JSON.parse( localStorage.getItem( 'storedHighscores' ) ) || [];

// Sort the objects by correct answers and time remaining values
storedHighscores.sort( function( a, b ) {
	var answerA = a.answerScore;
	var timeA = a.timeScore;
	var answerB = b.answerScore;
	var timeB = b.timeScore;

	return ( answerA < answerB ? 1 : ( answerA > answerB ? -1 : ( answerA === answerB ? ( timeA < timeB ? 1 : ( timeA > timeB ? -1 : 0 ) ) : null ) ) );
} );

// Load list to page
for( var i = 0; i < storedHighscores.length; i++ ) {
	var li = document.createElement( 'li' );
	li.textContent = `${i+1}. ${storedHighscores[i].initals} --- ${storedHighscores[i].answerScore} Correct --- ${storedHighscores[i].timeScore} Seconds remaining`;
	highscoresListEl.append( li );
}

// Event Listener clear scores
clearScoresBtn.addEventListener( 'click', function() {
	localStorage.clear();
	location.reload();
} );