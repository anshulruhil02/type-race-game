import { Observer } from '../../observer';
import { ToolbarView } from './Toolbar';
import { LeftView } from './LeftView';
import { RightView } from './RightView';
import { GameModel, Game } from '../models/GameModel';

export class GameView implements Observer {
  private toolbar: ToolbarView;
  private leftView: LeftView;
  private rightView: RightView;
  private model: GameModel;
  private game!: Game;

  constructor(model: GameModel) {
    this.toolbar = new ToolbarView();
    this.rightView = new RightView();
    this.leftView = new LeftView(this.game, model, this.rightView);
    this.model = model;
    this.model.addObserver(this); // Register as an observer
  }

  bindAddGame(handler: () => void) {
    this.toolbar.bindAddGame(handler);
  }

  bindDeleteGame(handler: () => void) {
    this.toolbar.bindDeleteGame(handler);
  }

  bindClearGames(handler: () => void) {
    this.toolbar.bindClearGames(handler);
  }

  bindSelectGame(handler: (gameId: number) => void) {
    this.rightView.bindSelectGame(handler);
  }

  update() {
    // Clear existing games before rendering new state
    this.rightView.clearGames();

    // Add all games from the model
    const games = this.model.getGames();
    games.forEach(game => {
      this.rightView.addGame(game.id, game.borderColor!);
    });

    // Update game borders
    this.rightView.updateGameBorders(games);

    // Disable the "Add Game" button if max games are reached
    if (this.model.isMaxGamesReached()) {
      this.toolbar.disableAddGameButton();
    } else {
      this.toolbar.enableAddGameButton();
    }

    // Update the game area and console with the selected game
    const selectedGame = this.model.getSelectedGame();
    if (selectedGame) {
      this.leftView.updateGameArea(selectedGame);
      this.leftView.updateGameConsole(selectedGame);
    } else {
      this.leftView.clearGameArea();
      this.leftView.clearGameConsole();
    }
  }
}
