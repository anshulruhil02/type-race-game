export class GameProgressView {
    private gameProgressContainer: HTMLDivElement | null;
  
    constructor() {
      this.gameProgressContainer = document.getElementById('gameProgress') as HTMLDivElement;
    }
  
    setProgress(progress: string) {
      if (this.gameProgressContainer) {
        this.gameProgressContainer.innerText = progress;
      }
    }
  
    clear() {
      if (this.gameProgressContainer) {
        this.gameProgressContainer.innerText = '';
      }
    }
  
    enable() {
      if (this.gameProgressContainer) {
        this.gameProgressContainer.style.pointerEvents = 'auto';
        this.gameProgressContainer.style.opacity = '1';
      }
    }
  
    disable() {
      if (this.gameProgressContainer) {
        this.gameProgressContainer.style.pointerEvents = 'none';
        this.gameProgressContainer.style.opacity = '0.5';
      }
    }
  }
