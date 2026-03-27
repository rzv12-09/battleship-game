import Gameboard from "../src/board/Gameboard"
import Ship from "../src/board/Ship";

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


    it("getAvailableMoves method should return all valid moves",() => {
        const board = new Gameboard(2);
        expect(board.getAvailableMoves()).toEqual([{row:0,col:0},{row:0,col:1},{row:1,col:0},{row:1,col:1}])
    }) 
})

describe("Gameboard receiveAttack function", () => {
    it("register the ship attack on a occupied cell",() => {
        const board = new Gameboard(5);
        const ship = new Ship(3);
        board.placeShip(ship,1,0,true);
        board.receiveAttack(1,1);
        expect(ship.hitsReceived).toBe(1);
    })
    it("change the cell status after attack", () => {
        const board = new Gameboard(5);
        const ship = new Ship(3);
        board.placeShip(ship,1,0,true);
        board.receiveAttack(1,1);
        const selectedCell = board.getCell(1,1);
        expect(selectedCell.wasAttacked).toBe(true);
    })
    it("throws error if cell was already attacked", () => {
        const board = new Gameboard(5);
        const ship = new Ship(3);
        board.placeShip(ship,1,0,true);
        board.receiveAttack(1,1);
        expect(() => board.receiveAttack(1,1)).toThrow("Selected cell was already attacked");
    })

    it("records the attack on empty cells", () => {
        const board = new Gameboard(5);
        board.receiveAttack(1,1);
        const selectedCell = board.getCell(1,1);
        expect(selectedCell.wasAttacked).toBe(true);
    })

    it("throws error if selected cell is out of bounds", () => {
        const board = new Gameboard(2);
        expect(() => board.receiveAttack(7,7)).toThrow("Selected cell is out of bounds");
    })
    it("return `hit` if a ship was attacked", () => {
        const board = new Gameboard(5);
        const ship = new Ship(3);
        board.placeShip(ship,1,0,true);
        expect(board.receiveAttack(1,1)).toBe("hit");
    })

    it("return `miss` if a empty cell was attacked", () => {
        const board = new Gameboard(5);
        expect(board.receiveAttack(1,1)).toBe("miss");
    })

    it("method getAttackCount should return exact number of received attacks", ()=> {
        const board = new Gameboard(5);
        board.receiveAttack(1,1);
        board.receiveAttack(1,2);
        expect(board.getAttackCount()).toBe(2);
    })

})

describe("Gameboard areAllShipsSunk funcion", () => {
    it("should return true if all ships are sunk", () => {
        const board = new Gameboard(5);
        const ship = new Ship(1);
        board.placeShip(ship,0,0,true);
        board.receiveAttack(0,0);
        expect(board.areAllShipsSunk()).toBe(true);
    })
    it("should return false with empty board", () => {
        const board = new Gameboard(5);
        expect(board.areAllShipsSunk()).toBe(false);
    })
    it("should return false if a ship is on the board and not sunk", () => {
        const board = new Gameboard(5);
        const ship = new Ship(2);
        board.placeShip(ship,0,0,true);
        board.receiveAttack(0,0);
        expect(board.areAllShipsSunk()).toBe(false);
    })

    it("should return false if one ship is sunk but another is still floating", () => {
        const board = new Gameboard(5);
        const ship1 = new Ship(1);
        const ship2 = new Ship(2);
        board.placeShip(ship1, 0, 0, true);
        board.placeShip(ship2, 2, 0, true);
        board.receiveAttack(0, 0); 
        expect(board.areAllShipsSunk()).toBe(false);
    });

})
