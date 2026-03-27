import Ship from '../board/Ship';
import Player from '../player/Player';

export default class GameController {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.activePlayer = player1;
  }

  playRound(row, col) {
    let enemyPlayer =
      this.activePlayer === this.player1 ? this.player2 : this.player1;
    let enemyBoard = enemyPlayer.gameBoard;

    enemyBoard.receiveAttack(row, col);

    if (this.checkWinnerPlayer()) {
      return;
    }

    this.activePlayer = enemyPlayer;
    if (this.activePlayer.type === 'computer') {
      const humanPlayer =
        this.activePlayer === this.player1 ? this.player2 : this.player1;
      const humanBoard = humanPlayer.gameBoard;

      this.activePlayer.randomAttack(humanBoard);

      if (this.checkWinnerPlayer()) {
        return;
      }

      this.activePlayer = humanPlayer;
    }
  }

  placeRandomShips(gameBoard, shipsCount) {
    const shipList = [];
    for (let i = 3; i < shipsCount + 3; i++) {
      shipList.push(new Ship(i));
    }
    while (shipList.length !== 0) {
      const row = Math.floor(Math.random() * gameBoard.board.length);
      const col = Math.floor(Math.random() * gameBoard.board.length);
      const isHorizontally = !!Math.floor(Math.random() * 2);
      try {
        gameBoard.placeShip(
          shipList[shipList.length - 1],
          row,
          col,
          isHorizontally
        );
      } catch (e) {
        continue;
      }
      shipList.pop();
    }
  }

  checkWinnerPlayer() {
    if (this.player1.gameBoard.areAllShipsSunk()) {
      return this.player2.name;
    }
    if (this.player2.gameBoard.areAllShipsSunk()) {
      return this.player1.name;
    }
    return null;
  }
}
