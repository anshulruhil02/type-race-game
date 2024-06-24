import {
    SKContainer,
    SKLabel,
} from "simplekit/imperative-mode";
  
// local imports
import { Observer } from "../../../observer.ts";
import { makeFillColumnLayout } from "../../../utils/fillColumn.ts";
import { GameProgressModel } from "../../../models/gameProgressModel.ts";
import { GameAreaView } from "../gameAreaView.ts";

export class GameProgressView extends SKContainer implements Observer {
    private progressLabel: SKLabel;

    update(): void {
        if (this.gameProgressModel.selectedGameProgressBar) {
            const matchedWordsCount = this.gameProgressModel.selectedGameProgressBar.matchedWords.filter(Boolean).length;
            const numberOfWords = this.gameProgressModel.selectedGameProgressBar.numWords;
            const numWordsCount = parseInt(this.gameProgressModel.selectedGameProgressBar.numWords);
            console.log(matchedWordsCount, numWordsCount);
            if(matchedWordsCount === numWordsCount) {
                console.log("Game Completed!");
                this.progressLabel.text = "Game Completed!";
            }else{
                this.progressLabel.text = `Matched Words: ${matchedWordsCount}/${numberOfWords}`;
            }
        }
    }

    constructor(private gameProgressModel: GameProgressModel, private gameAreaView: GameAreaView) {
        super();
        this.id = "gameProgress";
        this.fill = "white";
        this.padding = 10;
        this.fillWidth = 1;
        this.fillHeight = 1;
        this.layoutMethod = makeFillColumnLayout();

        this.progressLabel = new SKLabel({ text: "Matched Words: 0/0" });

        this.progressLabel.fillWidth = 1;
        this.progressLabel.fillHeight = 1;

        this.addChild(this.progressLabel);
        this.gameProgressModel.addObserver(this);
    }
}
