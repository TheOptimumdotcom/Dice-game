'use strict';

// const playerdata1 =  prompt(`Player 1, please enter your name`)
// const playerdata2 =  prompt(`Player 2, please enter your name`)
// document.getElementById('name--0').textContent = playerdata1
// document.getElementById('name--1').textContent = playerdata2

let score0Element = document.getElementById('score--0');
let score1Element = document.getElementById('score--1');
let rollDiceButton = document.querySelector('.btn--roll');
let resetGameButton = document.querySelector('.btn--new');
let holdButton = document.querySelector('.btn--hold');
let diceElement = document.querySelector('.dice');
let currentScore00 = document.getElementById('current--0');
let currentScore01 = document.getElementById('current--1');
let playerPanel1 = document.querySelector('.player--0');
let playerPanel2 = document.querySelector('.player--1');
let mainElement = document.getElementById('main');
let proceedButton1 = document.querySelector('.btn--proceed1');
let proceedButton2 = document.querySelector('.btn--proceed2');
let playerdata1 = document.querySelector('.playerdata--1');
let playerdata2 = document.querySelector('.playerdata--2');
let player1name = getElementById('player1');
let player2name = getElementById('player2');

document.getElementById('player1').textContent = playerdata1;
document.getElementById('player2').textContent = playerdata2;

// mainElement.style.display = 'none';

let modal = document.querySelector('.modal');
let ruleButton = document.querySelector('.btn--rule');
let closeModal = document.querySelector('.close-modal');
let overlay = document.querySelector('.overlay');
let okButton = document.querySelector('.btn--okay');

// SOUNDS
let clickAudio = document.getElementById('sound');
let dieRoll = document.getElementById('rolldie');
let playerSwitchSound = document.getElementById('switchplayer');
let cheerSound = document.getElementById('cheer');

score0Element.textContent = 0;
score1Element.textContent = 0;

let scores, currentScore, activePlayer, playing;
// Initialization
const init = function () {
  clickAudio.play();
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  currentScore00.textContent = 0;
  currentScore01.textContent = 0;
  playerPanel1.classList.remove('player--winner');
  playerPanel2.classList.remove('player--winner');
  playerPanel1.classList.add('player--active');
  playerPanel2.classList.remove('player--active');
  diceElement.style.display = 'none';
  playing = true;
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  playerPanel1.classList.toggle('player--active');
  playerPanel2.classList.toggle('player--active');
};

const showModal = function () {
  modal.style.display = 'block';
  overlay.classList.remove('hidden');
  clickAudio.play();
};

const closedModal = function () {
  modal.style.display = 'none';
  overlay.classList.add('hidden');
  clickAudio.play();
};

// let currentScore1 = 0;
rollDiceButton.addEventListener('click', function () {
  dieRoll.play();
  if (playing) {
    let randomDiceNumber = Math.trunc(Math.random() * 6) + 1;
    diceElement.style.display = 'block';
    diceElement.src = `dice-${randomDiceNumber}.png`;
    if (randomDiceNumber !== 1) {
      currentScore += randomDiceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switching active player
      playerSwitchSound.play();
      switchPlayer();
    }
  }
});

holdButton.addEventListener('click', function () {
  clickAudio.play();
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      cheerSound.play();
      playing = false;
      diceElement.style.display = 'none';
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

ruleButton.addEventListener('click', showModal);
closeModal.addEventListener('click', closedModal);
okButton.addEventListener('click', closedModal);
window.addEventListener('click', function (event) {
  if (event.target == modal) showModal;
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('block')) {
    closedModal();
  } else e.preventDefault();
  // console.log(e.key)
});

proceedButton1.addEventListener('click', function () {
  playerdata2.classList.toggle('hide')
  playerdata1.classList.toggle('hide')
});
proceedButton2.addEventListener('click', function () {
 mainElement.classList.toggle('hide')
});

resetGameButton.addEventListener('click', init);
