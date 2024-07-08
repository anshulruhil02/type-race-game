import { GameController } from './src/controllers/GameController';
import { GameModel } from './src/models/GameModel';
import { GameView } from './src/views/GameView';

document.addEventListener('DOMContentLoaded', () => {
  const model = new GameModel();
  const view = new GameView(model);
  const controller = new GameController(model, view);
});
