export interface CompleteTextStyle {
    /**
     * 文本的 X 坐标位置
     * 
     * 默认：0
     */
    x?: number;
    /**
     * 文本的 Y 坐标位置
     * 
     * 默认：0
     */
    y?: number;
    /**
     * 文本相对于 X 的位置关系
     * 
     * 默认：left
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign
     * 
     * 考虑到 direction 接口的支持度，暂时不开放 'start' | 'end' 选项
     */
    align?: 'left' | 'right' | 'center';
    /**
     * 文本的基线设置
     * 
     * 默认：alphabetic
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline
     */
    baseline?: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom';
    /**
     * 字体的尺寸
     * 
     * 当使用数字时，默认为像素单位；另可使用字符串表达：'12px', '120%', '12pt'，同 CSS font-size
     * 
     * 默认：10
     */
    fontSize?: number | string,
    /**
     * 指定字体系列。使用同 CSS font-family
     * 
     * 默认：sans-serif
     */
    fontFamily?: string;
    /**
     * 字体样式
     * 
     * 默认：'normal'
     */
    fontStyle?: 'normal' | 'italic' | 'oblique';
    /**
     * 字体粗细。使用同 CSS font-weight
     * 
     * 默认：'normal'
     */
    fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    /**
     * 字体的变体。使用同 CSS 2.1 font-variant
     * 
     * 默认: 'normal'
     */
    fontVariant?: 'normal' | 'small-caps';
    /**
     * 字体填充色
     * 
     * 默认：#000 (black)
     */
    fillStyle?: string;
    /**
     * 字体描边颜色
     * 
     * 默认：#000 (black)
     */
    strokeStyle?: string;
    /**
     * 是否仅描边
     * 
     * 默认: false
     */
    onlyStroke?: boolean;
}

export type TextStyle = Required<CompleteTextStyle>;

export const DEFAULT_TEXT_STYLE: TextStyle = {
    x: 0,
    y: 0,
    align: 'left',
    baseline: 'alphabetic',
    fontSize: 10,
    fontFamily: 'sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontVariant: 'normal',
    fillStyle: '#000',
    strokeStyle: '#000',
    onlyStroke: false,
}