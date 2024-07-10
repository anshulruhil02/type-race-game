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
  }

  handleAddGame = () => {
    if (!this.model.isMaxGamesReached()) {
      this.model.addGame();
    }
  };

  handleDeleteGame = () => {
    this.model.deleteGame();
  };

  handleClearGames = () => {
    this.model.clearGames();
  };

  handleSelectGame = (gameId: number) => {
    if (this.model.isGameSelected(gameId)) {
      this.model.unselectGame(gameId);
    } else {
      this.model.selectGame(gameId);
    }
  };

  // Implement other handlers
}
