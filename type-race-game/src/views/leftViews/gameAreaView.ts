import {
    SKContainer,
    Layout,
    SKLabel,
} from "simplekit/imperative-mode";

// local imports
import { Observer } from "../../observer.ts";
import { GameProgressModel } from "../../models/gameProgressModel.ts";

export class GameAreaView extends SKContainer implements Observer {
    private matchedLabel: SKLabel;
    private remainingLabel: SKLabel;

    update(): void {
        // Remove all children from the container
        this.clearChildren();

        // Get the selected game progress bar
        const selectedGameProgressBar = this.gameProgressModel.selectedGameProgressBar;

        // Check if a game progress bar is selected
        if (selectedGameProgressBar) {
            const randomWords = selectedGameProgressBar.randomWords;
            const numberOfWords = randomWords.length;
            const matchedWordsCount = selectedGameProgressBar.matchedWords.filter(Boolean).length;
            const remainingWordsCount = numberOfWords - matchedWordsCount;

            this.matchedLabel.text = `Matched: ${matchedWordsCount}`;
            this.remainingLabel.text = `Remaining: ${remainingWordsCount}`;

            // Create the labels based on the random words
            for (let i = 0; i < numberOfWords; i++) {
                const wordLabel = new SKLabel({
                    text: randomWords[i],
                });

                wordLabel.fill = selectedGameProgressBar.matchedWords[i] ? "green" : "lightgrey";
                wordLabel.padding = 10;

                this.addChild(wordLabel);
            }

            // Add the progress bar container
        }
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
        this.matchedLabel = new SKLabel({ text: "Matched: 0" });
        this.remainingLabel = new SKLabel({ text: "Remaining: 0" });

        this.addChild(this.matchedLabel);
        this.addChild(this.remainingLabel);

        this.gameProgressModel.addObserver(this);

        // Initial update to set the initial state of the containers
        this.update();
    }
}
