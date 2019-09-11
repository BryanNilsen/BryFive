// take score object and convert to HTML
const scoreToHTML = (scoreObj) => {
  const dotCount = 24 - (scoreObj.score.toString().length + scoreObj.name.length)
  const dot = "."
  return `
    <div class="scoreboard">
      ${scoreObj.score} ${dot.repeat(dotCount)} ${scoreObj.name}
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