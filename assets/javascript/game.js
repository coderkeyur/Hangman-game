//list of words
var words=["apple","bananna","orange","mango","peach","watermelon","kiwi"];

const maxTries = 10;
var guessedLetters= [];
var currentWordIndex;
var guessingWord=[];
var remainingGuess= 0;
var gameStarted = false;
var hasFinished = false;
var wins = 0;

//to reset game variables

function reset() {
    remainingGuess = maxTries;
    gameStarted = false;

    currentWordIndex = Math.floor(Math.random()*(selectedWords.length));

    guessedLetters = []
    guessingWord = []

    for (var i = 0; i < selectedWords[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }

    document.getElementById ("pressKeyTryAgain").style.cssText="display: none";
    document.getElementById ("YouLose").style.cssText = " display: none";
    document.getElementById ("youWin").style.cssText = " display: none";

    updateDisplay();
};

function updateDisplay(){
    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord [i]; 
    }
    document.getElementById("remainingGuess").innerText = remainingGuess;
    document.getElementById("guessedLetters").innerText = guessedLetters;

    if(remainingGuess <= 0) {
        document.getElementById("youLose").style.cssText="display:block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display.block";
        hasFinished = true;
    }
};

document.onkeydown = function(event) {
    if(hasFinished) {
        reset();
        hasFinished = false;
    }
    else{
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
}

function makeGuess(letter){
    if(remainingGuess>0){
        if (!gameStarted) {
            gameStarted = true;
        }

        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }

    updateDisplay();
    checkWin();
};

function evaluateGuess(letter) {
    var positions = [];

    for (var i=0; i < selectedWords[currentWordIndex].length; i++) {
        if(selectedWord[currentWordIndex][i]===letter){
            positions.push(i);
        }
    }

    if(positions.length<=0) {
        remainingGuess--;
    } else {
        for(var i=0; i<positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};

function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("youWin").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText="dis[lay:block";
        wins++;
        hasFinished = true;
    }
}

