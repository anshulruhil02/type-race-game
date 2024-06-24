import { Subject } from "../observer";
import { SKContainer, SKLabel, SKMouseEvent } from "simplekit/imperative-mode";

type GameProgressBar = {
  container: SKContainer;
  progressBarContainer: SKContainer;
  progressBar: SKContainer;
  id: number;
  isSelected: boolean;
  fontSize: string;
  numWords: string;
  randomWords: string[];
  matchedWords: boolean[];
};

export class GameProgressModel extends Subject {
  private gameProgressBars: GameProgressBar[] = [];
  private _selectedIndex: number | null = null;
 
  // Utility function to generate random words
  private getRandomWords(count: number): string[] {

    const words = [
      "apple",
      "banana",
      "cherry",
      "date",
      "elderberry",
      "fig",
      "grape",
      "honeydew",
      "kiwi",
      "lemon",
      "mango",
      "nectarine",
      "orange",
      "papaya",
      "quince",
      "raspberry",
      "strawberry",
      "tangerine",
      "ugli",
      "vanilla",
      "watermelon",
      "xigua",
      "yellow",
      "zucchini",
    ];

    const result = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * words.length);
      result.push(words[randomIndex]);
    }
    return result;
  }

  get length() {
    return this.gameProgressBars.length;
  }

  create(gameNumber: number, fontSize: string = "10", numWords: string = "10") {
    const numberOfWords = parseInt(numWords, 10);
    const onClick = () => {
      const index = this.gameProgressBars.findIndex(
        (bar) => bar.id === gameNumber
      );
      this.select(index);
      this.updateSelectedBorder();
    };

    const gameProgressContainer = createGameProgressContainer(
      "Game " + gameNumber,
      gameNumber,
      onClick
    );

    const progressBarContainer = new SKContainer();
    progressBarContainer.fill = "grey";
    progressBarContainer.height = 80;
    progressBarContainer.fillWidth = 1;
    progressBarContainer.x = 70; // Adjust x position by 10 units

    const progressBar = new SKContainer();
    progressBar.fill = "lightgreen";
    progressBar.height = 78;
    progressBar.fillWidth = 1;

    progressBarContainer.addChild(progressBar);

    const gameProgressBar = {
      container: gameProgressContainer,
      progressBarContainer: progressBarContainer,
      progressBar: progressBar,
      id: gameNumber,
      isSelected: false,
      fontSize: fontSize,
      numWords: numWords,
      randomWords: this.getRandomWords(10),
      matchedWords: Array(numberOfWords).fill(false),
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

  update(
    id: number,
    gameProgressBar: {
      fontSize: string;
      numWords: string;
      randomWords: string[];
    }
  ) {
    const numberOfWords = parseInt(gameProgressBar.numWords, 10);

    this.gameProgressBars = this.gameProgressBars.map((game) => {
      if (game.id === id) {
        return {
          ...game,
          fontSize: gameProgressBar.fontSize,
          numWords: gameProgressBar.numWords,
          randomWords: gameProgressBar.randomWords,
          matchedWords: Array(numberOfWords).fill(false),
        };
      }
      return game;
    });
    this._selectedIndex = 0;
    this.notifyObservers();
  }

  get selectedIndex() {
    return this._selectedIndex;
  }

  select(index: number, fontSize: string = "10", numWords: string = "10") {
    this._selectedIndex = index;
    if (this._selectedIndex !== null) {
      const selectedBar = this.gameProgressBars[this._selectedIndex];
    }
    this.updateSelectedBorder();
    this.notifyObservers();
  }

  updateSelectedBorder() {
    this.gameProgressBars.forEach((bar, i) => {
      if (i === this._selectedIndex) {
        bar.isSelected = true;
        bar.container.border = "red";
      } else {
        bar.isSelected = false;
        bar.container.border = "black";
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

  matchWord(word: string): boolean {
    const selectedBar = this.selectedGameProgressBar;
    if (selectedBar) {
      const currentIndex = selectedBar.matchedWords.findIndex(
        (matched) => !matched
      );
      if (
        currentIndex !== -1 &&
        selectedBar.randomWords[currentIndex] === word
      ) {
        selectedBar.matchedWords[currentIndex] = true;
        this.updateProgressBar(selectedBar);
        this.notifyObservers();
        return true;
      }
    }
    return false;
  }

  updateProgressBar(selectedBar: GameProgressBar) {
    const matchedCount = selectedBar.matchedWords.filter(
      (matched) => matched
    ).length;
    const totalWords = selectedBar.matchedWords.length;
    const progressPercentage = (matchedCount / totalWords) * 100;
    console.log(`progressPercentage: ${progressPercentage}`);
    selectedBar.progressBar.width =
      progressPercentage * 2;
      ;
    selectedBar.progressBar.fill =
      progressPercentage === 100 ? "green" : "lightgreen";
  }

  // Add this method to GameProgressModel
  resetGameProgressBar() {
    if (this.selectedGameProgressBar) {
      this.selectedGameProgressBar.randomWords = this.getRandomWords(parseInt(this.selectedGameProgressBar.numWords));
      this.selectedGameProgressBar.matchedWords = Array(10).fill(false);
      this.selectedGameProgressBar.progressBar.width = 0; // Reset progress bar width
      this.notifyObservers();
    }
  }
}

// Create Game Progress Container function outside the class as it is not dependent on class instance
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
  gameLabel.height = 78;
  container.addChild(gameLabel);
  container.fill = "lightgrey";
  container.id = `container-${id}`;
  container.border = "black";
  container.fillWidth = 1;
  container.height = 80;

  container.handleMouseEvent = (event: SKMouseEvent) => {
    if (event.type === "click") {
      onClick();
    }
    return isSelected;
  };

  return container;
}
