export class RightView {
  private rightContainer: HTMLElement | null;

  constructor() {
    this.rightContainer = document.getElementById('right');
    if (this.rightContainer) {
      this.rightContainer.innerHTML = ''; // Initialize with no games
    }
  }

  addGame(gameId: number) {
    if (this.rightContainer) {
      const gameContainer = document.createElement('div');
      gameContainer.style.height = '80px';
      gameContainer.style.width = '100%';
      gameContainer.style.border = '1px solid black';
      gameContainer.style.display = 'flex';
      gameContainer.style.alignItems = 'center';
      gameContainer.style.gap = '0px';

      const gameIDContainer = document.createElement('div');
      gameIDContainer.style.height = '80px';
      gameIDContainer.style.width = '80px';
      gameIDContainer.style.display = 'flex';
      gameIDContainer.style.justifyContent = 'center';
      gameIDContainer.style.alignItems = 'center';
      gameIDContainer.style.padding = '0px 10px 0px 10px';

      const gameIDLabel = document.createElement('label');
      gameIDLabel.innerText = `Game ${gameId}`;

      gameIDContainer.appendChild(gameIDLabel);

      const progressBar = document.createElement('div');
      progressBar.style.flex = '1';
      progressBar.style.height = '100%';
      progressBar.style.background = 'lightgray';

      gameContainer.appendChild(gameIDContainer);
      gameContainer.appendChild(progressBar);

      this.rightContainer.appendChild(gameContainer);
    }
  }

  clearGames() {
    if (this.rightContainer) {
      this.rightContainer.innerHTML = '';
    }
  }
}
