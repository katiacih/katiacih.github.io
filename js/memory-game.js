document.addEventListener('DOMContentLoaded', () => {

  const cardsOrigin = [
    { 
      name: 'burguer', 
      src: '/img/memory-images/burger.png',
      alt: 'hamburguer'
    },
    { 
      name: 'chinese-food', 
      src: '/img/memory-images/chinese-food.png',
      alt: 'comida chinesa'
    },
    { 
      name: 'chocolate-bar', 
      src: '/img/memory-images/chocolate-bar.png',
      alt: 'barra de chocolate'
    },
    { 
      name: 'cupcake', 
      src: '/img/memory-images/cupcake.png',
      alt: 'cupcake'
    },
    { 
      name: 'drink', 
      src: '/img/memory-images/drink.png',
      alt: 'bebida'
    },
    { 
      name: 'french-fries', 
      src: '/img/memory-images/french-fries.png',
      alt: 'batata frita'
    },
    { 
      name: 'hot-dog', 
      src: '/img/memory-images/hot-dog.png',
      alt: 'hot dog'
    },
    { 
      name: 'japanese-food', 
      src: '/img/memory-images/japanese-food.png',
      alt: 'comida japonesa'
    },
    { 
      name: 'kebab', 
      src: '/img/memory-images/kebab.png',
      alt: 'kebab'
    },
    { 
      name: 'spaghetti', 
      src: '/img/memory-images/spaghetti.png',
      alt: 'espaguete'
    },
    { 
      name: 'pizza', 
      src: '/img/memory-images/pizza.png',
      alt: 'pizza'
    },
    { 
      name: 'popcorn', 
      src: '/img/memory-images/popcorn.png',
      alt: 'pipoca'
    }
  ];

  const cardInverse = cardsOrigin.reverse();
  const cardConcat = cardsOrigin.concat(cardInverse);
  const cards = cardConcat.map((item, index) => ({ id: index, ...item})).sort(() => Math.random() - 0.5 );

  const game = document.querySelector('.game');
  const score = document.querySelector('.results');
  const displayText = document.querySelector('.text-game');
  const BtnGameReset = document.querySelector('button.btn-reset');
  BtnGameReset.addEventListener('click', reset)

  let cardsChosen = []
  let cardsChosenId = []
  let cardsWon = []

  function mountBoard() {
    for (let i = 0; i < cards.length; i++) {
      const object =  document.createElement('div');
      object.setAttribute('class', 'content-card');
      object.addEventListener('click', flipCard)
      object.setAttribute('data-id', i);
      const card = document.createElement('img');
      card.setAttribute('class', 'card');
      card.setAttribute('src', 'img/memory-images/back-card.png');
      card.setAttribute('alt', 'carta escondida');
      object.appendChild(card);
      cardDisabled = document.createElement('div');
      cardDisabled.setAttribute('class', 'card-disabled');
      object.appendChild(cardDisabled);
      game.appendChild(object);
    }
  }

  function flipCard() {
    let cardId = this.getAttribute('data-id');
    cardsChosen.push(cards[cardId].name);
    cardsChosenId.push(cardId);
    cardImg = this.childNodes[0];
    cardImg.setAttribute('src', cards[cardId].src);
    cardImg.setAttribute('alt', cards[cardId].alt);
    if (cardsChosen.length === 2) {
      setTimeout(controllerGame, 500)
    }
  }

  function flipCardToBlank(node) {
    node.setAttribute('src', 'img/memory-images/back-card.png');
    node.setAttribute('alt', 'carta escondida');
  }

  function SetDisplayBlock(node) {
    node.setAttribute('style', 'display: block');
  }



  function controllerGame() {
    const cards = document.querySelectorAll('.content-card');
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]
    
    if(optionOneId == optionTwoId) {
      //  mesma peça
    }
    else if (cardsChosen[0] === cardsChosen[1]) {
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosen);
      cardImgOne = cards[optionOneId].childNodes;
      cardImgTwo = cards[optionTwoId].childNodes;
      if(cardImgOne.length === 2 && cardImgTwo.length === 2) {
        setTimeout(() => {
          SetDisplayBlock(cardImgOne[1]);
          SetDisplayBlock(cardImgTwo[1]);
        }, 1000);
      }
      
    } else {
      cardImgOne = cards[optionOneId].childNodes;
      cardImgTwo = cards[optionTwoId].childNodes;
      if(cardImgOne.length === 2 &&  cardImgTwo.length === 2) {
        setTimeout(() => {
          flipCardToBlank(cardImgOne[0]);
          flipCardToBlank(cardImgTwo[0]);
        }, 1000);
      }
    }

    cardsChosen = []
    cardsChosenId = []
    score.textContent = cardsWon.length;

    if  (cardsWon.length === cards.length/2) {
      displayText.textContent = 'You win!'
      SetDisplayBlock(BtnGameReset);
    }
  
  }

  function reset() {
    displayText.textContent = 'Have fun!'
    BtnGameReset.setAttribute('styles', 'display: none');
    score.textContent = 0;
    cardsChosen = [];
    cardsChosenId = [];
    cardsWon = [];
    let listCards = document.querySelectorAll('.content-card');
    listCards.forEach(element => {
      game.removeChild(element);
    });
    cards.sort(() => Math.random() - 0.5 );
    mountBoard();
  }

  mountBoard();
});