const shuffle = (b) => {
  a = b.slice()
  for (var i = a.length - 1; i > 0; i--){
    var rand_i = Math.floor(Math.random() * i);
    [a[i], a[rand_i]] = [a[rand_i], a[i]]
  }
  return a
}


const makeCard = () => {
  const cardContainer = document.createElement("div")
  cardContainer.className = 'card-holder'
  // document.body.appendChild(cardContainer)
  const card = document.createElement("div")
  card.className = 'card'
  cardContainer.appendChild(card)
  return { card, cardContainer }
}

const clickInit = (card) => {
  const innerValue = document.createElement("div")
  innerValue.className = 'card-value'
  innerValue.innerHTML = card.number
  card.innerValue = innerValue

  return () => {
    if (!card.revealed && canClick) {
      card.card.classList.add('thin')
      setTimeout(() => {
        card.card.classList.add('clicked')
        card.card.classList.remove('thin')
        card.card.appendChild(card.innerValue)
      }, 500)
      card.revealed = true
      revealedCards.push(card)
      if (revealedCards.length > 1) {
        moveCount ++
        if (revealedCards[0].number == revealedCards[1].number) {
          revealedCards[0].matched = true
          revealedCards[1].matched = true
          revealedCards = []
        } else {
          canClick = false
          setTimeout(() => {
            unrender(revealedCards)
            canClick = true
          }, 1500)
        }
      }
      if (isOver(cards)) {
        setTimeout(() => alert(`You win!\nIt took you a ${moveCount} tries`), 1000)
      }
    }
  }
}

const unrender = (cardsArr) => {
  cardsArr.forEach( (card) => {
    card.revealed = false
    card.card.classList.add('thin')
    setTimeout(() => {
      card.card.classList.remove('clicked')
      card.card.removeChild(card.innerValue)
      card.card.classList.remove('thin')
    }, 500)
    // setTimeout(() => {
    //   card.card.classList.remove('clicked')
    //   card.card.removeChild(card.innerValue)
    // }, 1000)
  })
  revealedCards = []
}

const isOver = (cardsArr) => {
  return cardsArr.every( (row) => {
    return row.every( (card) => card.matched)
  })
}

const cards = []
let revealedCards = []
let canClick = true
let moveCount = 0

for (let i = 0; i < 4; i++) {
  const row = []
  const parent = document.createElement("div")
  parent.className = 'row'
  for (let j = 0; j < 4; j++) {
    const { card, cardContainer } = makeCard()
    cardHolder = {card: card}
    row.push(cardHolder)
    parent.appendChild(cardContainer)
  }
  document.body.appendChild(parent)
  cards.push(row)
}

let cardPairs = shuffle([1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8])
cards.forEach((row) => {
  row.forEach((card) => {
    card.number = cardPairs.pop()
    card.revealed = false
    card.matched = false
    card.card.onclick = clickInit(card)
  })
})
