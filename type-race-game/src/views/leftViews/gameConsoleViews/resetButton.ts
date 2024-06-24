import {
    SKButton,
    SKContainer,
  } from "simplekit/imperative-mode";
    
  // local imports
  import { Observer } from "../../../observer.ts";
  import { makeFillColumnLayout } from "../../../utils/fillColumn.ts";
  import { GameProgressModel } from "../../../models/gameProgressModel.ts";
  import { GameAreaView } from "../gameAreaView.ts";
  import { FontAndNumWordsView } from "./gamePropertiesInputContaner/fonstSize.ts";
  
  export class ResetButtonView extends SKContainer implements Observer {
    update(): void {}
  
    constructor(private gameProgressModel: GameProgressModel, private fontAndNum: FontAndNumWordsView, private gameAreaView: GameAreaView) {
      super();
      this.id = "resetButton";
      this.fill = "white";
      this.fillWidth = 1;
      this.fillHeight = 1;
      const resetButton = new SKButton();
      resetButton.text = "Reset Game";
      resetButton.addEventListener("action", (e) => {
        this.gameProgressModel.resetGameProgressBar();
        //this.fontAndNum.update();
        //this.gameAreaView.update();
      });
      resetButton.fillWidth = 1;
      resetButton.fillHeight = 1;
      this.layoutMethod = makeFillColumnLayout();
      this.addChild(resetButton);
      this.gameProgressModel.addObserver(this);
    }
  }
  