import Gameboard from "../board/Gameboard";

export default class Player {
    constructor(boardSize, type = "real") {
        this.gameBoard = new Gameboard(boardSize);
        this.type = type;
    }
    attack(enemyBoard,row,col) {
        enemyBoard.receiveAttack(row,col);
    }

    randomAttack(enemyBoard) {
        const availableMoves = enemyBoard.getAvailableMoves();
        const moveIndex = Math.floor(Math.random() * availableMoves.length);
        const move = availableMoves[moveIndex];
        enemyBoard.receiveAttack(move.row,move.col);
    }
}