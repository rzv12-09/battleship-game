export default class Cell {
    constructor(row,col) {
        this.row = row;
        this.col = col;
        this.ship = null;
        this.wasAttacked = false;
    }

}
