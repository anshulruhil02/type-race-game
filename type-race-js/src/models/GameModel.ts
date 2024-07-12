import { Subject } from "../../observer.ts";
import { generateRandomWords, I18nWord } from "../i18nWords.ts";
import {  UndoManager } from "../services/undo.ts";

export interface Game {
  id: number;
  fontSize: number;
  numWords: number;
  randomWords: I18nWord[];
  matchedWords: boolean[];
  currentWordIndex: number;
  isSelected?: boolean;
  borderColor?: string;
  progress: number;
  undoManager: UndoManager<GameState>
}

export interface GameState {
    fontSize: number;
    numWords: number;
    randomWords: I18nWord[];
    matchedWords: boolean[];
    currentWordIndex: number;
    progress: number;
}

export class GameModel extends Subject {
  private games: Game[];
  private readonly maxGames: number;
  private nextGameId: number;
  private currentLanguage: string = "en-CA"; // Add this line


  constructor() {
    super();
    this.games = [];
    this.maxGames = 20;
    this.nextGameId = 0;
  }
   // Add this method
   setLanguage(language: string) {
    this.currentLanguage = language;
    this.notifyObservers();
  }

  getLanguage() {
    return this.currentLanguage;
  }
  
  undo() {
    const game = this.getSelectedGame();
    if (game) {
      game.undoManager.undo(game as GameState);
      this.notifyObservers();
    }
  }

  redo() {
    const game = this.getSelectedGame();
    if (game) {
      game.undoManager.redo(game as GameState);
      this.notifyObservers();
    }
  }

  get canUndo() {
    const game = this.getSelectedGame();
    return game ? game.undoManager.canUndo : false;
  }

  get canRedo() {
    const game = this.getSelectedGame();
    return game ? game.undoManager.canRedo : false;
  }


  addGame() {
    if (this.games.length < this.maxGames) {
      const newGame: Game = {
        id: this.nextGameId,
        fontSize: 16,
        numWords: 20,
        randomWords: generateRandomWords(20),
        matchedWords: Array(20).fill(false),
        currentWordIndex: 0,
        isSelected: false,
        borderColor: "black",
        progress: 0,
        undoManager: new UndoManager<GameState>(),
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
    this.games.forEach((game) => {
      if (game.id === gameId) {
        game.isSelected = true;
        game.borderColor = "red";
      } else {
        game.isSelected = false;
        game.borderColor = "black";
      }
    });
    this.notifyObservers();
  }

  unselectGame(gameId: number) {
    const game = this.games.find((g) => g.id === gameId);
    if (game) {
      game.isSelected = false;
      game.borderColor = "black";
      this.notifyObservers();
    }
  }

  getSelectedGame(): Game | null {
    return this.games.find((game) => game.isSelected) || null;
  }

  isGameSelected(gameId: number): boolean {
    return this.games.some((game) => game.id === gameId && game.isSelected);
  }

  updateFontSize(gameId: number, fontSize: number) {
    const game = this.games.find((g) => g.id === gameId);
    if (game) {
      const oldState: GameState = { ...game };
      game.undoManager.execute({
        do: (state: GameState) => {
            state.fontSize = fontSize;
            return state;
        },
        undo: (state: GameState) => {
            state.fontSize = oldState.fontSize;
            return state;
        },
      });
      game.fontSize = fontSize;
      this.notifyObservers();
    }
  }

  updateNumWords(gameId: number, numWords: number) {
    const game = this.games.find((g) => g.id === gameId);
    if (game) {
      const oldState = { ...game };
      game.undoManager.execute({
        do: (state: GameState) => {
            state.numWords = numWords;
            state.randomWords = generateRandomWords(numWords);
            state.matchedWords = Array(numWords).fill(false);
            state.currentWordIndex = 0;
            return state;
        },
        undo: (state: GameState) => {
            state.numWords = oldState.numWords;
            state.randomWords = oldState.randomWords;
            state.matchedWords = oldState.matchedWords;
            state.currentWordIndex = oldState.currentWordIndex;
            return state;
        },
      });
      game.numWords = numWords; // Ensure state is updated
      game.randomWords = generateRandomWords(numWords);
      game.matchedWords = Array(numWords).fill(false);
      game.currentWordIndex = 0;
      this.notifyObservers();
    }
  }

  matchWord(gameId: number, wordIndex: number) {
    const game = this.games.find((g) => g.id === gameId);
    if (game) {
      game.matchedWords[wordIndex] = true;
      game.progress =
        (game.matchedWords.filter((matched) => matched).length /
          game.numWords) *
        100;
      this.advanceCurrentWordIndex(game);
      this.notifyObservers();
    }
  }

  setCurrentWordIndex(gameId: number, index: number) {
    const game = this.games.find((g) => g.id === gameId);
    if (game) {
      game.currentWordIndex = index;
      this.notifyObservers();
    }
  }

  resetGame(gameId: number) {
    const game = this.games.find((g) => g.id === gameId);
    if (game) {
      game.fontSize = 16;
      game.numWords = 20;
      game.randomWords = generateRandomWords(20);
      game.matchedWords = Array(20).fill(false);
      game.currentWordIndex = 0;
      this.notifyObservers();
    }
  }

  private advanceCurrentWordIndex(game: Game) {
    while (
      game.currentWordIndex < game.numWords &&
      game.matchedWords[game.currentWordIndex]
    ) {
      game.currentWordIndex++;
    }
  }

  focusNextUnmatchedWord(gameId: number) {
    const game = this.games.find((g) => g.id === gameId);
    if (game) {
      this.advanceCurrentWordIndex(game);
      this.notifyObservers();
    }
  }
}
