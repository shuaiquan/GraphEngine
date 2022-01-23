import { Entity2D } from "../entity";
import { TextStyle, mergeTextStyle } from "./style";

class Text extends Entity2D {
    /**
     * 文本内容
     */
    text: string;

    /**
     * 文本样式
     */
    private textStyle: TextStyle;

    constructor(text: string, style: Partial<TextStyle> = {}) {
        super();
        this.text = text;
        this.updateStyleOption(style, true);
    }

    /**
     * 设置当前文本的绘制样式
     * 
     * @param textStyle 绘制样式
     * @param replace 是否重置为初始样式，再应用当前样式配置。默认：false
     */
    updateStyleOption(textStyle: Partial<TextStyle>, reset: boolean = false) {
        if (reset) {
            this.textStyle = mergeTextStyle(textStyle)
        } else {
            this.textStyle = Object.assign(this.textStyle, textStyle);
        }
        return this;
    }

    /**
     * 获取当前文本的绘制样式
     */
    getStyleOption() {
        return this.textStyle;
    }
}

export {
    Text,
    mergeTextStyle,
}
