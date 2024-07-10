export class GamePropertiesInputView {
    private fontSizeInput: HTMLInputElement | null;
    private numWordsInput: HTMLInputElement | null;
  
    constructor() {
      this.fontSizeInput = document.querySelector('#fontSize input') as HTMLInputElement;
      this.numWordsInput = document.querySelector('#numWords input') as HTMLInputElement;
    }
  
    setFontSize(size: number) {
      if (this.fontSizeInput) {
        this.fontSizeInput.value = size.toString();
      }
    }
  
    setNumWords(num: number) {
      if (this.numWordsInput) {
        this.numWordsInput.value = num.toString();
      }
    }
  
    clear() {
      if (this.fontSizeInput) {
        this.fontSizeInput.value = '';
      }
      if (this.numWordsInput) {
        this.numWordsInput.value = '';
      }
    }
  
    enable() {
      if (this.fontSizeInput) {
        this.fontSizeInput.disabled = false;
      }
      if (this.numWordsInput) {
        this.numWordsInput.disabled = false;
      }
    }
  
    disable() {
      if (this.fontSizeInput) {
        this.fontSizeInput.disabled = true;
      }
      if (this.numWordsInput) {
        this.numWordsInput.disabled = true;
      }
    }
  }
  