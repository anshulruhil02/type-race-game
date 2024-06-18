import { SKContainer } from "simplekit/imperative-mode";

export function makeContainer(id: string, fill: string): SKContainer {
    const container = new SKContainer();
    container.id = id;
    container.fill = fill;
    return container;
  }