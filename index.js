var Word = require("./Word");
var inquirer = require("inquirer");

var subjectList = ["Goodfellas", "The Talented Mr Ripley", "The Game", "Jackie Brown", "Boogie Nights", "The Big Lebowski", "The Shawshank Redemption", "Forrest Gump", "American Beauty", "Being John Malkovich", "Glengarry Glen Ross", "Magnolia", "Pretty Woman", "Interview with the Vampire", "Titanic", "True Lies"];
var current = [];
var playedWords = [];
var guesses = 10;
var guessed = []
var successes = 0;
var gameStarted = false;

function playGame() {
  if (subjectList.length !== 0) {
    current = gameDoneCheck(current, subjectList);
    inquirer.prompt([{
      type: "input",
      message: "Guess a letter!",
      name: "guess",
      validate: function (input) {
        return (/^[a-z]{1}/.test(input.toLowerCase()) && !guessed.includes(input.toLowerCase()) && input.length === 1)
      }
    }]).then(function (userInput) {
      var char = userInput.guess.toLowerCase()
      guessed.push(char);
      current.forEach(check => {
        check.guessLetter(char);
      });
      var display = current.join("  ");
      if (display.toLowerCase().includes(char)) {
        console.log("Correct!");
      } else {
        guesses--;
        console.log("Incorrect!");
      }
      console.log("You have " + guesses + " guesses left.");
      console.log(display + "\n");
      playGame();
    })
  } else {
    console.log("You have reached the end of the game! You have correctly guessed " +  successes + " of the movies from the 90's in this list!");
  }
}

function gameDoneCheck(words, available) {
  if (!gameStarted) {
    console.log("Welcome! This is a word guessing game where you guess the titles of 90's movies!");
    gameStarted = true;
    return getNew(available);
  } else if (!words.join("").includes('_')) {
    console.log("Congratulations, you got it correct!");
    successes++;
    return getNew(available);
  } else if (guesses === 0) {
    console.log("I'm sorry you failed to correctly guess all the letters.");
    return getNew(available);
  }
  return words;
}

function getNew(arr) {
  guesses = 10;
  guessed = [];
  var index = Math.floor(Math.random() * arr.length);
  var temp = [];
  arr[index].split(" ").forEach(element => {
    temp.push(new Word(element));
  });
  playedWords.push(arr[index]);
  arr.splice(index, 1);
  return temp;
}

playGame();