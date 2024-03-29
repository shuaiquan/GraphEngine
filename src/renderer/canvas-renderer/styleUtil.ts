import { StyleOption } from "../../shape";

/**
 * 获取 stroke 的透明度
 */
export function getStrokeAlpha(styleOption: StyleOption) {
    const { strokeAlpha, alpha } = styleOption;
    return strokeAlpha !== undefined ? strokeAlpha : alpha;
}

/**
 * 获取 fill 的透明度
 */
export function getFillAlpha(styleOption: StyleOption) {
    const { fillAlpha, alpha } = styleOption;
    return fillAlpha !== undefined ? fillAlpha : alpha;
}

/**
 * 是否需要 stroke
 */
export function hasStrokeStyle(styleOption: StyleOption) {
    const { strokeStyle, lineWidth } = styleOption;
    return strokeStyle && getStrokeAlpha(styleOption) > 0 && lineWidth > 0;
}

/**
 * 是否需要 fill
 */
export function hasFillStyle(styleOption: StyleOption) {
    const { fillStyle } = styleOption;
    return fillStyle && getFillAlpha(styleOption) > 0;
}
