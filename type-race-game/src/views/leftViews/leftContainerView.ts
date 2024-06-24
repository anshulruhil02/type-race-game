import {
    SKContainer,
  } from "simplekit/imperative-mode";
  
  // local imports
  import { Observer } from "../../observer.ts";
  import { makeFillColumnLayout } from "../../utils/fillColumn.ts";
  import { GameConsoleView } from "./gameConsoleViews/gameConsoleView.ts";
  import { FontAndNumWordsView } from "./gameConsoleViews/gamePropertiesInputContaner/fonstSize.ts";
  import { GameAreaView } from "./gameAreaView.ts";
import { GameProgressModel } from "../../models/gameProgressModel.ts";
import { GameProgressView } from "./gameConsoleViews/gameProgress.ts";
  
  
  export class LeftContainerView extends SKContainer implements Observer {
    //#region observer pattern
    
    update(): void {
    }
  
    constructor(gameProgressModel: GameProgressModel, gameProgressView: GameProgressView) {
      super();
      const gameAreaView = new GameAreaView(gameProgressModel);
      const fonstAndNum = new FontAndNumWordsView(gameProgressModel, gameAreaView, gameProgressView);
      // setup the viewga
      this.id = "leftContainer";
      this.fill = "white";
      this.border = "black";
      this.fillWidth = 2;
      this.fillHeight = 1;
      this.layoutMethod = makeFillColumnLayout();
      this.addChild(gameAreaView);
      this.addChild(new GameConsoleView(gameProgressModel, gameAreaView, fonstAndNum));
    }
  }