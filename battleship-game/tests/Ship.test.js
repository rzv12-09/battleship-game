import Ship from "../src/game/Ship";

describe('Ship class',()=>{
    it("should initialize with given length and 0 hits",() => {
        const ship = new Ship(2);
        expect(ship.length).toBe(2);
        expect(ship.hitsReceived).toBe(0);
    })

    it("should increase hitsReceived when hits() is called", () => {
        const ship = new Ship(3);
        ship.hit();
        expect(ship.hitsReceived).toBe(1);
    })

    it("should return false for isSunk() if hits are less than length", () => {
        const ship = new Ship(3);
        ship.hit();
        expect(ship.isSunk()).toBe(false);
    })

    it("should return false for isSunk() if hitsReceived equals length", () => {
        const ship = new Ship(3);
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    })
    
})