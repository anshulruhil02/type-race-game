import {
    SKContainer,
} from "simplekit/imperative-mode";
  
// local imports
import { Observer } from "../../../observer.ts";
import { makeFillColumnLayout } from "../../../utils/fillColumn.ts";
import { GamePropertiesInputView } from "./gamePropertiesInputContaner/gamePropertiesInput.ts";
import { ResetButtonView } from "./resetButton.ts";
import { GameProgessView } from "./gameProgress.ts";
import { TextInputView } from "./textInputView.ts";

export class GameConsoleView extends SKContainer implements Observer {
    update(): void {
        // do nothing
    }

    constructor() {
        super();
        this.id = "right";
        this.fill = "blue";
        this.border = "black";
        this.padding = 10;
        this.fillWidth = 1;
        this.fillHeight = 1;
        this.layoutMethod = makeFillColumnLayout( {gap: 5} );
        this.addChild(new TextInputView());
        this.addChild(new GamePropertiesInputView());
        this.addChild(new ResetButtonView());
        this.addChild(new GameProgessView());
    }
}