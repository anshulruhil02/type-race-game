import { measureText } from "simplekit/utility";
import { SKElement, SKElementProps } from "./element";
import { SKLabel } from "simplekit/imperative-mode";
import { Style } from "./style";
type LabelAlign = "centre" | "left" | "right";

type CustomSKLabelProps = SKElementProps & {
  text?: string;
  align?: LabelAlign;
  fontSize?: number;
  fill?: string;
  padding?: number;
};

export class CustomSKLabel extends SKLabel {
    private _fontSize: number;
  
    constructor({
      fontSize = 100,
      ...props
    }: CustomSKLabelProps = {}) {
      super(props);
      this._fontSize = fontSize;
      this.updateFontSize();
    }
  
    get fontSize(): number {
      return this._fontSize;
    }
  
    set fontSize(size: number) {
      this._fontSize = size;
      this.updateFontSize();
    }
  
    private updateFontSize() {
      this.font = `${this._fontSize}px Arial`; // Assuming default font family is Arial
      const m = measureText(this.text, this.font);
  
      if (!m) {
        return;
      }
  
      // set the height
      this.height = m.height + this.padding * 2;
  
      // set the width from measure text unless specified in constructor
      this.width = this.width || m.width + this.padding * 2;
    }
  }