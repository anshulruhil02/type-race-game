import {
    SKMouseEvent,
    SKTextfield,
    SKTextfieldProps,
  } from "simplekit/imperative-mode";
  
  import { requestKeyboardFocus } from "./dispatch-keyboard";
  
  export class SKTextfieldDemo extends SKTextfield {
    constructor(disabled: boolean = false) {
      super();
  
      // force layout recalculation for this demo
      this.calculateBasis();
      this.doLayout();
    }
    
    
    handleMouseEvent(me: SKMouseEvent) {
      switch (me.type) {
        case "mouseenter":
          this.state = "hover";
          return true;
          break;
        case "mouseexit":
          this.state = "idle";
          return true;
          break;
        case "click":
          requestKeyboardFocus(this);
          //console.log(`clicked ${this.text}`);
          return true;
          break;
        case "mousedown":
          return false;
          break;
        case "mouseup":
          return false;
          break;
      }
      return false;
    }
  }
  