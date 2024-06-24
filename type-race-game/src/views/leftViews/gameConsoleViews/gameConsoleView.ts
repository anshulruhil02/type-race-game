import { SKContainer } from "simplekit/imperative-mode";

// local imports
import { Observer } from "../../../observer.ts";
import { makeFillColumnLayout } from "../../../utils/fillColumn.ts";
import { GamePropertiesInputView } from "./gamePropertiesInputContaner/gamePropertiesInput.ts";
import { ResetButtonView } from "./resetButton.ts";
import { GameProgressView } from "./gameProgress.ts";
import { TextInputView } from "./textInputView.ts";
import { GameProgressModel } from "../../../models/gameProgressModel.ts";
import { GameAreaView } from "../gameAreaView.ts";
import { FontAndNumWordsView } from "./gamePropertiesInputContaner/fonstSize.ts";
export class GameConsoleView extends SKContainer implements Observer {
  update(): void {
  }

  constructor(private gameProgressModel: GameProgressModel, private gameAreaView: GameAreaView, private fontAndNum: FontAndNumWordsView) {
    super();
    this.id = "right";
    this.fill = "white";
    this.border = "black";
    this.padding = 10;
    this.fillWidth = 1;
    this.fillHeight = 1;
    const gameProgressView: GameProgressView = new GameProgressView(gameProgressModel, gameAreaView)
    this.addChild(new TextInputView(gameProgressModel));
    this.addChild(new GamePropertiesInputView(gameProgressModel, gameAreaView, gameProgressView));
    this.addChild(new ResetButtonView(gameProgressModel, fontAndNum ,gameAreaView));
    this.addChild(gameProgressView);
    this.layoutMethod = makeFillColumnLayout({ gap: 5 });
    
    this.gameProgressModel.addObserver(this);
    this.update();
  }
}
