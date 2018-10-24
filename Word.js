var Letter = require("./Letter.js");

function Word(value) {
  this.value =value.split("").map(char => (new Letter(char)));

  this.toString = function() {
    var result = "";
    this.value.map(curr => result += curr + " ");
    return result;
  }

  this.guessLetter = function(check) {
    this.value.map(curr => curr.guess(check));
  }
}

module.exports = Word;