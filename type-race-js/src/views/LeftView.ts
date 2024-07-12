import { GameAreaView } from './GameAreaView';
import { GameConsoleView } from './GameConsoleView';
import { Game, GameModel } from '../models/GameModel';
import { RightView } from './RightView';

export class LeftView {
  private leftContainer: HTMLElement | null;
  private gameAreaView: GameAreaView;
  private gameConsoleView: GameConsoleView;

  constructor(game: Game, gameModel: GameModel, rightView: RightView) {
    this.leftContainer = document.getElementById('left');
    if (this.leftContainer) {
      this.leftContainer.innerHTML = `
        <div id="gameArea" class="game-area"></div>
        <div id="gameConsole" class="game-console"></div>
      `;
    }

    this.gameAreaView = new GameAreaView(gameModel);
    this.gameConsoleView = new GameConsoleView(gameModel, this.gameAreaView, rightView);
  }

  updateGameArea(game: Game) {
    this.gameAreaView.update(game);
    this.enableViews();
  }

  clearGameArea() {
    this.gameAreaView.clear();
    this.disableViews();
  }

  updateGameConsole(game: Game) {
    this.gameConsoleView.update(game);
  }

  clearGameConsole() {
    this.gameConsoleView.clear();
  }

  private enableViews() {
    this.gameAreaView.enable();
    this.gameConsoleView.enable();
  }

  private disableViews() {
    this.gameAreaView.disable();
    this.gameConsoleView.disable();
  }
}
