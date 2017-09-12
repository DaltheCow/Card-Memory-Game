const makeCard = () => {
  const div = document.createElement("div")
  div.style.backgroundColor = "blue"
  div.style.width = "100px"
  div.style.height = "100px"
  div.style.margin = "10px"
  document.body.appendChild(div)
  return div
}

const clickInit = (card) => {
  innerValue = document.createElement("div")
  innerValue.style.backgroundColor = "white"
  innerValue.style.width = "20px"
  innerValue.style.height = "20px"
  innerValue.style.margin = "auto"
  return () => {
    if (!card.revealed) {
      card.revealed = true
      card.card.appendChild(innerValue)
    } else {
      card.revealed = false
      card.card.remove(innerValue)
    }
  }
}

const cards = []
for (let i = 0; i < 4; i++) {
  const row = []
  for (let j = 0; j < 4; j++) {
    card = makeCard()
    card.style.float = "left"
    card.className = "card"
    cardHolder = {card: card}
    row.push(cardHolder)
  }
  const clear = document.createElement("div")
  clear.style.clear = "both"
  document.body.appendChild(clear)
  cards.push(row)
}

const cardPairs = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8]
cards.forEach((row) => {
  row.forEach((card) => {
    card.Value = cardPairs.splice(cardPairs.length - 1, 1)[0]
    card.revealed = false
    card.card.onclick = clickInit(card)
  })
})
