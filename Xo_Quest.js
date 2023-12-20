const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resultDisplay = document.getElementById('result');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'X';
let isGameOver = false;
let boardState = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function checkWinner() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      return boardState[a];
    }
  }
  return null;
}

function checkDraw() {
  return !boardState.includes('');
}

function handleClick(event) {
  const cellIndex = event.target.id;
  if (boardState[cellIndex] === '' && !isGameOver) {
    boardState[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
      isGameOver = true;
      resultDisplay.textContent = `Player ${winner} wins!`;
    } else if (checkDraw()) {
      isGameOver = true;
      resultDisplay.textContent = 'It\'s a draw!';
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      if (currentPlayer === 'O') {
        computerTurn();
      }
    }
  }
}

function computerTurn() {
  const availableCells = boardState.reduce((acc, cell, index) => {
    if (cell === '') {
      acc.push(index);
    }
    return acc;
  }, []);

  const randomIndex = Math.floor(Math.random() * availableCells.length);
  const cellIndex = availableCells[randomIndex];
  
  setTimeout(() => {
    boardState[cellIndex] = currentPlayer;
    cells[cellIndex].textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
      isGameOver = true;
      resultDisplay.textContent = `Player ${winner} wins!`;
    } else if (checkDraw()) {
      isGameOver = true;
      resultDisplay.textContent = 'It\'s a draw!';
    } else {
      currentPlayer = 'X';
    }
  }, 500);
}

function resetGame() {
  boardState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  isGameOver = false;
  resultDisplay.textContent = '';
  cells.forEach(cell => {
    cell.textContent = '';
  });
}

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

resetBtn.addEventListener('click', resetGame);
