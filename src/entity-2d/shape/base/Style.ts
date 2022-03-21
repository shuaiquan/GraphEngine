/**
 * 图形样式
 */
class BaseStyle {
    /**
     * 合并样式配置
     */
    static mergeStyle(style: Partial<BaseStyle> = {}) {
        return Object.assign(new BaseStyle(), style);
    }

    /**
     * 透明度。
     * 
     * @default 1
     * 
     * 指定当前图形的透明度，优先级高于 globalAlpha。
     */
    alpha: number = 1;

    /**
     * 填充颜色。
     * 
     * @default #000 (black)
     * 
     * 当在填充颜色指明透明度时（例如使用rgba）,会同 fillAlpha/alpha 属性产生叠加效应；建议制定透明度使用 fillAlpha/alpha。
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle
     */
    fillStyle: string = '#000';

    /**
     * 填充颜色的透明度
     * 
     * @default 1
     * 
     * 指定当前图形填充颜色的透明度，优先级高于 alpha
     */
    fillAlpha: number = 1;

    /**
     * 线条边框颜色。当 strokeStyle 设置为 undefined 后，不会绘制 stroke 
     * 
     * @default undefined
     * 
     * 当在线条边框颜色指明透明度时（例如使用rgba）,会同 strokeAlpha/alpha 属性产生叠加效应；建议制定透明度使用 strokeAlpha/alpha。
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle
     */
    strokeStyle?: string;

    /**
     * 线条边框透明度
     * 
     * @default 1
     * 
     * 指定当前图形线条边框的透明度，优先级高于 alpha
     */
    strokeAlpha: number = 1;

    /**
     * 仅绘制边框。当指定为 true 时，将不会进行填充绘制
     * 
     * @default false
     */
    onlyStroke: boolean = false;

    /**
     * 线条宽度
     * 
     * @default 1.0
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth
     */
    lineWidth: number = 1;

    /**
     * 线条端点样式
     * 
     * @default butt
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap
     */
    lineCap: 'butt' | 'round' | 'square' = 'butt';

    /**
     * 线条的连接部分样式。仅对多段线、弧线等非封闭图形有效
     * 
     * @default miter
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin
     */
    lineJoin: 'miter' | 'bevel' | 'round';

    /**
     * 斜接限制长度
     * 
     * @default 10.0
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/miterLimit
     */
    miterLimit: number = 10;

    /**
     * 虚线样式
     * 
     * @default undefined
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
     */
    lineDash: number[] = [];

    /**
     * 虚线样式偏移
     * 
     * @default 0.0
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset
     */
    lineDashOffset: number = 0;
}

export {
    BaseStyle,
}