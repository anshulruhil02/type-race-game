import {
    SKContainer,
    Layout,
    SKLabel,
    SKTextfield,
  } from "simplekit/imperative-mode";
  
  // local imports
  import { Observer } from "../../../../observer.ts";
  import { GameProgressModel } from "../../../../models/gameProgressModel.ts";
  import { GameAreaView } from "../..//gameAreaView"; // Make sure the import path is correct
import { GameProgressView } from "../gameProgress.ts";
  
  const fontSizeTextField = new SKTextfield();
  const numWordsTextField = new SKTextfield();
  
  function getRandomWords(count: number): string[] {
    const words = [
      "apple", "banana", "cherry", "date", "elderberry",
      "fig", "grape", "honeydew", "kiwi", "lemon",
      "mango", "nectarine", "orange", "papaya", "quince",
      "raspberry", "strawberry", "tangerine", "ugli", "vanilla",
      "watermelon", "xigua", "yellow", "zucchini"
    ];
    const result = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * words.length);
      result.push(words[randomIndex]);
    }
    return result;
  }
  
  export class FontAndNumWordsView extends SKContainer implements Observer {
    
    update(): void {
      const selectedGameBar = this.gameProgressModel.selectedGameProgressBar;
      if (selectedGameBar) {
        fontSizeTextField.text = selectedGameBar.fontSize.toString();
        numWordsTextField.text = selectedGameBar.numWords.toString();
      } else {
        fontSizeTextField.text = "";
        numWordsTextField.text = "";
      }
    }
  
    constructor(private gameProgressModel: GameProgressModel, private gameAreaView: GameAreaView, private gameProgressView: GameProgressView) {
      super();
      this.id = "fontAndNumWordsView";
      this.fill = "white";
      this.fillWidth = 1;
      this.height = 30;
      this.layoutMethod = Layout.makeFillRowLayout({ gap: 5 });
  
      const fontSizeLabel = new SKLabel({
        text: "Font Size:",
        align: "centre",
      });
  
      fontSizeLabel.fillHeight = 1;
      fontSizeLabel.fillWidth = 1;
      fontSizeTextField.fillHeight = 1;
      fontSizeTextField.fillWidth = 1;
  
      const numWordsLabel = new SKLabel({
        text: "Num Words:",
        align: "centre",
      });
  
      numWordsLabel.fillHeight = 1;
      numWordsLabel.fillWidth = 1;
      numWordsTextField.fillHeight = 1;
      numWordsTextField.fillWidth = 1;
  
      this.addChild(fontSizeLabel);
      this.addChild(fontSizeTextField);
      this.addChild(numWordsLabel);
      this.addChild(numWordsTextField);
  
      fontSizeTextField.addEventListener("textchanged", (e) => {
        const tf = e.source as SKTextfield;
        if (gameProgressModel.selectedGameProgressBar) {
          gameProgressModel.selectedGameProgressBar.fontSize = tf.text;
          this.gameAreaView.setFontSize(parseInt(tf.text)); // Update font size in GameAreaView
        }
      });
  
      numWordsTextField.addEventListener("textchanged", (e) => {
        const tf = e.source as SKTextfield;
        if (gameProgressModel.selectedGameProgressBar) {
          gameProgressModel.selectedGameProgressBar.numWords = tf.text;
          gameProgressModel.selectedGameProgressBar.randomWords = getRandomWords(parseInt(tf.text));
          gameProgressModel.selectedGameProgressBar.matchedWords = new Array(parseInt(tf.text)).fill(false);
          this.gameAreaView.update(); // Trigger the update method of GameAreaView
        }
      });
  
      this.layoutMethod = Layout.makeFillRowLayout({ gap: 5 });
      this.gameProgressModel.addObserver(this);
  
      // Initial update to set the initial state of the text fields
      this.update();
    }
  }
  