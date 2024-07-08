export class TextInputView {
    private textInputContainer: HTMLElement | null;
  
    constructor() {
      this.textInputContainer = document.getElementById('textInput');
      if (this.textInputContainer) {
        this.textInputContainer.className = 'text-input';
        this.textInputContainer.innerHTML = `<input type="text" />`;
      }
    }
  
    // Add methods to manipulate the text input as needed
  }
  