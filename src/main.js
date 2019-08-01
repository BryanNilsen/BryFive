console.log("Bry Five is Live!")
// code modified from wes bos whack-a-mole Javascript 30

const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const hands = document.querySelectorAll('.hand');
const startButton = document.querySelector('#startButton')
const clap = new Audio('clap.wav');

let lastHole;
let timeUp = false;
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
    console.log("REPEAT")
    return randomHole(holes)
  }
  lastHole = hole
  return hole
}

function peep() {
  const time = randomTime(400, 2000);
  const hole = randomHole(holes)
  console.log(time, hole);
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
  // clap.play();
  console.log('evt: ', evt);
  score++
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