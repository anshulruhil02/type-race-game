import { GameModel } from "../models/GameModel";
import { GameAreaView } from "./GameAreaView";


export class TextInputView {
    private textInputElement: HTMLInputElement | null;
    private gameAreaView: GameAreaView;
    private model!: GameModel;
  
    constructor(model: GameModel, gameAreaView: GameAreaView) {
      this.textInputElement = document.querySelector('#textInput input') as HTMLInputElement;
      this.gameAreaView = gameAreaView;
      this.model = model;
  
      if (this.textInputElement) {
        this.textInputElement.addEventListener('input', this.onInputChange.bind(this));
      }
    }
  
    private onInputChange(event: Event) {
        const target = event.target as HTMLInputElement;
        const selectedGame = this.model.getSelectedGame();
    
        if (selectedGame) {
          const currentWordIndex = selectedGame.currentWordIndex;
          const currentWord = this.gameAreaView.getWord(currentWordIndex);
    
          if (target.value.trim() === currentWord && selectedGame) {
            this.gameAreaView.highlightWord(currentWordIndex);
            this.model.matchWord(selectedGame.id, currentWordIndex);
            target.value = '';
          }
        }
     }
  
    setValue(value: string) {
      if (this.textInputElement) {
        this.textInputElement.value = value;
      }
    }
  
    clear() {
      if (this.textInputElement) {
        this.textInputElement.value = '';
      }
    }


  
    enable() {
      if (this.textInputElement) {
        this.textInputElement.disabled = false;
      }
    }
  
    disable() {
      if (this.textInputElement) {
        this.textInputElement.disabled = true;
      }
    }
  }
  