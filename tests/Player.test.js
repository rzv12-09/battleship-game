import Gameboard from "../src/board/Gameboard";
import Player from "../src/player/Player";
import Ship from "../src/board/Ship";
describe("Player class", () => {
  it("should initialize player with a gameboard of the given size", () => {
    const player = new Player(3);
    expect(player.gameBoard).toBeInstanceOf(Gameboard);
  });
  it("player should have type `real` or `computer` ", () => {
    const realPlayer = new Player(3, "real");
    const computerPlayer = new Player(1, "computer");

    expect(realPlayer.type).toBe("real");
    expect(computerPlayer.type).toBe("computer");
  });

  it("should be able to attack another board", () => {
    const player = new Player(5, "real");
    const enemyBoard = new Gameboard(5);
    const enemyShip = new Ship(3);
    enemyBoard.placeShip(enemyShip, 0, 0, true);
    player.attack(enemyBoard, 0, 1);
    expect(enemyBoard.getCell(0, 1).wasAttacked).toBe(true);
  });
  it("should have a name", () => {
    const player = new Player(2, "real", "Rzv");
    expect(player.name).toBe("Rzv");
  });
});

describe("Computer type", () => {
  it("computer type should have a valid random attack", () => {
    const computerPlayer = new Player(5, "computer");
    const enemyBoard = new Gameboard(3);
    computerPlayer.randomAttack(enemyBoard);
    computerPlayer.randomAttack(enemyBoard);
    expect(enemyBoard.getAttackCount()).toBe(2);
  });

  it("computer type can't attack same cell more than once", () => {
    const computerPlayer = new Player(5, "computer");
    const enemyBoard = new Gameboard(2);
    computerPlayer.randomAttack(enemyBoard);
    computerPlayer.randomAttack(enemyBoard);
    computerPlayer.randomAttack(enemyBoard);
    computerPlayer.randomAttack(enemyBoard);
    expect(enemyBoard.getAttackCount()).toBe(4);
  });

  it("throws error if random attack is made by a real player", () => {
    const realPlayer = new Player(5, "real");
    const enemyBoard = new Gameboard(2);
    expect(() => realPlayer.randomAttack(enemyBoard)).toThrow(
      "Random attack is available only to computer players"
    );
  });
  it("throws error if there are no more moves left", () => {
    const computerPlayer = new Player(5, "computer");
    const enemyBoard = new Gameboard(1);
    computerPlayer.randomAttack(enemyBoard);
    expect(() => computerPlayer.randomAttack(enemyBoard)).toThrow(
      "No moves left for random attack"
    );
  });
});
