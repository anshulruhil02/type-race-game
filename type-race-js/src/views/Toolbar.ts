export class ToolbarView {
  private addGameButton: HTMLButtonElement | null;
  private deleteGameButton: HTMLButtonElement | null;
  private clearGamesButton: HTMLButtonElement | null;
  private undoButton: HTMLButtonElement | null;
  private redoButton: HTMLButtonElement | null;
  private languageSelect: HTMLSelectElement | null;

  constructor() {
    const toolbar = document.getElementById('toolbar');
    if (toolbar) {
      toolbar.innerHTML = `
        <div class="toolbar-left">
          <button id="addGame">Add Game</button>
          <button id="deleteGame">Delete Game</button>
          <button id="clearGames">Clear Games</button>
        </div>
        <div class="toolbar-right">
          <button id="undo">Undo</button>
          <button id="redo">Redo</button>
          <select id="language">
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
          </select>
        </div>
      `;
    }
    this.addGameButton = document.getElementById('addGame') as HTMLButtonElement;
    this.deleteGameButton = document.getElementById('deleteGame') as HTMLButtonElement;
    this.clearGamesButton = document.getElementById('clearGames') as HTMLButtonElement;
    this.undoButton = document.getElementById('undo') as HTMLButtonElement;
    this.redoButton = document.getElementById('redo') as HTMLButtonElement;
    this.languageSelect = document.getElementById('language') as HTMLSelectElement;
  }

  bindAddGame(handler: () => void) {
    if (this.addGameButton) {
      this.addGameButton.addEventListener('click', handler);
    }
  }

  bindDeleteGame(handler: () => void) {
    if (this.deleteGameButton) {
      this.deleteGameButton.addEventListener('click', handler);
    }
  } 

  bindClearGames(handler: () => void) {
    if (this.clearGamesButton) {
      this.clearGamesButton.addEventListener('click', handler);
    }
  }

  disableAddGameButton() {
    if (this.addGameButton) {
      this.addGameButton.disabled = true;
    }
  }

  enableAddGameButton() {
    if (this.addGameButton) {
      this.addGameButton.disabled = false;
    }
  }

  // Bind other elements similarly
}
