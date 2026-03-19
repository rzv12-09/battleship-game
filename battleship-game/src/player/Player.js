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
        if(this.type !== "computer") {
            throw new Error("Random attack is available only to computer players")
        }
        const availableMoves = enemyBoard.getAvailableMoves();
        if(availableMoves.length === 0) {
            throw new Error("No moves left for random attack");
        }
        const moveIndex = Math.floor(Math.random() * availableMoves.length);
        const move = availableMoves[moveIndex];
        enemyBoard.receiveAttack(move.row,move.col);
    }
}