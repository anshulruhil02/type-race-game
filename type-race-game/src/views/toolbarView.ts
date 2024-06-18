import { SKButton, SKContainer, Layout } from "simplekit/imperative-mode";

// local imports
import { Observer } from "../observer";
import { GameProgressModel } from "../models/gameProgressModel.ts";


let gameCounter = 0;
export class ToolBarView extends SKContainer implements Observer {
  //#region observer pattern

  update(): void {}

  private addGame = new SKButton({ text: "Add Game" , width: 150, height: 30});
  private deleteGame = new SKButton({ text: "Delete Game" , width: 150, height: 30});
  private clearGames = new SKButton({ text: "Clear Games" , width: 150, height: 30});

  constructor(private gameProgressModel: GameProgressModel) {
    super();
    // setup the view
    this.id = "toolbar";
    this.fill = "lightgray";
    this.border = "black";
    this.padding = 10;
    this.fillWidth = 1;
    this.height = 50;


    this.layoutMethod = Layout.makeFillRowLayout({ gap: 10 });

    this.addChild(this.addGame);
    this.addChild(this.deleteGame);
    this.addChild(this.clearGames);

    this.addGame.addEventListener("action", () => {
      gameProgressModel.create(++gameCounter);
    });
    
    this.deleteGame.addEventListener("action", () => {
      this.gameProgressModel.delete();
    });

    this.clearGames.addEventListener("action", () => {
      while (this.gameProgressModel.length() > 0) {
        this.gameProgressModel.delete();
      }
    });

    this.gameProgressModel.addObserver(this);
  }
}
