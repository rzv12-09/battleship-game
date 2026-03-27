import GameController from '../src/controllers/GameController';
import Player from '../src/player/Player';
import Ship from '../src/board/Ship';
describe('GameController class', () => {
  it('game should have 2 players with given names', () => {
    const player1 = new Player(10, 'real', 'Rzv');
    const player2 = new Player(10, 'computer', 'Andrei');

    const game = new GameController(player1, player2);
    expect(game.player1.name).toBe('Rzv');
    expect(game.player2.name).toBe('Andrei');
    expect(game.player1.type).toBe('real');
    expect(game.player2.type).toBe('computer');
  });

  it('game should initialize activePlayer with player1', () => {
    const player1 = new Player(10, 'real', 'Rzv');
    const player2 = new Player(10, 'computer', 'Andrei');

    const game = new GameController(player1, player2);
    expect(game.activePlayer).toBe(player1);
  });

  it('checkWinnerPlayer should return winner player name if there are no enemy ships left', () => {
    const player1 = new Player(1, 'real', 'Rzv');
    const player2 = new Player(1, 'computer', 'Andrei');
    const ship1 = new Ship(1);
    const ship2 = new Ship(1);
    player1.gameBoard.placeShip(ship1, 0, 0, true);
    player2.gameBoard.placeShip(ship2, 0, 0, true);
    const game = new GameController(player1, player2);
    game.playRound(0, 0);
    expect(game.checkWinnerPlayer()).toBe('Rzv');
  });

  it('checkWinnerPlayer should return null if the game is still playing', () => {
    const player1 = new Player(1, 'real', 'Rzv');
    const player2 = new Player(1, 'computer', 'Andrei');
    const ship1 = new Ship(1);
    const ship2 = new Ship(1);
    player1.gameBoard.placeShip(ship1, 0, 0, true);
    player2.gameBoard.placeShip(ship2, 0, 0, true);
    const game = new GameController(player1, player2);
    expect(game.checkWinnerPlayer()).toBeNull();
  });
});
