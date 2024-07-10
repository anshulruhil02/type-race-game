import { Subject } from "../../observer.ts";
import { generateRandomWords, I18nWord } from "../i18nWords.ts";

export interface Game {
  id: number;
  fontSize: number;
  numWords: number;
  randomWords: I18nWord[];
  matchedWords: boolean[]; // Track matched words
  currentWordIndex: number; // Track the current word index
  isSelected?: boolean;
  borderColor?: string;
  progress: number; // Store progress as a percentage
}

export class GameModel extends Subject {
  private games: Game[];
  private readonly maxGames: number;
  private nextGameId: number;

  constructor() {
    super();
    this.games = [];
    this.maxGames = 20;
    this.nextGameId = 0;
  }

  addGame() {
    if (this.games.length < this.maxGames) {
      const newGame: Game = {
        id: this.nextGameId,
        fontSize: 16,
        numWords: 20,
        randomWords: generateRandomWords(20),
        matchedWords: new Array(20).fill(false), // Initialize with false
        currentWordIndex: 0, // Initialize current word index
        isSelected: false,
        borderColor: 'black',
        progress: 0 // Initialize progress
      };
      this.games.push(newGame);
      this.nextGameId++;
      this.notifyObservers();
    }
  }

  deleteGame() {
    if (this.games.length > 0) {
      this.games.pop();
      this.nextGameId--;
      this.notifyObservers();
    }
  }

  clearGames() {
    this.games = [];
    this.nextGameId = 0;
    this.notifyObservers();
  }

  getGames(): Game[] {
    return this.games;
  }

  isMaxGamesReached(): boolean {
    return this.games.length >= this.maxGames;
  }

  selectGame(gameId: number) {
    this.games.forEach(game => {
      if (game.id === gameId) {
        game.isSelected = true;
        game.borderColor = 'red';
      } else {
        game.isSelected = false;
        game.borderColor = 'black';
      }
    });
    this.notifyObservers();
  }

  unselectGame(gameId: number) {
    const game = this.games.find(g => g.id === gameId);
    if (game) {
      game.isSelected = false;
      game.borderColor = 'black';
      this.notifyObservers();
    }
  }

  getSelectedGame(): Game | null {
    return this.games.find(game => game.isSelected) || null;
  }

  isGameSelected(gameId: number): boolean {
    return this.games.some(game => game.id === gameId && game.isSelected);
  }

  updateFontSize(gameId: number, fontSize: number) {
    const game = this.games.find(g => g.id === gameId);
    if (game) {
      game.fontSize = fontSize;
      this.notifyObservers();
    }
  }

  updateNumWords(gameId: number, numWords: number) {
    const game = this.games.find(g => g.id === gameId);
    if (game) {
      game.numWords = numWords;
      game.randomWords = generateRandomWords(numWords);
      game.matchedWords = new Array(numWords).fill(false); // Clear matched words
      game.currentWordIndex = 0; // Reset current word index
      game.progress = 0; // Reset progress
      this.notifyObservers();
    }
  }

  resetGame(gameId: number) {
    const game = this.games.find(g => g.id === gameId);
    if (game) {
      game.fontSize = 16;
      game.numWords = 20;
      game.randomWords = generateRandomWords(20);
      game.matchedWords = new Array(20).fill(false); // Clear matched words
      game.currentWordIndex = 0; // Reset current word index
      game.progress = 0; // Reset progress
      this.notifyObservers();
    }
  }

  matchWord(gameId: number, wordIndex: number) {
    const game = this.games.find(g => g.id === gameId);
    if (game) {
      game.matchedWords[wordIndex] = true;
      game.currentWordIndex = wordIndex + 1; // Update current word index
      this.updateProgress(game); // Update progress
      this.notifyObservers();
    }
  }

  areAllWordsMatched(gameId: number): boolean {
    const game = this.games.find(g => g.id === gameId);
    if (game) {
      return game.matchedWords.every(matched => matched);
    }
    return false;
  }

  private updateProgress(game: Game) {
    const matchedWordsCount = game.matchedWords.filter(matched => matched).length;
    game.progress = (matchedWordsCount / game.numWords) * 100;
  }
}
