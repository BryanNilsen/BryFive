console.log("Bry Five is Live!")
// code modified from wes bos whack-a-mole Javascript 30

const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const hands = document.querySelectorAll('.hand');
const startButton = document.querySelector('#startButton')
const clap = new Audio('clap.wav');

let lastHole;
let timeUp = false;
let currentTime = 0;
let score = 0;

function randomTime(min, max) {
  // generate random length of time for high-five to display
  return Math.round(Math.random() * (max - min) + min)
}

function randomHole(holes) {
  // generate random location for high-five to display
  const idx = Math.floor(Math.random() * holes.length)
  const hole = holes[idx]
  if (hole === lastHole) {
    return randomHole(holes)
  }
  lastHole = hole
  return hole
}

function peep() {
  const time = randomTime(400, 2000);
  currentTime = time
  console.log('time: ', time);

  const hole = randomHole(holes)
  hole.classList.add('up')
  setTimeout(() => {
    hole.classList.remove('up')
    if (!timeUp) {
      peep()
    }
  }, time)

}

// TODO create random tshirt generator

function startGame() {
  // hide start button during gameplay
  startButton.classList.add('hidden')
  // reset score
  scoreBoard.textContent = 0;
  score = 0
  timeUp = false;
  peep();

  // game length
  setTimeout(() => {
    timeUp = true
    // show start button
    startButton.classList.remove('hidden')
    printScore(score)
  }, 15000)

}



function bonk(evt) {
  if (!evt.isTrusted) return // cheating !!
  clap.play();
  // calculate points based off of time >> shorter time hand is on screen awards higher points
  let calculatedPoints = (1 / currentTime) * 100000
  console.log('calculatedPoints: ', calculatedPoints, currentTime);

  score += Math.round(calculatedPoints)
  // 'this' is the hand > need to remove 'up' class from parentNode
  this.parentNode.classList.remove('up')
  scoreBoard.textContent = score

}

hands.forEach(hand => hand.addEventListener('click', bonk))

function printScore(score) {
  // TODO - submit name and score to database
  let plural = "s"
  if (score < 2) {
    plural = ""
  }
  console.log(`You scored ${score} point${plural}!`)
}