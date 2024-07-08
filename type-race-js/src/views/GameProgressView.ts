export class GameProgressView {
    private gameProgressContainer: HTMLElement | null;
  
    constructor() {
      this.gameProgressContainer = document.getElementById('gameProgress');
      if (this.gameProgressContainer) {
        this.gameProgressContainer.className = 'game-progress';
        this.gameProgressContainer.innerHTML = `0 / 20 Words Matched`;
      }
    }
  
    // Add methods to manipulate the game progress as needed
  }
  