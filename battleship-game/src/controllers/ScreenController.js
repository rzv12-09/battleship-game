import GameController from './GameController';
import Player from '../player/Player';
import Ship from '../board/Ship.js';

export default class ScreenController {
  constructor() {
    this.root = document.querySelector('#app');
    this.p1 = new Player(7, 'real', 'Razvan');
    this.p2 = new Player(7, 'computer', 'Ai');
    this.game = new GameController(this.p1, this.p2);
    this.isGameDisabled = false;
  }

  inititializeGame() {
    this.root.innerHTML = `
        <h1>BATTLESHIP</h1>
        <div class="status-message">Fire when ready, Admiral!</div>
        <div class="boards-container"></div>
        <button class="reset-btn">Reset Game</button>
        <div class="winner-message"></div>
    `;

    this.placeShips();
    this.setupEventListeners();
    this.renderBoards();
  }

  placeShips() {
    const ship1 = new Ship(3);
    const ship2 = new Ship(3);
    this.game.player1.gameBoard.placeShip(ship1, 0, 2, true);
    this.game.player2.gameBoard.placeShip(ship2, 2, 2, true);
  }

  renderBoards() {
    const player1 = this.game.player1;
    const player2 = this.game.player2;
    const boardContainer = document.querySelector('.boards-container');
    boardContainer.innerHTML = `
        <div class="player-area player1">
            <div class="player-name">${player1.name}</div>
            <div class="board"></div>
        </div>
        <div class="player-area player2">
            <div class="player-name">${player2.name}</div>
            <div class="board"></div>
        </div>
    `;

    const board1 = document.querySelector('.player1 .board');
    const board2 = document.querySelector('.player2 .board');

    this.renderSingleBoard(board1, player1.gameBoard, false);
    this.renderSingleBoard(board2, player2.gameBoard, true);
  }

  renderSingleBoard(boardDiv, gameBoard, isEnemyBoard) {
    const board = gameBoard.board;
    const boardLength = board.length;
    const gridStyle = `repeat(${boardLength}, 1fr)`;

    boardDiv.style.gridTemplateRows = gridStyle;
    boardDiv.style.gridTemplateColumns = gridStyle;

    gameBoard.board.flat().forEach((cell) => {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('cell');
      cellDiv.dataset.row = cell.row;
      cellDiv.dataset.column = cell.col;

      if (cell.wasAttacked) {
        cellDiv.classList.add('attacked');
        if (cell.ship) {
          cellDiv.classList.add('hit');
        } else {
          cellDiv.classList.add('miss');
        }
      } else if (!isEnemyBoard && cell.ship) {
        cellDiv.classList.add('ship');
      }

      boardDiv.appendChild(cellDiv);
    });
  }

  resetGame() {
    const boardSize = this.game.player1.gameBoard.board.length;
    this.p1 = new Player(boardSize, this.p1.type, this.p1.name);
    this.p2 = new Player(boardSize, this.p2.type, this.p2.name);
    this.game = new GameController(this.p1, this.p2);
    this.isGameDisabled = false;

    const statusMessage = document.querySelector('.status-message');
    statusMessage.textContent = 'Fire when ready, Admiral!';
    const winnerMessage = document.querySelector('.winner-message');
    winnerMessage.textContent = '';

    this.placeShips();
    this.renderBoards();
  }

  setupEventListeners() {
    const resetBtn = document.querySelector('.reset-btn');
    resetBtn.addEventListener('click', () => {
      this.resetGame();
    });

    const boardContainer = document.querySelector('.boards-container');
    boardContainer.addEventListener('click', (e) => {
      if (this.isGameDisabled) {
        return;
      }
      const clickedElement = e.target;
      if (!clickedElement.classList.contains('cell')) {
        return;
      }
      if (!clickedElement.closest('.player2')) {
        return;
      }

      const row = Number(clickedElement.dataset.row);
      const col = Number(clickedElement.dataset.column);

      try {
        this.game.playRound(row, col);
        this.renderBoards();
        const winner = this.game.checkWinnerPlayer();
        if (winner) {
          this.renderWinner(winner);
          this.isGameDisabled = true;
        }
      } catch (error) {
        console.error(error.message);
      }
    });
  }

  renderWinner(winner) {
    const statusMessage = document.querySelector('.status-message');
    statusMessage.textContent = 'Mission Accomplished!';
    const winnerMessage = document.querySelector('.winner-message');
    winnerMessage.textContent = winner + ' has won the game!';
  }
}
