import { GameProgressModel } from "../models/gameProgressModel.ts";

export class GameController {
  private gameCounter = 0;

  constructor(private gameProgressModel: GameProgressModel) {}

  addGame() {
    if (this.gameCounter >= 4) return;
    this.gameProgressModel.create(++this.gameCounter);
  }

  deleteGame() {
    if (this.gameCounter <= 0) return;
    this.gameCounter--;
    this.gameProgressModel.delete();
  }

  clearGames() {
    this.gameCounter = 0;
    while (this.gameProgressModel.length > 0) {
      this.gameProgressModel.delete();
    }
  }
}


