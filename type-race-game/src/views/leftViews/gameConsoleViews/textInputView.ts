import {
  SKContainer,
  SKTextfield,
} from "simplekit/imperative-mode";

// local imports
import { Observer } from "../../../observer.ts";
import { GameProgressModel } from "../../../models/gameProgressModel.ts"; // Import the model

export class TextInputView extends SKTextfield implements Observer {
    constructor(private gameProgressModel: GameProgressModel) {
        super();
        this.id = "textInput";
        this.fill = "white";
        this.border = "black";
        this.padding = 10;
        this.fillWidth = 1;
        this.height = 30;

        this.addEventListener("textchanged", (e) => {
            const tf = e.source as SKTextfield;
            if (this.gameProgressModel.matchWord(tf.text)) {
                tf.text = ""; // Clear the text field on match
            }
        });

        this.gameProgressModel.addObserver(this);
    }

    update(): void {
    }
}