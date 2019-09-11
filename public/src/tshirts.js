// reference to band tshirt location on DOM
const tshirtDiv = document.querySelector('#tshirt')

// array of images
const tshirtsArray = ["hardwired.svg", "vanhalen.svg", "pj-wrigley.svg", "bboys.svg", "rootdown.svg", "tommorello.svg", "gimmebadnews.svg", "tenaciousd.svg", "evh-jump.svg", "killingmachine.svg", "kiss.svg", "ironmaiden.svg"]


const randomTshirt = () => {
  let currentTshirt = sessionStorage.getItem("currentTshirt")
  const idx = Math.floor(Math.random() * tshirtsArray.length)
  const tshirt = tshirtsArray[idx]
  if (tshirt === currentTshirt) {
    return randomTshirt()
  }
  sessionStorage.setItem("currentTshirt", tshirt)
  currentTshirt = `./src/images/${tshirt}`
  tshirtDiv.innerHTML = `<img src=${currentTshirt} alt="band tshirt">`

  // return tshirt
}

randomTshirt()