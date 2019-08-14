console.log("Bry Five is Live!")
// code modified from wes bos whack-a-mole Javascript 30

const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const hands = document.querySelectorAll('.hand');
const startButton = document.querySelector('#startButton')
const clap = new Audio('./src/clap.wav');

let lastHole;
let timeUp = false;
let currentTime = 0;
let score = 0;

// set bryan face image
const bryDiv = document.querySelector('.brycon')
bryDiv.innerHTML = `<img src="./src/bryan.svg" alt="bryan">`


// get scores and render to dom
const getScoresAndRenderDom = () => {
  topScores.innerHTML = ""
  API.getAll().then(results => {
    results.sort((a, b) => b.score - a.score)
      .forEach(result => {
        const scoreAsHTML = scoreToHTML(result)
        renderScoreToDom(scoreAsHTML)
      })
  }
  )
}
getScoresAndRenderDom()


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

function showHand() {
  const time = randomTime(400, 2000);
  currentTime = time
  console.log('time: ', time);

  const hole = randomHole(holes)
  hole.classList.add('up')
  setTimeout(() => {
    hole.classList.remove('up')
    if (!timeUp) {
      showHand()
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
  showHand();

  // game length
  setTimeout(() => {
    timeUp = true
    // show start button
    startButton.classList.remove('hidden')
    printScore(score)
    // change shirt
    randomTshirt()
  }, 15000)

}


// when user successfully High-Fives
function hiFive(evt) {
  // prevent cheating - won't count high five if user tries to fake click!!
  if (!evt.isTrusted) return

  // add clap sound
  clap.play();

  // calculate points based off of time >> shorter time hand is on screen awards higher points
  let calculatedPoints = (2 / (currentTime * currentTime)) * 100000000
  console.log(`${currentTime} : ${calculatedPoints}`);
  score += Math.round(calculatedPoints)
  scoreBoard.textContent = score

  // 'this' is the hand > need to remove 'up' class from parentNode
  this.parentNode.classList.remove('up')
}

// add event listener to all hands
// add event listener to all hands
hands.forEach(hand => hand.addEventListener('click', hiFive))
hands.forEach(hand => hand.addEventListener('touchstart', hiFive))

// when game completes, alert the user their score and let them add initials to leaderboard
function printScore(score) {
  const scoreInitials = prompt(`Great Job!\nYou scored ${score} points!\nenter your initials`, "")
  const newScore = {
    "name": scoreInitials,
    "score": score
  }
  // post score to DB, then get all scores and rerender to DOM
  if (scoreInitials) {
    API.postScore(newScore).then(() => getScoresAndRenderDom())
  }
}
