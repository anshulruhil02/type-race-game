import {
  startSimpleKit,
  setSKRoot,
  SKContainer,
} from "simplekit/imperative-mode";

import { makeFillColumnLayout } from "./utils/fillColumn.ts";

import { ToolBarView } from "./views/toolbarView.ts";
import { GameView } from "./views/gameView.ts";
import { GameProgressModel } from "./models/gameProgressModel.ts";
// global debug flag to visualize box model dimensions
// Settings.debug = true;
function makeContainer(id: string, fill: string): SKContainer{
  const container = new SKContainer();
  container.id = id;
  container.fill = fill;
  return container;
}

const model = new GameProgressModel();

const root = makeContainer("root", "blue");
root.addChild(new ToolBarView(model));
root.addChild(new GameView(model));


root.layoutMethod = makeFillColumnLayout();

setSKRoot(root);

startSimpleKit();
