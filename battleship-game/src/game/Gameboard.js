import Cell from "./Cell";

export default class Gameboard {
    constructor(boardSideLength) {
        this.board = [];
        for (let row = 0 ; row < boardSideLength ; row++) {
            const boardRow = [];
            for (let col = 0 ; col < boardSideLength ; col++) {
                boardRow.push(new Cell(row,col))
            }
            this.board.push(boardRow);
        }
    }

    placeShip(ship,startRow,startCol,isHorizontally){
        this.checkValidPlacement(ship,startRow,startCol,isHorizontally);
        for(let i = 0 ; i < ship.length ; i++) {
            const row = isHorizontally ? startRow : startRow + i;
            const col = isHorizontally ? startCol + i : startCol;
            const cell = this.board[row][col];
            if(cell.ship) {
                throw new Error("Cell is already occupied");
            }
            cell.ship = ship; 
        }
    }

    getCell(row,col) {
        return this.board[row][col];
    }

    checkValidPlacement(ship,startRow,startCol,isHorizontally) {
        for(let i = 0 ; i < ship.length ; i++) {
            const row = isHorizontally ? startRow : startRow + i;
            const col = isHorizontally ? startCol + i : startCol;
            if(row < 0 || row >= this.board.length || col < 0 || col >= this.board[row].length) {
                throw new Error("Ship is out of bounds");
            }

            const cell = this.board[row][col];
            if(cell.ship) {
                throw new Error("Cell is already occupied");
            }
        }
    }

}