import GameController from './GameController';
import Player from '../player/Player';
export default class ScreenController {
  constructor() {
    this.root = document.querySelector('#app');
    const p1 = new Player(10, 'real', 'Razvan');
    const p2 = new Player(10, 'computer', 'Ai');
    this.game = new GameController(p1, p2);
  }

  intitializeGame() {
    this.root.innerHTML = `
        <h1>Battleship Game</h1>
        <div class="boards-container"></div>
    `;
    this.renderBoards();
  }

  renderBoards() {}
}
