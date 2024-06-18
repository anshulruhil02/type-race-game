import { SKContainer } from "simplekit/imperative-mode";

// local imports
import { makeStackColLayout } from "./stackCol";
import { Observer } from "../../observer";
import { makeContainer } from "../../utils/makeContainer";

export class ListView extends SKContainer implements Observer {
  //#region observer pattern

  update(): void {
   
  }

  //#endregion

  constructor() {
    super();

    // setup the view design
    this.padding = 5;
    this.fillWidth = 1;
    this.fillHeight = 1;
    for (let i = 0; i < 20; i++) {
        const a = makeContainer(`${i + 1}`, "orange");
        a.padding = 10;
        a.fillWidth = 1;
        a.fillHeight = 1;
        a.border = "black";
        this.addChild(a);
    }

    // use a custom layout in this app
    this.layoutMethod = makeStackColLayout();
     
    
  }
}
