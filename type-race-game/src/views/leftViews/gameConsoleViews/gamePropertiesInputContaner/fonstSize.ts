import {
    SKContainer,
    Layout,
    SKLabel,
    SKTextfield,
} from "simplekit/imperative-mode";

// local imports
import { Observer } from "../../../../observer.ts";
import { GameProgressModel } from "../../../../models/gameProgressModel.ts";
import { SKTextfieldDemo } from "../../../../utils/textfield.ts";

const fontSizeTextField = new SKTextfieldDemo();
const numWordsTextField = new SKTextfield();

export class FontAndNumWordsView extends SKContainer implements Observer {
    
    update(): void {
        const selectedGameBar = this.gameProgressModel.selectedGameProgressBar;
        if (selectedGameBar) {
            fontSizeTextField.text = selectedGameBar.fontSize.toString();
            numWordsTextField.text = selectedGameBar.numWords.toString();

        } else {
            fontSizeTextField.text = "";
            numWordsTextField.text = "";
            // fontSizeTextField.focus = false;
            // numWordsTextField.focus = false;
        }
    }

    constructor(private gameProgressModel: GameProgressModel) {
        super();
        this.id = "fontAndNumWordsView";
        this.fill = "white";
        this.border = "black";
        this.fillWidth = 1;
        this.fillHeight = 1;
        this.padding = 3;
        this.layoutMethod = Layout.makeFillRowLayout({ gap: 5 });

        const fontSizeLabel = new SKLabel({
            text: "Font Size:",
            align: "centre",
        });

        fontSizeLabel.fillHeight = 1;
        fontSizeLabel.fillWidth = 1;
        fontSizeTextField.height = 20;
        fontSizeTextField.fillWidth = 100;
        fontSizeTextField.padding = 10;

        const numWordsLabel = new SKLabel({
            text: "Num Words:",
            align: "centre",
        });

        numWordsLabel.fillHeight = 1;
        numWordsLabel.fillWidth = 1;
        numWordsTextField.height = 20;
        numWordsTextField.fillWidth = 100;
        numWordsTextField.padding = 10;

        this.addChild(fontSizeLabel);
        this.addChild(fontSizeTextField);
        this.addChild(numWordsLabel);
        this.addChild(numWordsTextField);

        fontSizeTextField.addEventListener("textchanged", (e) => {
            const tf = e.source as SKTextfield;
            console.log(`fontSizeTextField textchanged '${tf.text}'`);
            if (gameProgressModel.selectedGameProgressBar) {
                gameProgressModel.selectedGameProgressBar.fontSize = tf.text;
            }
            console.log(gameProgressModel.selectedGameProgressBar?.fontSize);
        });

        numWordsTextField.addEventListener("textchanged", (e) => {
            const tf = e.source as SKTextfield;
            console.log(`numWordsTextField textchanged '${tf.text}'`);
            if (gameProgressModel.selectedGameProgressBar) {
                gameProgressModel.selectedGameProgressBar.numWords = tf.text;
            }
            console.log(gameProgressModel.selectedGameProgressBar?.numWords);
        });

        this.layoutMethod = Layout.makeFillRowLayout({ gap: 5 });
        this.gameProgressModel.addObserver(this);

        // Initial update to set the initial state of the text fields
        this.update();
    }
}
