var selectableWords =    
    [
        "APPLE",
        "MANGO",
        "ORANGE",
        "PEACH",
        "KIWI",
        "GRAPES",
    ];

const maxTries = 10;            
var guessedLetters = [];        
var currentWordIndex;           
var guessingWord = [];          
var remainingGuesses = 0;       
var hasFinished = false;            
var wins = 0;                   

function resetGame() {
    remainingGuesses = maxTries;
    currentWordIndex = Math.floor(Math.random() * (selectableWords.length));
    guessedLetters = [];
    guessingWord = [];

    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }   

    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("you-win").style.cssText = "display: none";
    document.getElementById("you-lose").style.cssText = "display: none";
    updateDisplay();
};

function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;

    var guessingWordText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        guessingWordText += guessingWord[i];
    }

    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
};

function evaluateGuess(letter) {
    
    var positions = [];

    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        if(selectableWords[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    if (positions.length <= 0) {
        remainingGuesses--;
    } else {
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};

function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("you-win").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins++;
        hasFinished = true;
    }
};

function checkLoss()
{
    if(remainingGuesses <= 0) {
        document.getElementById("you-lose").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        hasFinished = true;
    }
}

function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    
};

document.onkeydown = function(event) {
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toUpperCase());
            updateDisplay();
            checkWin();
            checkLoss();
        }
    }
};