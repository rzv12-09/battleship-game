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

  checkWinnerPlayer() {
    if (this.player1.gameBoard.areAllShipsSunk()) {
      return this.player2.name;
    }
    if (this.player2.gameBoard.areAllShipsSunk()) {
      return this.player1.name;
    }
  }
}
