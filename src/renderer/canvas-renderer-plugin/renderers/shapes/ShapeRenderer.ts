import { Matrix3 } from "@s7n/math";
import { ShapeEntity, BaseStyle } from "../../../../entity-2d";
import { BaseRenderer } from "../../BaseRenderer";

/**
 * 几何图形渲染器基类
 */
abstract class ShapeRenderer<S extends ShapeEntity<any, BaseStyle>> extends BaseRenderer<S> {
    /**
     * 获取几何图形 Path2D 数据
     * @param entity 要被渲染的几何图形
     */
    protected abstract getShapePath(entity: S): Path2D;

    render(entity: S, ctx: CanvasRenderingContext2D): void {
        const styleOption = entity.style;

        const shouldStroke = this.hasStrokeStyle(styleOption);
        const shouldFill = this.hasFillStyle(styleOption);

        if (shouldFill || shouldStroke) {
            ctx.save();     // todo 需不需要

            const path = this.getShapePath(entity);

            // const preTransform = ctx.getTransform();     // ctx.restore 包括这个吗
            ctx.setTransform(this.getTransformFromMatrix3(entity.transform.worldMatrix));

            if (shouldFill && !styleOption.onlyStroke) {
                const { fillStyle } = styleOption;
                const alpha = this.getFillAlpha(styleOption);
                ctx.fillStyle = fillStyle;
                ctx.globalAlpha = alpha;
                ctx.fill(path);
            }

            if (shouldStroke) {
                const { lineCap, lineJoin, miterLimit, lineWidth, lineDash, lineDashOffset, strokeStyle } = styleOption;
                const alpha = this.getStrokeAlpha(styleOption);
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

            ctx.restore();  // todo 需不需要
        }
    }

    /**
     * 获取 stroke 的透明度
     */
    private getStrokeAlpha(styleOption: BaseStyle) {
        const { strokeAlpha, alpha } = styleOption;
        return strokeAlpha !== undefined ? strokeAlpha : alpha;
    }

    /**
     * 获取 fill 的透明度
     */
    private getFillAlpha(styleOption: BaseStyle) {
        const { fillAlpha, alpha } = styleOption;
        return fillAlpha !== undefined ? fillAlpha : alpha;
    }

    /**
     * 是否需要 stroke
     */
    private hasStrokeStyle(styleOption: BaseStyle) {
        const { strokeStyle, lineWidth } = styleOption;
        return strokeStyle && this.getStrokeAlpha(styleOption) > 0 && lineWidth > 0;
    }

    /**
     * 是否需要 fill
     */
    private hasFillStyle(styleOption: BaseStyle) {
        const { fillStyle } = styleOption;
        return fillStyle && this.getFillAlpha(styleOption) > 0;
    }

    /**
     * 将 Matrix 数据转换 context 的 Transform
     * @param matrix 矩阵
     */
    private getTransformFromMatrix3(matrix: Matrix3) {
        const [a, c, e, b, d, f] = matrix.toArray();
        return { a, b, c, d, e, f };
    }
}

export {
    ShapeRenderer,
}