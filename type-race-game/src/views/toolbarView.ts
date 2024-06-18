import {
  SKButton,
  SKContainer,
  Layout,
} from "simplekit/imperative-mode";

// local imports
import { Observer } from "../observer";

export class ToolBarView extends SKContainer implements Observer {
  //#region observer pattern

  update(): void {
  }

  constructor() {
    super();

    // setup the view
    this.id = "toolbar";
    this.fill = "lightgray";
    this.border = "black";
    this.padding = 10;
    this.fillWidth = 1;
    this.height = 50;
    this.layoutMethod = Layout.makeFillRowLayout({ gap: 10 });

    // // add a button to the view
    this.addChild(addGame);
    this.addChild(deleteGame);
    this.addChild(clearGames);

  }
}

// button
const addGame = new SKButton({ text: "Add Game" });
addGame.width = 150;
addGame.height = 30;
// set an event handler for button "action" event
addGame.addEventListener("action", () => {
  console.log("addGame");
});

const deleteGame = new SKButton({ text: "Delete Game" });
deleteGame.width = 150;
deleteGame.height = 30;
// set an event handler for button "action" event
deleteGame.addEventListener("action", () => {
  console.log("deleteGame");
});

const clearGames = new SKButton({ text: "Clear Games" });
clearGames.width = 150;
clearGames.height = 30;
// set an event handler for button "action" event
clearGames.addEventListener("action", () => {
  console.log("clearGames");
});

