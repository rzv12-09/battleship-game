import GameController from './GameController';
import Player from '../player/Player';
export default class ScreenController {
  constructor() {
    this.root = document.querySelector('#app');
    const p1 = new Player(10, 'real', 'Razvan');
    const p2 = new Player(10, 'computer', 'Ai');
    this.game = new GameController(p1, p2);
  }

  inititializeGame() {
    this.root.innerHTML = `
        <h1>Battleship Game</h1>
        <div class="boards-container"></div>
    `;
    this.renderBoards();
  }

  renderBoards() {
    const player1 = this.game.player1;
    const player2 = this.game.player2;
    const boardLength = player1.gameBoard.board.length;
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

    this.renderSingleBoard(board1, player1.gameBoard);
    this.renderSingleBoard(board2, player2.gameBoard);
  }

  renderSingleBoard(boardDiv, gameBoard) {
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
      boardDiv.appendChild(cellDiv);
    });
  }
}
