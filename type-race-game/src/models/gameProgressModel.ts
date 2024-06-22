import { Subject } from "../observer";
import { SKContainer, SKLabel, SKMouseEvent } from "simplekit/imperative-mode";

// Utility function to generate random words
function getRandomWords(count: number): string[] {
    const words = [
        "apple", "banana", "cherry", "date", "elderberry",
        "fig", "grape", "honeydew", "kiwi", "lemon",
        "mango", "nectarine", "orange", "papaya", "quince",
        "raspberry", "strawberry", "tangerine", "ugli", "vanilla",
        "watermelon", "xigua", "yellow", "zucchini"
    ];
    const result = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        result.push(words[randomIndex]);
    }
    return result;
}

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
    if (event.type === 'click') {
      onClick();
    }
    return isSelected;
  };
  
  return container;
}

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

  get length() {
    return this.gameProgressBars.length;
  }

  create(gameNumber: number, fontSize: string = '10', numWords: string = '10') {
    const onClick = () => {
      const index = this.gameProgressBars.findIndex(bar => bar.id === gameNumber);
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

    const numberOfWords = parseInt(numWords, 10);
    const gameProgressBar = {
      container: gameProgressContainer,
      progressBarContainer: progressBarContainer,
      progressBar: progressBar,
      id: gameNumber,
      isSelected: false,
      fontSize: fontSize,
      numWords: numWords,
      randomWords: getRandomWords(numberOfWords),
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

  update(id: number, gameProgressBar: { fontSize: string; numWords: string; }) {
    const numberOfWords = parseInt(gameProgressBar.numWords, 10);
    this.gameProgressBars = this.gameProgressBars.map((game) => {
      if (game.id === id) {
        return {
          ...game,
          fontSize: gameProgressBar.fontSize,
          numWords: gameProgressBar.numWords,
          randomWords: getRandomWords(numberOfWords),
          matchedWords: Array(numberOfWords).fill(false),
          progressBar: game.progressBar,
          progressBarContainer: game.progressBarContainer,
        };
      }
      return game;
    });
    this._selectedIndex = null;
    this.notifyObservers();
  }

  get selectedIndex() {
    return this._selectedIndex;
  }

  select(index: number) {
    this._selectedIndex = index;
    if (this._selectedIndex !== null) {
      const selectedBar = this.gameProgressBars[this._selectedIndex];
      console.log(`Selected Game Progress Bar ID: ${selectedBar.id} fontSize: ${selectedBar.fontSize}`);
      console.log(`Selected Game Progress Bar ID: ${selectedBar.id} numWords: ${selectedBar.numWords}`);
      console.log(`Selected Game Progress Bar ID: ${selectedBar.id} randomWords: ${selectedBar.randomWords.join(", ")}`);
    }
    this.updateSelectedBorder();
    this.notifyObservers();
  }

  updateSelectedBorder() {
    this.gameProgressBars.forEach((bar, i) => {
      if (i === this._selectedIndex) {
        bar.isSelected = true;
        bar.container.border = 'red';
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

  matchWord(word: string): boolean {
    const selectedBar = this.selectedGameProgressBar;
    if (selectedBar) {
      const currentIndex = selectedBar.matchedWords.findIndex(matched => !matched);
      if (currentIndex !== -1 && selectedBar.randomWords[currentIndex] === word) {
        selectedBar.matchedWords[currentIndex] = true;
        this.updateProgressBar(selectedBar);
        this.notifyObservers();
        return true;
      }
    }
    return false;
  }

  updateProgressBar(selectedBar: GameProgressBar) {
    const matchedCount = selectedBar.matchedWords.filter(matched => matched).length;
    const totalWords = selectedBar.matchedWords.length;
    const progressPercentage = (matchedCount / totalWords) * 100;
    selectedBar.progressBar.width = progressPercentage * 2.87;
    selectedBar.progressBar.fill = progressPercentage === 100 ? "green" : "lightgreen";
  }
}
