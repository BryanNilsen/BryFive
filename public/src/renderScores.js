// take score object and convert to HTML
const scoreToHTML = (scoreObj) => {
  return `
  <div class="scoreboard">
  <p>${scoreObj.score} - ${scoreObj.name}</p>
  </div>
  `
}

// reference location on DOM to put scores
const topScores = document.querySelector('#top_scores')

// take HTML representation of score data and render to DOM
const renderScoreToDom = (scoreAsHTML) => {
  topScores.innerHTML += scoreAsHTML
}

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