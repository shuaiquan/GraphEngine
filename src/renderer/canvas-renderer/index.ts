import { Entity2D } from "../../entity";
import { BaseShape } from "../../shape";
import { getShapePath } from "./shapePath";
import { getFillAlpha, getShapeStyleOption, getStrokeAlpha, hasFillStyle, hasStrokeStyle } from "./styleUtil";
import { getTransformFromMatrix3 } from "./transformUtil";

/**
 * 使用 Canvas 2D 绘制的渲染器
 */
class CanvasRenderer {
    /**
     * 画布 2D Context
     */
    private ctx: CanvasRenderingContext2D;

    /**
     * 画布的宽度
     */
    private width: number = 0;

    /**
     * 画布的高度
     */
    private height: number = 0;

    constructor(canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d');

        const { width, height } = canvas.getBoundingClientRect();
        this.width = width;
        this.height = height;
    }

    /**
     * 渲染 Entity2D
     * @param entity 
     */
    render(entity: Entity2D) {
        if (entity instanceof BaseShape) {
            this.renderShape(entity, this.ctx);
        }
    }

    /**
     * 清空画布
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    /**
     * 渲染基本图形
     * @param shape 图形对象
     * @param ctx 渲染上下文
     */
    private renderShape(shape: BaseShape, ctx: CanvasRenderingContext2D) {
        const styleOption = getShapeStyleOption(shape);

        const shouldStroke = hasStrokeStyle(styleOption);
        const shouldFill = hasFillStyle(styleOption);

        if (shouldFill || shouldStroke) {
            ctx.save();     // todo 需不需要

            const path = getShapePath(shape);

            // const preTransform = ctx.getTransform();     // ctx.restore 包括这个吗
            ctx.setTransform(getTransformFromMatrix3(shape.getWorldMatrix()));

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
}

export {
    CanvasRenderer
}
