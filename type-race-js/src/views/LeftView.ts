import { GameAreaView } from './GameAreaView';
import { GameConsoleView } from './GameConsoleView';

export class LeftView {
  private leftContainer: HTMLElement | null;
  private gameAreaView: GameAreaView;
  private gameConsoleView: GameConsoleView;

  constructor() {
    this.leftContainer = document.getElementById('left');
    if (this.leftContainer) {
      this.leftContainer.innerHTML = `
        <div id="gameArea"></div>
        <div id="gameConsole"></div>
      `;
    }

    this.gameAreaView = new GameAreaView();
    this.gameConsoleView = new GameConsoleView();
  }

  // Add methods to interact with the game area and game console as needed
}
