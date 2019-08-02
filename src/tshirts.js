// reference to band tshirt location on DOM
const tshirtDiv = document.querySelector('#tshirt')

// array of images
const tshirtsArray = ["hardwired.svg", "vanhalen.svg", "metallica.svg", "pj-wrigley.svg", "bboys.svg"]

let currentTshirt

const randomTshirt = () => {
  const idx = Math.floor(Math.random() * tshirtsArray.length)
  const tshirt = tshirtsArray[idx]
  if (tshirt === currentTshirt) {
    return randomTshirt()
  }
  currentTshirt = tshirt
  tshirtDiv.innerHTML = `<img src=${currentTshirt} alt="band tshirt">`

  // return tshirt
}

randomTshirt()
