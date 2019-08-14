const URL = "https://bryfive-f992a.firebaseio.com/scores.json"


const API = {
  getAll() {
    return fetch(URL)
      .then(response => response.json())
      .then(parsedResults => {
        let allResults = []
        for (key in parsedResults) {
          allResults.push(parsedResults[key])
        }
        return allResults
      })

  },
  postScore(scoreObj) {
    return fetch(URL, {
      method: "POST",
      body: JSON.stringify(scoreObj)
    })
  }
}

