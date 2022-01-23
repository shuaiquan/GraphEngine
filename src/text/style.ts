import { DEFAULT_STYLE_OPTION, StyleOption } from "../shape";

export interface TextStyle extends StyleOption {
    /**
     * 文本的 X 坐标位置
     * 
     * @default 0
     */
    x: number;
    /**
     * 文本的 Y 坐标位置
     * 
     * @default 0
     */
    y: number;
    /**
     * 文本相对于 X 的位置关系
     * 
     * @default left
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign
     * 
     * 考虑到 direction 接口的支持度，暂时不开放 'start' | 'end' 选项
     */
    align: 'left' | 'right' | 'center';
    /**
     * 文本的基线设置
     * 
     * @default alphabetic
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline
     */
    baseline: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom';
    /**
     * 字体的尺寸
     * 
     * 当使用数字时，默认为像素单位；另可使用字符串表达：'12px', '120%', '12pt'，同 CSS font-size
     * 
     * @default 10
     */
    fontSize: number | string,
    /**
     * 指定字体系列。使用同 CSS font-family
     * 
     * @default sans-serif
     */
    fontFamily: string;
    /**
     * 字体样式
     * 
     * @default 'normal'
     */
    fontStyle: 'normal' | 'italic' | 'oblique';
    /**
     * 字体粗细。使用同 CSS font-weight
     * 
     * @default 'normal'
     */
    fontWeight: 'normal' | 'bold' | 'bolder' | 'lighter' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    /**
     * 字体的变体。使用同 CSS 2.1 font-variant
     * 
     * 默认: 'normal'
     */
    fontVariant: 'normal' | 'small-caps';
}

const DEFAULT_TEXT_STYLE = Object.assign({}, DEFAULT_STYLE_OPTION, {
    x: 0,
    y: 0,
    align: 'left',
    baseline: 'alphabetic',
    fontSize: 10,
    fontFamily: 'sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontVariant: 'normal',
}) as TextStyle;

export function mergeTextStyle(textStyle: Partial<TextStyle>): TextStyle {
    return Object.assign({}, DEFAULT_TEXT_STYLE, textStyle);
}