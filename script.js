'use strict';

const gameInstructions = document.querySelector('.game-instructions');
const overlay = document.querySelector('.overlay');
const guess0El = document.getElementById('guess--0');
const guess1El = document.getElementById('guess--1');
const player0El = document.querySelector('.player--message--0');
const player1El = document.querySelector('.player--message--1');
const generatedNumber = document.querySelector('.generated-number');
const point0El = document.getElementById('point--0');
const point1El = document.getElementById('point--1');
const winner0El = document.getElementById('winner--0');
const winner1El = document.getElementById('winner--1');
const loser0El = document.getElementById('loser--0');
const loser1El = document.getElementById('loser--1');
const btnsNumbers = document.querySelectorAll('.num');
const btnStart = document.querySelector('.btn--start');
const btnCheck = document.querySelector('.btn--check');
const btnNewRound = document.querySelector('.btn--new-round');
const btnReset = document.querySelector('.btn--reset');

let number, activePlayer, playing, values, score;
let scores = [0, 0];

const init = function () {
  // initial values
  number = Math.trunc(Math.random() * 20) + 1;
  generatedNumber.textContent = '?';
  activePlayer = 0;
  playing = true;
  values = [0, 0];
  score = 0;
  btnCheck.removeAttribute('disabled');
  btnNewRound.removeAttribute('disabled');
  // visual conditions
  guess0El.textContent = '';
  guess1El.textContent = '';
  player0El.style.opacity = 1;
  player1El.style.opacity = 0;
  player0El.textContent = 'Your turn!';
  player0El.classList.add('active');
  winner0El.style.display = 'none';
  winner1El.style.display = 'none';
  loser0El.style.display = 'none';
  loser1El.style.display = 'none';
  point0El.textContent = scores[0];
  point1El.textContent = scores[1];
};
init();

btnStart.addEventListener('click', function () {
  overlay.classList.add('hidden');
  gameInstructions.classList.add('hidden');
});

const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  if (activePlayer === 0) {
    player0El.style.opacity = 1;
    player1El.style.opacity = 0;
  } else {
    player0El.style.opacity = 0;
    player1El.style.opacity = 1;
    player1El.textContent = 'Your turn!';
    player1El.classList.add('active');
  }
};

const checkPlaying = function () {
  if (guess0El.textContent === '' || guess1El.textContent === '') {
    playing = true;
    btnCheck.setAttribute('disabled', 'disabled');
  } else {
    playing = false;
    player0El.style.opacity = 0;
    btnCheck.style.boxShadow = '0 0 30px 5px #6f73a4';
    btnCheck.removeAttribute('disabled');
  }
};
checkPlaying();

const btnsDisable = function () {
  btnCheck.setAttribute('disabled', 'disabled');
  btnNewRound.setAttribute('disabled', 'disabled');
};

for (let i = 0; i < btnsNumbers.length; i++) {
  btnsNumbers[i].addEventListener('click', function () {
    if (playing) {
      let value = Number(
        (document.getElementById(`guess--${activePlayer}`).textContent =
          btnsNumbers[i].textContent)
      );
      values[activePlayer] = value;
      console.log(values);
      switchPlayer();
      checkPlaying();
    }
  });
}

btnCheck.addEventListener('click', function () {
  // disable button 'check'
  btnCheck.setAttribute('disabled', 'disabled');
  // reveal generated number
  generatedNumber.textContent = number;
  // remove box shadow, move it to button 'new round'
  btnCheck.style.boxShadow = 'none';
  btnNewRound.style.boxShadow = '0 0 30px 5px #6f73a4';
  // A is closer to the generated number
  if (Math.abs(values[0] - number) < Math.abs(values[1] - number)) {
    player0El.style.opacity = 1;
    player1El.style.opacity = 0;
    player0El.textContent = '+1pt';
    player0El.classList.remove('active');
    // point for A
    score += 1;
    scores[0] += score;
    point0El.textContent = scores[0];
    // B is closer to the generated number
  } else if (Math.abs(values[0] - number) > Math.abs(values[1] - number)) {
    player0El.style.opacity = 0;
    player1El.style.opacity = 1;
    player1El.textContent = '+1pt';
    player1El.classList.remove('active');
    // point for B
    score += 1;
    scores[1] += score;
    point1El.textContent = scores[1];
    // same difference
  } else if (Math.abs(values[0] - number) === Math.abs(values[1] - number)) {
    generatedNumber.textContent = number;
    // chose the same numbers
  }
  // check for winner (one of the players has accumulated 5 points)
  if (scores[0] === 5) {
    winner0El.style.display = 'block';
    player0El.style.opacity = 0;
    loser1El.style.display = 'block';
    btnNewRound.style.boxShadow = 'none';
    btnsDisable();
  } else if (scores[1] === 5) {
    winner1El.style.display = 'block';
    player1El.style.opacity = 0;
    loser0El.style.display = 'block';
    btnNewRound.style.boxShadow = 'none';
    btnsDisable();
  }
});

btnNewRound.addEventListener('click', function () {
  init();
  checkPlaying();
  btnNewRound.style.boxShadow = 'none';
});

btnReset.addEventListener('click', function () {
  scores = [0, 0];
  init();
  checkPlaying();
});
