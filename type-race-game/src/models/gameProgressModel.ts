import { Subject } from "../observer";
import { SKContainer, SKLabel } from "simplekit/imperative-mode";

export function createGameProgressBar(label: string): SKContainer {
  const container = new SKContainer();
  const gameLabel = new SKLabel({ text: label });
  gameLabel.text = `${label}`;
  gameLabel.fill = "white";
  gameLabel.fillWidth = 1;
  gameLabel.height = 60;
  gameLabel.border = "black";
  container.addChild(gameLabel); 
  container.fill = "lightgrey";
  container.id = label;
  container.border = "black";
  container.fillWidth = 1;
  container.height = 60;
  return container;
}

export class GameProgressModel extends Subject {
  private gameProgressBars: SKContainer[] = [];

  all() {
    return [...this.gameProgressBars];
  }

  length() {
    return this.gameProgressBars.length;
  }

  update(): void {
    this.notifyObservers();
  }

  create(gameNumber: number) {
    // create a game progress bar with a label
    const gameProgressBar = createGameProgressBar("Game " + gameNumber);
    this.gameProgressBars = [...this.gameProgressBars, gameProgressBar];
    this.notifyObservers();
  }

  delete() {
    this.gameProgressBars.pop();
    this.notifyObservers();
  }
}
