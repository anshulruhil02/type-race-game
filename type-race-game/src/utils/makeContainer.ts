import { SKContainer, SKLabel } from "simplekit/imperative-mode";


export function makeContainer(id: string, fill: string, label?: string): SKContainer {
    const container = new SKContainer();
    const gameLabel = new SKLabel({text: label});
    gameLabel.text = `${label}`
    gameLabel.fill = "white";
    gameLabel.fillWidth = 1;
    gameLabel.height = 60;
    gameLabel.border = "black";
    if(label) {
        container.addChild(gameLabel);
    }
    container.id = id;
    container.fill = fill;
    return container;
  }