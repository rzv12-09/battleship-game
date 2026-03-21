export default class GameController {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.activePlayer = player1;
  }

  playRound(row, col) {
    const enemyPlayer =
      this.activePlayer === this.player1 ? this.player2 : this.player1;
    const enemyBoard = enemyPlayer.gameBoard;
    enemyBoard.receiveAttack(row, col);
    this.activePlayer = enemyPlayer;
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
