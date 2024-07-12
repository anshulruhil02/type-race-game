import { GameModel } from "../models/GameModel";
import { GameAreaView } from "./GameAreaView";

export class TextInputView {
    private textInputElement: HTMLInputElement | null;
    private focusedWordIndex: number | null = null;
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
            let wordToMatchIndex = selectedGame.currentWordIndex;
            if (this.focusedWordIndex !== null) {
                wordToMatchIndex = this.focusedWordIndex;
            }

            const wordToMatch = this.gameAreaView.getWord(wordToMatchIndex);

            if (target.value.trim() === wordToMatch) {
                this.gameAreaView.highlightWord(wordToMatchIndex);
                this.model.matchWord(selectedGame.id, wordToMatchIndex);

                if (this.focusedWordIndex !== null) {
                    this.focusedWordIndex = null;
                    this.model.focusNextUnmatchedWord(selectedGame.id);
                } else {
                    this.model.focusNextUnmatchedWord(selectedGame.id);
                }
                target.value = '';
                this.highlightCurrentWord();
            }
        }
    }

    private highlightCurrentWord() {
        const selectedGame = this.model.getSelectedGame();
        if (selectedGame) {
            this.gameAreaView.highlightFocusedWord(selectedGame.currentWordIndex);
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

    resetWordIndex() {
        const selectedGame = this.model.getSelectedGame();
        if (selectedGame) {
            this.model.setCurrentWordIndex(selectedGame.id, 0);
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
