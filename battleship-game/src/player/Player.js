import Gameboard from "../board/Gameboard";

export default class Player {
    constructor(boardSize, type = "real") {
        this.gameBoard = new Gameboard(boardSize);
        this.type = type;
    }
}