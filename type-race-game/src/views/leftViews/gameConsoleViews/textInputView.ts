import {
    SKContainer,
  } from "simplekit/imperative-mode";
  
  // local imports
  import { Observer } from "../../../observer.ts";
  import { makeFillColumnLayout } from "../../../utils/fillColumn.ts";
  import { GameProgressModel } from "../../../models/gameProgressModel.ts"; // Import the model
  
  export class TextInputView extends SKContainer implements Observer {
  
    constructor(private gameProgressModel: GameProgressModel) {
      super();
  
      this.id = "textInput";
      this.fill = "pink";
      this.border = "black";
      this.padding = 10;
      this.fillWidth = 1;
      this.fillHeight = 1;
      this.layoutMethod = makeFillColumnLayout();
    }
  
    update(): void {
      // This method will be called when the model notifies observers
      const selectedBar = this.gameProgressModel.selectedGameProgressBar;
      if (selectedBar) {
        console.log(`TextInputView: Currently selected game progress bar ID: ${selectedBar.id}`);
      } else {
        console.log("TextInputView: No game progress bar selected");
      }
    }
  }
  