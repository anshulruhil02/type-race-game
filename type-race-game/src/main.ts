import {
  startSimpleKit,
  setSKRoot,
  SKContainer,
} from "simplekit/imperative-mode";

import { makeFillColumnLayout } from "./utils/fillColumn.ts";

import { ToolBarView } from "./views/toolbarView.ts";
import { GameView } from "./views/gameView.ts";
// global debug flag to visualize box model dimensions
// Settings.debug = true;
function makeContainer(id: string, fill: string): SKContainer{
  const container = new SKContainer();
  container.id = id;
  container.fill = fill;
  return container;
}

const root = makeContainer("root", "blue");
root.addChild(new ToolBarView());
root.addChild(new GameView());


//root.addChild(new GameConsoleView());
//root.addChild(new GameAreaView());
// const leftContainer = makeContainer("left", "blue");
// leftContainer.fillHeight = 1;
// leftContainer.fillWidth = 2;
// leftContainer.border = "black";

// leftContainer.addChild(new GameAreaView());
// leftContainer.addChild(new GameConsoleView());
// leftContainer.layoutMethod = makeStackColLayout();

// mainContainer.addChild(leftContainer);

// const rightContainer = makeContainer("right", "yellow");
// rightContainer.fillHeight = 1;
// rightContainer.fillWidth = 1;
// rightContainer.border = "black";
// rightContainer.layoutMethod = makeStackColLayout();


// mainContainer.addChild(rightContainer);
//mainContainer.layoutMethod = makeStackColLayout();


root.layoutMethod = makeFillColumnLayout();

setSKRoot(root);

startSimpleKit();
