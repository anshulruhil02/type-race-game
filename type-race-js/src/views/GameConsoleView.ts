import { TextInputView } from './TextInputView';
import { GamePropertiesInputView } from './GamePropertiesInputView';
import { GameProgressView } from './GameProgressView';

export class GameConsoleView {
  private gameConsoleContainer: HTMLElement | null;
  private textInputView: TextInputView;
  private gamePropertiesInputView: GamePropertiesInputView;
  private gameProgressView: GameProgressView;

  constructor() {
    this.gameConsoleContainer = document.getElementById('gameConsole');
    if (this.gameConsoleContainer) {
      this.gameConsoleContainer.className = 'game-console';
      this.gameConsoleContainer.innerHTML = `
        <div id="textInput"></div>
        <div id="gamePropertiesInput"></div>
        <button id="resetButton" class="reset-button">Reset Game</button>
        <div id="gameProgress"></div>
      `;
    }

    this.textInputView = new TextInputView();
    this.gamePropertiesInputView = new GamePropertiesInputView();
    this.gameProgressView = new GameProgressView();
  }

  // Add methods to manipulate the game console as needed
}
