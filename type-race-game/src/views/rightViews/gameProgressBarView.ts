import { Layout, SKContainer } from "simplekit/imperative-mode";

// local imports
import { Observer } from "../../observer";
import { makeContainer } from "../../utils/makeContainer";

export class GameProgressBarView extends SKContainer implements Observer {
  //#region observer pattern

  update(): void {
   
  }

  //#endregion

  constructor() {
    super();
    // setup the view design
    
    this.fillWidth = 1;
    this.fillHeight = 1;
    this.border = "black";
    this.fill = "lightgrey";
    this.layoutMethod = Layout.makeFillRowLayout();
  }
}
