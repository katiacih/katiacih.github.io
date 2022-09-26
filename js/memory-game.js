document.addEventListener('DOMContentLoaded', () => {

  const cards = [
    { 
      id: 1,
      name: 'burguer', 
      src: '/img/memory-images/burger.png'
    },
    { 
      id: 2,
      name: 'chinese-food', 
      src: '/img/memory-images/chinese-food.png'
    },
    { 
      id: 3,
      name: 'chocolate-bar', 
      src: '/img/memory-images/chocolate-bar.png'
    },
    { 
      id: 4,
      name: 'cupcake', 
      src: '/img/memory-images/cupcake.png'
    },
    { 
      id: 5,
      name: 'drink', 
      src: '/img/memory-images/drink.png'
    },
    { 
      id: 6,
      name: 'french-fries', 
      src: '/img/memory-images/french-fries.png'
    },
    { 
      id: 7,
      name: 'hot-dog', 
      src: '/img/memory-images/hot-dog.png'
    },
    { 
      id: 8,
      name: 'japanese-food', 
      src: '/img/memory-images/japanese-food.png'
    },
    { 
      id: 9,
      name: 'kebab', 
      src: '/img/memory-images/kebab.png'
    },
    { 
      id: 10,
      name: 'spaghetti', 
      src: '/img/memory-images/spaghetti.png'
    },
    { 
      id: 11,
      name: 'pizza', 
      src: '/img/memory-images/pizza.png'
    },
    { 
      id: 12,
      name: 'popcorn', 
      src: '/img/memory-images/popcorn.png'
    },
    { 
      id: 13,
      name: 'burguer', 
      src: '/img/memory-images/burger.png'
    },
    { 
      id: 14,
      name: 'chinese-food', 
      src: '/img/memory-images/chinese-food.png'
    },
    { 
      id: 15,
      name: 'chocolate-bar', 
      src: '/img/memory-images/chocolate-bar.png'
    },
    { 
      id: 16,
      name: 'cupcake', 
      src: '/img/memory-images/cupcake.png'
    },
    { 
      id: 17,
      name: 'drink', 
      src: '/img/memory-images/drink.png'
    },
    { 
      id: 18,
      name: 'french-fries', 
      src: '/img/memory-images/french-fries.png'
    },
    { 
      id: 19,
      name: 'hot-dog', 
      src: '/img/memory-images/hot-dog.png'
    },
    { 
      id: 20,
      name: 'japanese-food', 
      src: '/img/memory-images/japanese-food.png'
    },
    { 
      id: 21,
      name: 'kebab', 
      src: '/img/memory-images/kebab.png'
    },
    { 
      id: 22,
      name: 'spaghetti', 
      src: '/img/memory-images/spaghetti.png'
    },
    { 
      id: 23,
      name: 'pizza', 
      src: '/img/memory-images/pizza.png'
    },
    { 
      id: 24,
      name: 'popcorn', 
      src: '/img/memory-images/popcorn.png'
    },
  ];

  cards.sort(() => Math.random() - 0.5 );

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
    if (cardsChosen.length === 2) {
      setTimeout(controllerGame, 500)
    }
  }

  function flipCardToBlank(node) {
    node.setAttribute('src', 'img/memory-images/back-card.png');
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