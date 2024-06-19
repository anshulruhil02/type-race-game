import {
  SKContainer,
} from "simplekit/imperative-mode";

// local imports
import { Observer } from "../../observer";
import { makeFillColumnLayout } from "../../utils/fillColumn";
import {
  GameProgressModel,
} from "../../models/gameProgressModel";


export class ListView extends SKContainer implements Observer {
  //#region observer pattern

  update(): void {
    this.clearChildren();
    const gameProgressBars = this.gameProgressModel.all();
    for (const gameProgressBar of gameProgressBars) {
      const gameBar = gameProgressBar.container;
      this.addChild(gameBar);
    }
    
  }
  //#endregion

  constructor(private gameProgressModel: GameProgressModel) {
    super();
    // setup the view design
    this.padding = 5;
    this.fillWidth = 1;
    this.fillHeight = 1;
    //this.gameProgressModel.select();
    // setup the view
    // use a custom layout in this app
    this.layoutMethod = makeFillColumnLayout({ gap: 10 });
    this.gameProgressModel.addObserver(this);
    this.update();
  }
}


