import { GameModel } from '../models/GameModel';
import { GameView } from '../views/GameView';

export class GameController {
  private model: GameModel;
  private view: GameView;

  constructor(model: GameModel, view: GameView) {
    this.model = model;
    this.view = view;
    this.view.bindAddGame(this.handleAddGame);
    this.view.bindDeleteGame(this.handleDeleteGame);
    this.view.bindClearGames(this.handleClearGames);
    this.view.bindSelectGame(this.handleSelectGame);
    this.view.bindUndo(this.handleUndo);
    this.view.bindRedo(this.handleRedo);

    // Update the view initially to reflect the current state
    //this.updateView();
  }

  handleAddGame = () => {
    if (!this.model.isMaxGamesReached()) {
      this.model.addGame();
      //this.updateView();
    }
  };

  handleDeleteGame = () => {
    this.model.deleteGame();
    //this.updateView();
  };

  handleClearGames = () => {
    this.model.clearGames();
    //this.updateView();
  };

  handleSelectGame = (gameId: number) => {
    if (this.model.isGameSelected(gameId)) {
      this.model.unselectGame(gameId);
    } else {
      this.model.selectGame(gameId);
    }
    //this.updateView();
  };

  handleUndo = () => {
    this.model.undo();
    //this.updateView();
  };

  handleRedo = () => {
    this.model.redo();
    //this.updateView();
  };


}
