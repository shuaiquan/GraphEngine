/**
 * 线条端点样式
 */
export enum LineCap {
    Butt = 'butt',
    Round = 'round',
    Square = 'square'
}

/**
 * 线条链接样式
 */
export enum LineJoin {
    Round = 'round',
    Bevel = 'bevel',
    Miter = 'miter',
}

/**
 * 一份完备的样式接口
 * 
 * fillStyle、strokeStyle、fillAlpha、strokeAlpha 可为空，表示用户并未对其进行相关设置
 */
export interface CompleteStyleOption {
    /**
     * 透明度。
     * 
     * 指定当前图形的透明度，优先级高于 globalAlpha。
     */
    alpha: number;
    /**
     * 填充颜色。
     * 
     * 当在填充颜色指明透明度时（例如使用rgba）,会同 fillAlpha/alpha 属性产生叠加效应；建议制定透明度使用 fillAlpha/alpha。
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle
     */
    fillStyle?: string;
    /**
     * 填充颜色的透明度
     * 
     * 指定当前图形填充颜色的透明度，优先级高于 alpha
     */
    fillAlpha?: number;
    /**
     * 线条边框颜色
     * 
     * 当在线条边框颜色指明透明度时（例如使用rgba）,会同 strokeAlpha/alpha 属性产生叠加效应；建议制定透明度使用 strokeAlpha/alpha。
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle
     */
    strokeStyle?: string;
    /**
     * 线条边框透明度
     * 
     * 指定当前图形线条边框的透明度，优先级高于 alpha
     */
    strokeAlpha?: number;
    /**
     * 线条宽度
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth
     */
    lineWidth: number;
    /**
     * 线条端点样式
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap
     */
    lineCap: LineCap;
    /**
     * 线条的连接部分样式
     * 
     * 仅对多段线、弧线等非封闭图形有效
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin
     */
    lineJoin: LineJoin;
    /**
     * 斜接限制长度
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/miterLimit
     */
    miterLimit: number;
    /**
     * 虚线样式
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
     */
    lineDash: number[];
    /**
     * 虚线样式偏移
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset
     */
    lineDashOffset: number;
}

export type StyleOption = Partial<CompleteStyleOption>;
