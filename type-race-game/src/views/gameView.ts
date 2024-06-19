import {
  SKContainer,
  Layout,
} from "simplekit/imperative-mode";

// local imports
import { Observer } from "../observer.ts";
import { LeftContainerView } from "./leftViews/leftContainerView.ts";
import { RightContainerView } from "./rightViews/rightContainerView.ts";
import { GameProgressModel } from "../models/gameProgressModel.ts";

export class GameView extends SKContainer implements Observer {
  //#region observer pattern

  update(): void {
  }

  constructor(private gameProgressModel: GameProgressModel) {
    super();

    // setup the view
    this.id = "game";
    this.fill = "white";
    this.border = "black";
    this.fillWidth = 1;
    this.fillHeight = 1;
    this.layoutMethod = Layout.makeFillRowLayout();
    this.addChild(new LeftContainerView());
    this.addChild(new RightContainerView(gameProgressModel));
  }
}
