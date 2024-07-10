import { Game, GameModel } from "../models/GameModel";
import { TextInputView } from "./TextInputView";
import { GamePropertiesInputView } from "./GamePropertiesInputView";
import { GameProgressView } from "./GameProgressView";
import { GameAreaView } from "./GameAreaView";
import { RightView } from "./RightView";
export class GameConsoleView {
  private gameConsoleContainer: HTMLElement | null;
  private textInputView!: TextInputView;
  private gamePropertiesInputView!: GamePropertiesInputView;
  private gameProgressView!: GameProgressView;
  private rightView: RightView;
  private model!: GameModel;
  private selectedGameId: number | null = null;

  constructor(
    model: GameModel,
    gameAreaView: GameAreaView,
    rightView: RightView
  ) {
    this.model = model;
    this.gameConsoleContainer = document.getElementById("gameConsole");
    this.rightView = rightView;

    if (this.gameConsoleContainer) {
      this.gameConsoleContainer.className = "game-console";
      this.gameConsoleContainer.innerHTML = `
        <div id="textInput" class="text-input"><input type="text" /></div>
        <div id="gamePropertiesInput" class="game-properties-input">
          <div id="fontSize" class="font-size">
            <label>Font Size:</label>
            <input type="range" min="0" max="100" />
          </div>
          <div id="numWords" class="num-words">
            <label>Num Words:</label>
            <input type="number" min="0" max="9999" value="20" />
          </div>
        </div>
        <button id="resetButton" class="reset-button">Reset Game</button>
        <div id="gameProgress" class="game-progress">0 / 20 Words Matched</div>
      `;

      this.textInputView = new TextInputView(model, gameAreaView);
      this.gamePropertiesInputView = new GamePropertiesInputView();
      this.gameProgressView = new GameProgressView();

      // Bind event listeners
      this.bindEvents();
    }
  }

  private bindEvents() {
    const fontSizeInput = this.gameConsoleContainer?.querySelector(
      "#fontSize input"
    ) as HTMLInputElement;
    const numWordsInput = this.gameConsoleContainer?.querySelector(
      "#numWords input"
    ) as HTMLInputElement;
    const resetButton = this.gameConsoleContainer?.querySelector(
      "#resetButton"
    ) as HTMLButtonElement;

    fontSizeInput?.addEventListener(
      "input",
      this.handleFontSizeChange.bind(this)
    );
    numWordsInput?.addEventListener(
      "input",
      this.handleNumWordsChange.bind(this)
    );
    resetButton?.addEventListener("click", this.handleResetGame.bind(this));
  }

  private handleFontSizeChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (this.selectedGameId !== null) {
      this.model.updateFontSize(this.selectedGameId, parseInt(target.value));
    }
  }

  private handleNumWordsChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (this.selectedGameId !== null) {
      this.model.updateNumWords(this.selectedGameId, parseInt(target.value));
      const game = this.model.getSelectedGame();
      if (game) {
        this.update(game); // Update the view with the new values
      }
    }
  }

  private handleResetGame() {
    if (this.selectedGameId !== null) {
      this.model.resetGame(this.selectedGameId);
      const game = this.model.getSelectedGame();
      if (game) {
        this.update(game); // Update the view with the reset values
        this.rightView.updateProgressBar(game.id, 0, game.numWords); // Reset the progress bar
      }
    }
  }

  update(game: Game) {
    this.selectedGameId = game.id;
    this.textInputView.setValue("");
    this.gamePropertiesInputView.setFontSize(game.fontSize);
    this.gamePropertiesInputView.setNumWords(game.numWords);
    const matchedWordsCount = game.matchedWords.filter(
      (matched) => matched
    ).length;
    this.gameProgressView.setProgress(
      `${matchedWordsCount} / ${game.numWords} Words Matched`
    );
    this.rightView.updateProgressBar(game.id, matchedWordsCount, game.numWords); // Update progress bar
    this.enable();
  }

  clear() {
    this.selectedGameId = null;
    this.textInputView.clear();
    this.gamePropertiesInputView.clear();
    this.gameProgressView.clear();
    this.disable();
  }

  enable() {
    this.textInputView.enable();
    this.gamePropertiesInputView.enable();
    this.gameProgressView.enable();
  }

  disable() {
    this.textInputView.disable();
    this.gamePropertiesInputView.disable();
    this.gameProgressView.disable();
  }
}
