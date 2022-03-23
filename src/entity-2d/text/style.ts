import { BaseStyle } from "../shape/base";

export class TextStyle extends BaseStyle {

    /**
     * 合并默认样式
     * @param style 
     * @returns TextStyle
     */
    static mergeStyle(style?: Partial<TextStyle>): TextStyle {
        return Object.assign(new TextStyle(), style);
    }

    /**
     * 文本的 X 坐标位置
     * 
     * @default 0
     */
    x: number = 0;
    /**
     * 文本的 Y 坐标位置
     * 
     * @default 0
     */
    y: number = 0;
    /**
     * 文本相对于 X 的位置关系
     * 
     * @default left
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign
     * 
     * 考虑到 direction 接口的支持度，暂时不开放 'start' | 'end' 选项
     */
    align: 'left' | 'right' | 'center' = 'left';
    /**
     * 文本的基线设置
     * 
     * @default alphabetic
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline
     */
    baseline: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom' = 'alphabetic';
    /**
     * 字体的尺寸
     * 
     * 当使用数字时，默认为像素单位；另可使用字符串表达：'12px', '120%', '12pt'，同 CSS font-size
     * 
     * @default 10
     */
    fontSize: number | string = 10;
    /**
     * 指定字体系列。使用同 CSS font-family
     * 
     * @default sans-serif
     */
    fontFamily: string = 'sans-serif';
    /**
     * 字体样式
     * 
     * @default 'normal'
     */
    fontStyle: 'normal' | 'italic' | 'oblique' = 'normal';
    /**
     * 字体粗细。使用同 CSS font-weight
     * 
     * @default 'normal'
     */
    fontWeight: 'normal' | 'bold' | 'bolder' | 'lighter' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' = 'normal';
    /**
     * 字体的变体。使用同 CSS 2.1 font-variant
     * 
     * @default 'normal'
     */
    fontVariant: 'normal' | 'small-caps' = 'normal';
}
