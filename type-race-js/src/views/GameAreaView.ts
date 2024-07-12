import { GameModel, Game } from "../models/GameModel";

export class GameAreaView {
    private gameAreaContainer: HTMLElement | null;
    private model: GameModel;

    constructor(model: GameModel) {
        this.gameAreaContainer = document.getElementById("gameArea");
        this.model = model;
        if (this.gameAreaContainer) {
            this.gameAreaContainer.className = "game-area";
        }
    }

    update(game: Game) {
        if (this.gameAreaContainer) {
            this.gameAreaContainer.innerHTML = ""; // Clear previous words
            const currentLanguage = this.model.getLanguage(); // Get current language

            game.randomWords.forEach((word, index) => {
                const wordElement = document.createElement("span");
                wordElement.textContent = word[currentLanguage]; // Use current language
                wordElement.style.margin = "5px"; // Add some margin for spacing
                wordElement.className = "word"; // Apply the CSS class
                wordElement.style.fontSize = `${game.fontSize}px`; // Set font size based on game's font size
                if (game.matchedWords[index]) {
                    wordElement.style.backgroundColor = 'green';
                } else if (index === game.currentWordIndex) {
                    wordElement.style.backgroundColor = 'yellow';
                }
                wordElement.addEventListener('click', () => {
                    this.model.setCurrentWordIndex(game.id, index);
                });
                if (this.gameAreaContainer) {
                    this.gameAreaContainer.appendChild(wordElement);
                }
            });

            if (game.matchedWords.every(matched => matched)) {
                this.setGameAreaBackground('lightgreen');
            } else {
                this.setGameAreaBackground('');
            }
        }
    }

    highlightWord(index: number) {
        if (this.gameAreaContainer) {
            const wordElement = this.gameAreaContainer.children[index] as HTMLElement;
            wordElement.style.backgroundColor = "green";
        }
    }

    highlightFocusedWord(index: number) {
        if (this.gameAreaContainer) {
            Array.from(this.gameAreaContainer.children).forEach((wordElement, idx) => {
                const element = wordElement as HTMLElement;
                if (element.style.backgroundColor !== 'green') {
                    element.style.backgroundColor = idx === index ? 'yellow' : 'transparent';
                }
            });
        }
    }

    private setGameAreaBackground(color: string) {
        if (this.gameAreaContainer) {
            this.gameAreaContainer.style.backgroundColor = color;
        }
    }

    getWord(index: number): string | null {
        if (this.gameAreaContainer) {
            const wordElement = this.gameAreaContainer.children[index] as HTMLElement;
            return wordElement.textContent;
        }
        return null;
    }

    getWordsCount(): number {
        if (this.gameAreaContainer) {
            return this.gameAreaContainer.children.length;
        }
        return 0;
    }

    clear() {
        if (this.gameAreaContainer) {
            this.gameAreaContainer.innerHTML = "";
        }
    }

    enable() {
        if (this.gameAreaContainer) {
            this.gameAreaContainer.style.pointerEvents = "auto";
            this.gameAreaContainer.style.opacity = "1";
        }
    }

    disable() {
        if (this.gameAreaContainer) {
            this.gameAreaContainer.style.pointerEvents = "none";
            this.gameAreaContainer.style.opacity = "0.5";
        }
    }
}
