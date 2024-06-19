import {
  startSimpleKit,
  setSKRoot,
  SKContainer,
  SKMouseEvent,
  setSKEventListener,
} from "simplekit/imperative-mode";

import { makeFillColumnLayout } from "./utils/fillColumn.ts";

import { ToolBarView } from "./views/toolbarView.ts";
import { GameView } from "./views/gameView.ts";
import { GameProgressModel } from "./models/gameProgressModel.ts";
import { GameController } from "./controllers/gameController.ts";
import { mouseDispatch } from "./utils/dispatch-mouse.ts";
// global debug flag to visualize box model dimensions
// Settings.debug = true;
function makeContainer(id: string, fill: string): SKContainer{
  const container = new SKContainer();
  container.id = id;
  container.fill = fill;
  return container;
}

const model = new GameProgressModel();
const controller = new GameController(model);

const root = makeContainer("root", "white");
root.addChild(new ToolBarView(model, controller));
root.addChild(new GameView(model));


root.layoutMethod = makeFillColumnLayout();

setSKEventListener((e) => {
  if (e instanceof SKMouseEvent) {
    mouseDispatch(e, root);
  }
});


setSKRoot(root);

startSimpleKit();
