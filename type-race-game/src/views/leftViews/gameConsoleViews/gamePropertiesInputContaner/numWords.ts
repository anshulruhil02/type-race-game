import {
    SKContainer,
    Layout,
    SKTextfield,
    SKLabel,
} from "simplekit/imperative-mode";
  
// local imports
import { Observer } from "../../../../observer.ts";

export class NumWordsView extends SKContainer implements Observer {
    update(): void {
        // do nothing
    }

    constructor() {
        super();
        this.id = "numWords";
        this.fill = "white";
        this.border = "black";
        this.fillWidth = 1;
        this.fillHeight = 1;
        this.padding = 3;
        this.layoutMethod = Layout.makeFillRowLayout( {gap: 5} );
        const label = new SKLabel({
            text: "Num Words:",
            align: "centre",
        });
        const textField = new SKTextfield({
            text: "10",
            
        })
        label.fillHeight = 1;
        label.fillWidth = 1;
        textField.height = 20;
        textField.fillWidth = 100;
        textField.padding = 10;
        this.addChild(label);
        this.addChild(textField);
        this.layoutMethod = Layout.makeFillRowLayout( {gap: 5} );
    }
}



