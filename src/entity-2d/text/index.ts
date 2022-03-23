import { dirtyProperty } from "../../dirty";
import { Entity2D } from "../core/Entity2D";
import { TextStyle } from "./style";

class Text extends Entity2D {
    /**
     * 文本内容
     */
    @dirtyProperty text: string;

    /**
     * 文本样式
     */
    @dirtyProperty style: TextStyle;

    constructor(text: string, style: Partial<TextStyle> = {}) {
        super();
        this.text = text;
        this.updateStyle(style, true);
    }

    /**
     * 设置当前文本的绘制样式
     * 
     * @param textStyle 绘制样式
     * @param reset 是否重置为初始样式，再应用当前样式配置。默认：false
     */
    updateStyle(textStyle: Partial<TextStyle>, reset: boolean = false) {
        if (reset) {
            this.style = TextStyle.mergeStyle(textStyle);
        } else {
            // TODO Object.assign 是否会触发 setter 从而追踪到数据变更
            this.style = Object.assign(this.style, textStyle);
        }
        return this;
    }
}

export {
    Text,
}
