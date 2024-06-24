import {
    SKContainer,
    Layout,
  } from "simplekit/imperative-mode";
  
  // local imports
  import { Observer } from "../../observer.ts";
  import { GameProgressModel } from "../../models/gameProgressModel.ts";
  import { CustomSKLabel } from "../../utils/customLabel.ts"; // Make sure the import path is correct
  
  export class GameAreaView extends SKContainer implements Observer {
  
    private matchedLabel: CustomSKLabel;
    private remainingLabel: CustomSKLabel;
    private numberOfWords: number = 10;
    private matchedWordsCount: number = 0;
    private remainingWordsCount: number = this.numberOfWords;
    private fontSize: number = 10; // Default font size
  
    update(): void {
      // Remove all children from the container
      this.clearChildren();
  
      // Get the selected game progress bar
      // Check if a game progress bar is selected
      if (this.gameProgressModel.selectedGameProgressBar !== null) {
        this.numberOfWords = this.gameProgressModel.selectedGameProgressBar.randomWords.length;
        this.fontSize = parseInt(this.gameProgressModel.selectedGameProgressBar.fontSize);
        this.matchedWordsCount = this.gameProgressModel.selectedGameProgressBar.matchedWords.filter(Boolean).length;
        this.remainingWordsCount = this.numberOfWords - this.matchedWordsCount;
        this.matchedLabel.text = `Matched: ${this.matchedWordsCount}`;
        this.remainingLabel.text = `Remaining: ${this.remainingWordsCount}`;
  
        // Set the font size
        this.matchedLabel.fontSize = this.fontSize;
        this.remainingLabel.fontSize = this.fontSize;
  
        // Create the labels based on the random words
        for (let i = 0; i < this.numberOfWords; i++) {
          const wordLabel = new CustomSKLabel({
            text: this.gameProgressModel.selectedGameProgressBar.randomWords[i],
          });
  
          // Apply font size through the font property
          wordLabel.fontSize = this.fontSize;
          wordLabel.fill = this.gameProgressModel.selectedGameProgressBar.matchedWords[i] ? "green" : "lightgrey";
          wordLabel.padding = 10;
  
          this.addChild(wordLabel);
        }
        
      }
      // Add the progress bar container

    }
  
    constructor(private gameProgressModel: GameProgressModel) {
      super();
      this.id = "right";
      this.fill = "white";
      this.border = "black";
      this.fillWidth = 1;
      this.fillHeight = 2;
  
      // Set layout method to wrap row layout with a gap of 10px
      this.layoutMethod = Layout.makeWrapRowLayout({ gap: 10 });
  
      // Create labels to display matched and remaining words count
      this.matchedLabel = new CustomSKLabel({ text: "Matched: 0" });
      this.remainingLabel = new CustomSKLabel({ text: "Remaining: 0" });
  
      this.addChild(this.matchedLabel);
      this.addChild(this.remainingLabel);
  
      this.gameProgressModel.addObserver(this);
  
      // Initial update to set the initial state of the containers
      this.update();
    }
  
    setFontSize(newFontSize: number) {
      this.fontSize = newFontSize;
      this.update();
    }
  }
  