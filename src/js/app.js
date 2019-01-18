import style from '../styles/index.scss';
const Parallax = require('parallax-js');

var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene);

let durations = [];
const morse = ['short', 'short', 'short', 'long', 'long', 'long', 'short', 'short', 'short'];
let userInput = [];

$(window).keydown(function(e) {
  durations.push($.now());
}).keyup(function(e) {
  let current = durations;
  current.push($.now());
  durations = [];
  let timeElapsed = current[current.length - 1] - current[0];

  $('.instruction').addClass('hide-instruction');

  if (timeElapsed > 0 && timeElapsed <= 200) {
    console.log('SHORT');
    userInput.push('short');
    checkUserInput();
  } else if (timeElapsed >= 200 && timeElapsed <= 2000) {
    console.log('LONG');
    userInput.push('long');
    checkUserInput();
  } else {
    console.log('BAD');
    userInput = [];
  }

  function checkUserInput () {
    if (userInput.equals(morse)) {
      console.log('GOOD');
      userInput = [];
      $('.phrase_1').addClass('hide-phrase');
      setTimeout(function() {
        $('.phrase_2').addClass('show-phrase');
        $('.phrase_3').addClass('show-phrase-3');
      },1000);
    } else {
      console.log('NO EQUAL');
    }
  }

  console.log(morse);
  console.log(userInput);
});

if (Array.prototype.equals) {
  console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
}

Array.prototype.equals = function (array) {
  if (!array)
    return false;

  if (this.length !== array.length)
    return false;

  for (let i = 0, l=this.length; i < l; i++) {
    if (this[i] instanceof Array && array[i] instanceof Array) {
      if (!this[i].equals(array[i]))
        return false;
    }
    else if (this[i] !== array[i]) {
      return false;
    }
  }
  return true;
};

Object.defineProperty(Array.prototype, "equals", {enumerable: false});