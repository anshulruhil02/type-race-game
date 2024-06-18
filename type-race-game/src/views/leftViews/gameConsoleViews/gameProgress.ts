import {
    SKContainer,
} from "simplekit/imperative-mode";
  
// local imports
import { Observer } from "../../../observer.ts";
import { makeFillColumnLayout } from "../../../utils/fillColumn.ts";

export class GameProgessView extends SKContainer implements Observer {
    update(): void {
        // do nothing
    }

    constructor() {
        super();
        this.id = "gameProgress";
        this.fill = "brown";
        this.border = "black";
        this.padding = 10;
        this.fillWidth = 1;
        this.fillHeight = 1;
        this.layoutMethod = makeFillColumnLayout();
    }
}