import GameController from "../src/controllers/GameController";
import Player from "../src/player/Player";

describe("GameController class", () => {
  it("game should have 2 players with given names", () => {
    const player1 = new Player(10, "real", "Rzv");
    const player2 = new Player(10, "computer", "Andrei");

    const game = new GameController(player1, player2);
    expect(game.player1.name).toBe("Rzv");
    expect(game.player2.name).toBe("Andrei");
    expect(game.player1.type).toBe("real");
    expect(game.player2.type).toBe("computer");
  });

  it("game should initialize activePlayer with player1", () => {
    const player1 = new Player(10, "real", "Rzv");
    const player2 = new Player(10, "computer", "Andrei");

    const game = new GameController(player1, player2);
    expect(game.activePlayer).toBe(player1);
  });
});
