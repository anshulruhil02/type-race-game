import {
    SKContainer,
    Layout,
} from "simplekit/imperative-mode";
  
// local imports
import { Observer } from "../../observer.ts";
import { random } from "simplekit/utility";
import { makeContainer } from "../../utils/makeContainer.ts";

export class GameAreaView extends SKContainer implements Observer {
    update(): void {
        // do nothing
    }

    constructor() {
        super();
        this.id = "right";
        this.fill = "red";
        this.border = "black";
        this.fillWidth = 1;
        this.fillHeight = 2;
        
          
          const root = makeContainer("root", "white");
          root.padding = 10;
          
          for (let i = 0; i < 10; i++) {
            const a = makeContainer(`${i + 1}`, "white");
            a.padding = 10;
            a.margin = 10;
            a.x = random(0, 300);
            a.y = random(0, 300);
            a.width = 100;
            a.height = 100;
            a.debug = true;
          
            root.addChild(a);
        }
        this.layoutMethod = Layout.makeWrapRowLayout( {gap: 10} );
        this.addChild(root);
    }
}


