import {
    SKContainer,
    SKTextfield,
  } from "simplekit/imperative-mode";
  
  // local imports
  import { Observer } from "../../../../observer.ts";
  import { GameProgressModel } from "../../../../models/gameProgressModel.ts"; // Import the model
import { GameAreaView } from "../../gameAreaView.ts";
  
  function getRandomWords(count: number): string[] {
    console.log(`Random words count: ${count}`);
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

  export class NumWordsView extends SKTextfield implements Observer {
    constructor(private gameProgressModel: GameProgressModel) {
        super();
        this.id = "textInput";
        this.fill = "white";
        this.border = "black";
        this.padding = 10;
        this.fillWidth = 1;
        this.height = 20;

        this.addEventListener("textchanged", (e) => {
            const tf = e.source as SKTextfield;
            if (gameProgressModel.selectedGameProgressBar) {
                gameProgressModel.selectedGameProgressBar.numWords = tf.text;
                gameProgressModel.selectedGameProgressBar.randomWords = getRandomWords(parseInt(tf.text));
                GameAreaView.update();
            }
        });

        this.gameProgressModel.addObserver(this);
    }

    update(): void {
    }
}