import { SKButton, SKContainer, Layout } from "simplekit/imperative-mode";
import { Observer } from "../observer";
import { GameProgressModel } from "../models/gameProgressModel.ts";
import { GameController } from "../controllers/gameController.ts";

export class ToolBarView extends SKContainer implements Observer {
  update(): void {}

  private addGameButton = new SKButton({ text: "Add Game", width: 150, height: 30 });
  private deleteGameButton = new SKButton({ text: "Delete Game", width: 150, height: 30 });
  private clearGamesButton = new SKButton({ text: "Clear Games", width: 150, height: 30 });

  constructor(private gameProgressModel: GameProgressModel, private gameController: GameController) {
    super();
    this.id = "toolbar";
    this.fill = "lightgray";
    this.border = "black";
    this.padding = 10;
    this.fillWidth = 1;
    this.height = 50;

    this.layoutMethod = Layout.makeFillRowLayout({ gap: 10 });

    this.addChild(this.addGameButton);
    this.addChild(this.deleteGameButton);
    this.addChild(this.clearGamesButton);

    this.addGameButton.fillWidth = 1;
    this.deleteGameButton.fillWidth = 1;
    this.clearGamesButton.fillWidth = 1;

    this.addGameButton.fillHeight = 1;
    this.deleteGameButton.fillHeight = 1;
    this.clearGamesButton.fillHeight = 1;

    this.addGameButton.addEventListener("action", () => this.gameController.addGame());
    this.deleteGameButton.addEventListener("action", () => this.gameController.deleteGame());
    this.clearGamesButton.addEventListener("action", () => this.gameController.clearGames());

    this.gameProgressModel.addObserver(this);
  }
}
