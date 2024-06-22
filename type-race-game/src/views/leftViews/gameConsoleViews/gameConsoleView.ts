import { SKContainer } from "simplekit/imperative-mode";

// local imports
import { Observer } from "../../../observer.ts";
import { makeFillColumnLayout } from "../../../utils/fillColumn.ts";
import { GamePropertiesInputView } from "./gamePropertiesInputContaner/gamePropertiesInput.ts";
import { ResetButtonView } from "./resetButton.ts";
import { GameProgessView } from "./gameProgress.ts";
import { TextInputView } from "./textInputView.ts";
import { GameProgressModel } from "../../../models/gameProgressModel.ts";

export class GameConsoleView extends SKContainer implements Observer {
  update(): void {
  }

  constructor(private gameProgressModel: GameProgressModel) {
    super();
    this.id = "right";
    this.fill = "white";
    this.border = "black";
    this.padding = 10;
    this.fillWidth = 1;
    this.fillHeight = 1;
    this.addChild(new TextInputView(gameProgressModel));
    this.addChild(new GamePropertiesInputView(gameProgressModel));
    this.addChild(new ResetButtonView());
    this.addChild(new GameProgessView());
    this.layoutMethod = makeFillColumnLayout({ gap: 5 });
    
    this.gameProgressModel.addObserver(this);
    this.update();
  }
}
