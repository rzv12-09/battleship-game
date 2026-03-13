import Gameboard from "../src/game/Gameboard"
import Ship from "../src/game/Ship";

describe("Gameboard class", () => {
    it("board length should have the correct size", () => {
        const gameBoard = new Gameboard(3);
        expect(gameBoard.board.length).toBe(3);
        expect(gameBoard.board[0].length).toBe(3);
        expect(gameBoard.board[1].length).toBe(3);
        expect(gameBoard.board[2].length).toBe(3);

    })

    it("first and last cell should have the correct coordinates", () => {
        const board = new Gameboard(3);
        const firstCell = board.getCell(0,0);
        const lastCell = board.getCell(2,2)
        expect(firstCell).toMatchObject({row:0,col:0})
        expect(lastCell).toMatchObject({row:2,col:2})
    })

    it("place a ship at a specific coordinates horizontally",() => {
        const board = new Gameboard(4);
        const ship = new Ship(3);
        
        //placeShip(ship,row,col,isHorizontally)
        board.placeShip(ship,0,0,true);
        const cell1 = board.getCell(0,0);
        const cell2 = board.getCell(0,1);
        const cell3 = board.getCell(0,2);

        expect(cell1.ship).toBe(ship);
        expect(cell2.ship).toBe(ship);
        expect(cell3.ship).toBe(ship);

    });

    it("place a ship at a specific coordinates vertically",() => {
        const board = new Gameboard(6);
        const ship = new Ship(3);
        
        //placeShip(ship,row,col,isHorizontally)
        board.placeShip(ship,1,2,false);
        const cell1 = board.getCell(1,2);
        const cell2 = board.getCell(2,2);
        const cell3 = board.getCell(3,2);

        expect(cell1.ship).toBe(ship);
        expect(cell2.ship).toBe(ship);
        expect(cell3.ship).toBe(ship);

    });

    it("throws error if cell is already occupied", () => {
        const board = new Gameboard(4);
        const ship1 = new Ship(3);
        const ship2 = new Ship(2);
        board.placeShip(ship1,0,0,true);
        expect(() => board.placeShip(ship2,0,1,true)).toThrow("Cell is already occupied");
    })

    it("throws error if cell is out of bounds", () => {
        const board = new Gameboard(2);
        const ship = new Ship(3);
        expect(() => board.placeShip(ship,0,0,true)).toThrow("Ship is out of bounds");
    })
})