import Gameboard from "../src/board/Gameboard";
import Player from "../src/player/Player";
describe("Player class", () => {
    it("should initialize player with a gameboard of the given size", () => {
        const player = new Player(3);
        expect(player.gameBoard).toBeInstanceOf(Gameboard);
    })
    it("player should have type `real` or `computer` ", () => {
        const realPlayer = new Player(3,"real");
        const computerPlayer = new Player(1,"computer");
        
        expect(realPlayer.type).toBe("real");
        expect(computerPlayer.type).toBe("computer");
    })
})