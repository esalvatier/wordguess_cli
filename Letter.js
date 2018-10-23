function Letter(value) {
  this.dValue = value;
  this.value = value.toLowerCase();
  this.guessed = false;

  this.toString = function() {
    if (this.guessed) {
      return this.dValue;
    }
    return "_";
  }
  this.guess = function(check) {
    if (check === this.value) {
      this.guessed = true;
    }
  }
}

module.exports = Letter;