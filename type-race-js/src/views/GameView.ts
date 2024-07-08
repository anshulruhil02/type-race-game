import { ToolbarView } from './Toolbar';
import { LeftView } from './LeftView';
import { RightView } from './RightView';
import { Observer } from '../../observer';
import { GameModel } from '../models/GameModel';

export class GameView implements Observer {
  private toolbar: ToolbarView;
  private leftView: LeftView;
  private rightView: RightView;
  private model: GameModel;

  constructor(model: GameModel) {
    this.toolbar = new ToolbarView();
    this.leftView = new LeftView();
    this.rightView = new RightView();
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

  update() {
    // Clear existing games before rendering new state
    this.rightView.clearGames();

    // Add all games from the model
    const games = this.model.getGames();
    games.forEach(game => {
      this.rightView.addGame(game.id);
    });

    // Disable the "Add Game" button if max games are reached
    if (this.model.isMaxGamesReached()) {
      this.toolbar.disableAddGameButton();
    } else {
      this.toolbar.enableAddGameButton();
    }
  }
}