import GameController from './GameController';
import Player from '../player/Player';
import Ship from '../board/Ship.js';

export default class ScreenController {
  constructor() {
    this.root = document.querySelector('#app');
    const p1 = new Player(7, 'real', 'Razvan');
    const p2 = new Player(7, 'computer', 'Ai');
    this.game = new GameController(p1, p2);
  }

  inititializeGame() {
    this.root.innerHTML = `
        <h1>Battleship Game</h1>
        <div class="boards-container"></div>
    `;
    //test ships

    const ship1 = new Ship(3);
    const ship2 = new Ship(3);
    const ship3 = new Ship(3);
    const ship4 = new Ship(3);
    this.game.player1.gameBoard.placeShip(ship1, 0, 2, true);
    this.game.player2.gameBoard.placeShip(ship2, 2, 2, true);
    this.setupEventListeners();
    this.renderBoards();
  }

  renderBoards() {
    const player1 = this.game.player1;
    const player2 = this.game.player2;
    const boardContainer = document.querySelector('.boards-container');
    boardContainer.innerHTML = `
        <div class="player1">
            <div class="board"></div>
            <div>${player1.name}</div>
        </div>
        <div class="player2">
            <div class="board"></div>
            <div>${player2.name}</div>
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

  setupEventListeners() {
    const boardContainer = document.querySelector('.boards-container');
    boardContainer.addEventListener('click', (e) => {
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
        if (this.game.checkWinnerPlayer()) {
          this.renderWinner();
        }
      } catch (error) {
        console.error(error.message);
      }
    });
  }
  renderWinner() {
    const winnerDiv = document.createElement('div');
    winnerDiv.textContent =
      this.game.checkWinnerPlayer() + ' has won the game!';
    this.root.appendChild(winnerDiv);
  }
}
