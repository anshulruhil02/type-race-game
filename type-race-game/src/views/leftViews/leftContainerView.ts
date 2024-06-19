import {
    SKContainer,
  } from "simplekit/imperative-mode";
  
  // local imports
  import { Observer } from "../../observer.ts";
  import { makeFillColumnLayout } from "../../utils/fillColumn.ts";
  import { GameConsoleView } from "./gameConsoleViews/gameConsoleView.ts";
  import { GameAreaView } from "./gameAreaView.ts";
  
  export class LeftContainerView extends SKContainer implements Observer {
    //#region observer pattern
  
    update(): void {
    }
  
    constructor() {
      super();
  
      // setup the view
      this.id = "leftContainer";
      this.fill = "white";
      this.border = "black";
      this.fillWidth = 2;
      this.fillHeight = 1;
      this.layoutMethod = makeFillColumnLayout();
      this.addChild(new GameAreaView());
      this.addChild(new GameConsoleView());
    }
  }