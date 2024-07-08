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
    // Bind other methods as needed
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


  // Implement other handlers
}
