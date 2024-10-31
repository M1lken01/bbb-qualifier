type Card = {
  id: number;
  symbol: string;
  isMatched: boolean;
};

const symbols = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍑', '🍉', '🍍'];
let cards: Card[] = [];
let firstCard: Card | null = null;
let secondCard: Card | null = null;
const gameBoard = document.getElementById('game-board') as HTMLElement;

function initializeGame() {
  const shuffledSymbols = [...symbols, ...symbols].sort(() => Math.random() - 0.5).map((symbol, index) => ({ id: index, symbol, isMatched: false }));
  cards = shuffledSymbols;
  renderBoard();
}

function renderBoard() {
  gameBoard.innerHTML = '';
  cards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.style.backgroundColor = card.isMatched || card === firstCard || card === secondCard ? 'lightgreen' : 'lightgray';
    cardElement.innerText = card.isMatched || card === firstCard || card === secondCard ? card.symbol : '';
    cardElement.onclick = () => flipCard(index);
    gameBoard.appendChild(cardElement);
  });
}

function flipCard(index: number) {
  if (firstCard && secondCard) return; // Prevent flipping more than two cards
  const card = cards[index];
  if (card.isMatched || card === firstCard) return;

  if (!firstCard) {
    firstCard = card;
  } else if (!secondCard) {
    secondCard = card;
    checkMatch();
  }
  renderBoard();
}

function checkMatch() {
  if (firstCard && secondCard) {
    if (firstCard.symbol === secondCard.symbol) {
      firstCard.isMatched = true;
      secondCard.isMatched = true;
      resetTurn();
    } else {
      setTimeout(() => {
        resetTurn();
        renderBoard();
      }, 1000);
    }
  }
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
}

initializeGame();
