import { BaseShape, CompleteStyleOption, mergeStyleOption } from "../../shape";

/**
 * 获取 stroke 的透明度
 */
export function getStrokeAlpha(styleOption: CompleteStyleOption) {
    const { strokeAlpha, alpha } = styleOption;
    return strokeAlpha !== undefined ? strokeAlpha : alpha;
}

/**
 * 获取 fill 的透明度
 */
export function getFillAlpha(styleOption: CompleteStyleOption) {
    const { fillAlpha, alpha } = styleOption;
    return fillAlpha !== undefined ? fillAlpha : alpha;
}

/**
 * 是否需要 stroke
 */
export function hasStrokeStyle(styleOption: CompleteStyleOption) {
    const { strokeStyle, lineWidth } = styleOption;
    return strokeStyle && getStrokeAlpha(styleOption) > 0 && lineWidth > 0;
}

/**
 * 是否需要 fill
 */
export function hasFillStyle(styleOption: CompleteStyleOption) {
    const { fillStyle } = styleOption;
    return fillStyle && getFillAlpha(styleOption) > 0;
}

/**
 * 获取图形的完整样式配置
 * @param shape 目标图形
 * @returns styleOption
 */
export function getShapeStyleOption(shape: BaseShape) {
    return mergeStyleOption(shape.getStyleOption());
}