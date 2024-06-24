import {
    SKContainer,
    Layout,
} from "simplekit/imperative-mode";
  
// local imports
import { Observer } from "../../../../observer.ts";
import { FontAndNumWordsView } from "./fonstSize.ts";
import { GameProgressModel } from "../../../../models/gameProgressModel.ts";
import { GameAreaView } from "../../gameAreaView.ts";
import { GameProgressView } from "../gameProgress.ts";

export class GamePropertiesInputView extends SKContainer implements Observer {
    update(): void {
        // do nothing
    }

    constructor(private gameProgressModel: GameProgressModel, private gameAreaView: GameAreaView, private gameProgressView: GameProgressView) {
        super();
        this.id = "gamePropertiesInput";
        this.fill = "white";
        this.border = "black";
        this.padding = 10;
        this.fillWidth = 1;
        this.fillHeight = 1;
        this.layoutMethod = Layout.makeFillRowLayout( {gap: 5} );
        this.addChild(new FontAndNumWordsView(gameProgressModel, gameAreaView, gameProgressView));
    }
}

