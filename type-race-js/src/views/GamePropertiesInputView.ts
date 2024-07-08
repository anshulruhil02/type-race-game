export class GamePropertiesInputView {
    private gamePropertiesContainer: HTMLElement | null;
  
    constructor() {
      this.gamePropertiesContainer = document.getElementById('gamePropertiesInput');
      if (this.gamePropertiesContainer) {
        this.gamePropertiesContainer.className = 'game-properties-input';
        this.gamePropertiesContainer.innerHTML = `
          <div id="fontSize" class="font-size">
            <label>Font Size:</label>
            <input type="range" min="0" max="100" />
          </div>
          <div id="numWords" class="num-words">
            <label>Num Words:</label>
            <input type="number" min="0" max="9999" />
          </div>
        `;
      }
    }
  
    // Add methods to manipulate the game properties input as needed
  }
  