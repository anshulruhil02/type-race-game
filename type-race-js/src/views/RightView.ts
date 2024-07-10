export class RightView {
  private rightContainer: HTMLElement | null;
  private selectGameHandler: ((gameId: number) => void) | null = null;

  constructor() {
    this.rightContainer = document.getElementById('right');
  }

  addGame(gameId: number, borderColor: string) {
    if (this.rightContainer) {
      const gameContainer = document.createElement('div');
      gameContainer.style.height = '80px';
      gameContainer.style.width = '100%';
      gameContainer.style.border = `2px solid ${borderColor}`;
      gameContainer.style.display = 'flex';
      gameContainer.style.alignItems = 'center';
      gameContainer.style.gap = '0px';
      gameContainer.id = `game-${gameId}`;

      gameContainer.addEventListener('click', () => {
        if (this.selectGameHandler) {
          this.selectGameHandler(gameId);
        }
      });

      const gameIDContainer = document.createElement('div');
      gameIDContainer.style.height = '80px';
      gameIDContainer.style.width = '80px';
      gameIDContainer.style.display = 'flex';
      gameIDContainer.style.justifyContent = 'center';
      gameIDContainer.style.alignItems = 'center';

      const gameIDLabel = document.createElement('label');
      gameIDLabel.innerText = `Game ${gameId}`;

      gameIDContainer.appendChild(gameIDLabel);

      const progressBar = document.createElement('div');
      progressBar.className = 'progress-bar'; // Add a class for easy selection
      progressBar.style.flex = '1';
      progressBar.style.height = '100%';
      progressBar.style.background = 'lightgray';
      progressBar.style.position = 'relative'; // Make it relative to hold the inner bar

      const progressFill = document.createElement('div');
      progressFill.className = 'progress-fill';
      progressFill.style.height = '100%';
      progressFill.style.width = '0%';
      progressFill.style.background = 'green';
      progressFill.style.position = 'absolute';
      progressFill.style.top = '0';
      progressFill.style.left = '0';

      progressBar.appendChild(progressFill);

      gameContainer.appendChild(gameIDContainer);
      gameContainer.appendChild(progressBar);

      this.rightContainer.appendChild(gameContainer);
    }
  }

  bindSelectGame(handler: (gameId: number) => void) {
    this.selectGameHandler = handler;
  }

  clearGames() {
    if (this.rightContainer) {
      this.rightContainer.innerHTML = '';
    }
  }

  updateGameBorders(games: Game[]) {
    games.forEach(game => {
      const gameContainer = document.getElementById(`game-${game.id}`);
      if (gameContainer) {
        gameContainer.style.border = `2px solid ${game.borderColor}`;
      }
    });
  }
  
  updateProgressBar(gameId: number, matchedWordsCount: number, totalWords: number) {
    const gameContainer = document.getElementById(`game-${gameId}`);
    if (gameContainer) {
      const progressBar = gameContainer.querySelector('.progress-fill') as HTMLElement;
      if (progressBar) {
        const progressPercentage = (matchedWordsCount / totalWords) * 100;
        progressBar.style.width = `${progressPercentage}%`;
      }
    }
  }
}
