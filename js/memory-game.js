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

  const spinner = document.querySelector('.content-spinner');
  const game = document.querySelector('.game');
  const score = document.querySelector('.results');
  const displayText = document.querySelector('.text-game');
  const BtnGameReset = document.querySelector('button.btn-reset');
  BtnGameReset.addEventListener('click', reset)

  let cardsChosen = []
  let cardsChosenId = []
  let cardsWon = []


  function createCardFrontObject(i) {
    const object =  document.createElement('div');
    object.setAttribute('class', 'card-front');
    object.setAttribute('data-id', i);
    const card = document.createElement('img');
    card.setAttribute('src', cards[i].src);
    card.setAttribute('alt', cards[i].alt);
    object.appendChild(card);
    return object;
  }

  function createCardBackObject() {
    const object = document.createElement('div');
    object.setAttribute('class', 'card-back');
    const card = document.createElement('img');
    card.setAttribute('src', 'img/memory-images/back-card.png');
    card.setAttribute('alt', 'carta escondida');
    object.appendChild(card);
    return object;
  }

  function mountBoard() {
    for (let i = 0; i < cards.length; i++) {
      const object =  document.createElement('div');
      object.setAttribute('class', 'card');
      object.setAttribute('data-id', i);
      object.addEventListener('click', flipCard);
      const inner = document.createElement('div');
      inner.setAttribute('class', 'card-inner');
      const front = createCardFrontObject(i);
      const back = createCardBackObject();
      inner.append(front);
      inner.append(back);
      object.append(inner);
      game.appendChild(object);
    }

    spinner.setAttribute('style', 'display: none');
    game.setAttribute('style', 'display: flex');
  }

  function flipCard() {
    // se ja foram escolhidos 2 não pode desvirar
    if (cardsChosen.length < 2) {
      let cardId = this.getAttribute('data-id');
      cardsChosen.push(cards[cardId].name);
      cardsChosenId.push(cardId);
      cardBack = this.childNodes[0].childNodes[1]
      cardBack.setAttribute('style', 'transform: rotateY(180deg)')
    }
    if (cardsChosen.length === 2) {
      setTimeout(controllerGame, 500)
    } 
  }

  function flipCardToBlank(node) {
    node.lastChild.setAttribute('style', 'transform: none')
  }

  function SetDisplayBlock(node) {
    node.setAttribute('style', 'display: block');
  }

  function controllerGame() {
    const cards = document.querySelectorAll('.card');
    const cardChosenOneId = cardsChosenId[0]
    const cardChosenTwoId = cardsChosenId[1]
    
    if(cardChosenOneId == cardChosenTwoId) {
      //  mesma peça
    }
    else if (cardsChosen[0] === cardsChosen[1]) { // cards iguais
      cards[cardChosenOneId].removeEventListener('click', flipCard)
      cards[cardChosenTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosen);
      
      cardOne = cards[cardChosenOneId].childNodes[0].childNodes[0];
      cardTwo = cards[cardChosenTwoId].childNodes[0].childNodes[0];
      cardOne.setAttribute('style', 'opacity: 0.6');
      cardTwo.setAttribute('style', 'opacity: 0.6');
      
    } else { // cards diferentes
      // card[id] > card-inner > card-front > img
      cardImgOne = cards[cardChosenOneId].childNodes[0].childNodes[0].getElementsByTagName('img')[0];
      cardImgTwo = cards[cardChosenTwoId].childNodes[0].childNodes[0].getElementsByTagName('img')[0];
      
      setTimeout(() => {
        flipCardToBlank(cards[cardChosenOneId].childNodes[0]);
        flipCardToBlank(cards[cardChosenTwoId].childNodes[0]);
      }, 1000); 
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
    let listCards = document.querySelectorAll('.card');
    listCards.forEach(element => {
      game.removeChild(element);
    });
    game.setAttribute('styles', 'display: none');
    spinner.setAttribute('styles', 'display: flex');
    cards.sort(() => Math.random() - 0.5 );
    mountBoard();
  }

  mountBoard();
});