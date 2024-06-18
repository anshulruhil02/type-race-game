import { SKContainer } from "simplekit/imperative-mode";

// local imports
import { Observer } from "../../observer.ts";
import { makeFillColumnLayout } from "../../utils/fillColumn.ts";
import { ListView } from "./gameListView.ts";
import { GameProgressModel } from "../../models/gameProgressModel.ts";

export class RightContainerView extends SKContainer implements Observer {
  //#region observer pattern

  update(): void {}

  constructor(private gameProgressModel: GameProgressModel) {
    super();

    // setup the view
    this.id = "rightContainer";
    this.fill = "green";
    this.border = "black";
    this.fillWidth = 1;
    this.fillHeight = 1;
    this.layoutMethod = makeFillColumnLayout({ gap: 5 });
    this.addChild(new ListView(gameProgressModel));
  }
}
