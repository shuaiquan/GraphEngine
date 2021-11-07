import { Object2D } from "../object";
import { BaseShape, CompleteStyleOption, mergeStyleOption } from "../shape";

export function render(object: Object2D, ctx: CanvasRenderingContext2D) {
    if (object instanceof BaseShape) {
        renderShape(object, ctx);
    } else if (object instanceof Object2D) {
        object.children.forEach(child => {
            render(child, ctx);
        });
    }
}

/**
 * 获取 stroke 的透明度
 */
function getStrokeAlpha(styleOption: CompleteStyleOption) {
    const { strokeAlpha, alpha } = styleOption;
    return strokeAlpha !== undefined ? strokeAlpha : alpha;
}

/**
 * 获取 fill 的透明度
 */
function getFillAlpha(styleOption: CompleteStyleOption) {
    const { fillAlpha, alpha } = styleOption;
    return fillAlpha !== undefined ? fillAlpha : alpha;
}

/**
 * 是否需要 stroke
 */
function hasStrokeStyle(styleOption: CompleteStyleOption) {
    const { strokeStyle, lineWidth } = styleOption;
    return strokeStyle && getStrokeAlpha(styleOption) > 0 && lineWidth > 0;
}

/**
 * 是否需要 fill
 */
function hasFillStyle(styleOption: CompleteStyleOption) {
    const { fillStyle } = styleOption;
    return fillStyle && getFillAlpha(styleOption) > 0;
}

/**
 * 渲染基本图形
 * @param shape 图形对象
 * @param ctx 渲染上下文
 */
function renderShape(shape: BaseShape, ctx: CanvasRenderingContext2D) {
    const styleOption = mergeStyleOption(shape.getStyleOption());

    const shouldStroke = hasStrokeStyle(styleOption);
    const shouldFill = hasFillStyle(styleOption);

    if (shouldFill || shouldStroke) {
        ctx.save();     // todo 需不需要

        const path = shape.getPath();

        if (shouldStroke) {
            const { lineCap, lineJoin, miterLimit, lineWidth, lineDash, lineDashOffset, strokeStyle } = styleOption;
            const alpha = getStrokeAlpha(styleOption);
            ctx.lineCap = lineCap;
            ctx.lineJoin = lineJoin;
            ctx.miterLimit = miterLimit;
            ctx.lineWidth = lineWidth;
            ctx.setLineDash(lineDash);
            ctx.lineDashOffset = lineDashOffset;
            ctx.strokeStyle = strokeStyle;
            ctx.globalAlpha = alpha;    // todo 需不需要缓存当前的数据？save + restore 可以还原这个吗？
            ctx.stroke(path);
        }

        if (shouldFill) {
            const { fillStyle } = styleOption;
            const alpha = getFillAlpha(styleOption);
            ctx.fillStyle = fillStyle;
            ctx.globalAlpha = alpha;
            ctx.fill(path);
        }

        ctx.restore();  // todo 需不需要
    }
}