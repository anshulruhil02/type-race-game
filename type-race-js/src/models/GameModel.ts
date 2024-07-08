import { Subject } from "../../observer.ts";
import { generateRandomWords, I18nWord } from "../i18nWords.ts";


interface Game {
  id: number;
  fontSize: number;
  numWords: number;
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
        numWords: 20
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
}
