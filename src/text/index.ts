import { Entity2D } from "../entity";

interface TextStyle {
    fontFamily: string | string[];
    fontSize: number | string,
    fontStyle: string;
    fontWeight: string;
    fontVariant: string;
    fill: string;
    stroke: string;
    textAlign: string;
    baseline: string;
}

class Text extends Entity2D {
    text: string;

    style: TextStyle;

    constructor(text: string, style: TextStyle) {
        super();
        this.text = text;
        this.style = style;
    }
}

export {
    Text,
}
