import { Entity2D } from "../entity";
import { CompleteTextStyle, DEFAULT_TEXT_STYLE, TextStyle } from "./style";

class Text extends Entity2D {
    text: string;

    style: TextStyle;

    constructor(text: string, style: CompleteTextStyle = {}) {
        super();
        this.text = text;
        this.style = Object.assign({}, DEFAULT_TEXT_STYLE, style);
    }
}

export {
    Text,
}
