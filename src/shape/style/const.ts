import { CompleteStyleOption, LineCap, LineJoin } from "./type";

/**
 * 默认样式配置
 */
export const DEFAULT_STYLE_OPTION: CompleteStyleOption = {
    alpha: 1,
    // fillStyle: '#fff',
    // fillAlpha: 1,
    // strokeStyle: '#000',
    // strokeAlpha: 1,
    lineWidth: 1,
    lineCap: LineCap.Butt,
    lineJoin: LineJoin.Miter,
    miterLimit: 10,
    lineDash: [],
    lineDashOffset: 0,
}