import { Subject } from "../observer";
import { SKContainer, SKLabel, SKMouseEvent } from "simplekit/imperative-mode";

export function createGameProgressContainer(
  label: string,
  id: number,
  onClick: () => void
): SKContainer {
  const container = new SKContainer();
  const gameLabel = new SKLabel({ text: label });
  let isSelected = false;
  gameLabel.text = `${label}`;
  gameLabel.fill = "white";
  gameLabel.fillWidth = 1;
  gameLabel.height = 80;
  gameLabel.border = "black";
  container.addChild(gameLabel);
  container.fill = "lightgrey";
  container.id = `container-${id}`;
  container.border = "black";
  container.fillWidth = 1;
  container.height = 80;

  container.handleMouseEvent = (event: SKMouseEvent) => {
    if (event.type === 'click') {
      onClick();
    }
    return isSelected;
  };
  
  return container;
}


type GameProgressBar = {
  container: SKContainer;
  id: number;
  isSelected: boolean;
};

export class GameProgressModel extends Subject {
  private gameProgressBars: GameProgressBar[] = [];
  private _selectedIndex: number | null = null;

  get length() {
    return this.gameProgressBars.length;
  }

  create(gameNumber: number) {
    const onClick = () => {
      const index = this.gameProgressBars.findIndex(bar => bar.id === gameNumber);
      this.select(index);
      this.updateSelectedBorder();
    };

    // create a game progress bar with a label
    const gameProgressContainer = createGameProgressContainer(
      "Game " + gameNumber,
      gameNumber,
      onClick
    );

    const gameProgressBar = {
      container: gameProgressContainer,
      id: gameNumber,
      isSelected: false
    };

    this.gameProgressBars = [...this.gameProgressBars, gameProgressBar];
    this.notifyObservers();
  }

  game(id: number) {
    return this.gameProgressBars.find((game) => game.id === id);
  }

  all(): GameProgressBar[] {
    return [...this.gameProgressBars];
  }

  // Update
  update(id: number, updatedGame: Partial<GameProgressBar>) {
    this.gameProgressBars = this.gameProgressBars.map((gameProgressBar) =>
      gameProgressBar.id === id ? { ...gameProgressBar, ...updatedGame } : gameProgressBar
    );
    this.notifyObservers();
  }

  get selectedIndex() {
    return this._selectedIndex;
  }

  select(index: number) {
    this._selectedIndex = index;
    if (this._selectedIndex !== null) {
      const selectedBar = this.gameProgressBars[this._selectedIndex];
      console.log(`Selected Game Progress Bar ID: ${selectedBar.id}`);
    }    this.updateSelectedBorder();
    this.notifyObservers();
  }

  updateSelectedBorder() {
    this.gameProgressBars.forEach((bar, i) => {
      if (i === this._selectedIndex) {
        bar.isSelected = true;
        bar.container.border = 'blue';
      } else {
        bar.isSelected = false;
        bar.container.border = 'black';
      }
    });
  }

  get selectedGameProgressBar() {
    if (this._selectedIndex !== null) {
      return this.gameProgressBars[this._selectedIndex];
    }
    return null;
  }

  delete() {
    this.gameProgressBars.pop();
    this.notifyObservers();
  }
}