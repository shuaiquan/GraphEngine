import { Matrix3 } from "@s7n/math";
import { Text, TextStyle } from "../../../entity-2d";
import { BaseRenderer } from "../BaseRenderer";

class TextRenderer extends BaseRenderer<Text> {
    render(entity: Text, ctx: CanvasRenderingContext2D): void {
        const textStyle = entity.style;

        const shouldStroke = this.hasStrokeStyle(textStyle);
        const shouldFill = this.hasFillStyle(textStyle);

        if (shouldFill || shouldStroke) {
            ctx.save();     // todo 需不需要

            ctx.setTransform(this.getTransformFromMatrix3(entity.transform.worldMatrix));

            const { x, y, align, baseline, fontSize, fontFamily, fontStyle, fontWeight, fontVariant } = textStyle;
            ctx.textAlign = align;
            ctx.textBaseline = baseline;
            const ctxFontSize = typeof fontSize === 'number' ? `${fontSize}px` : fontSize;
            ctx.font = `${fontStyle} ${fontVariant} ${fontWeight} ${ctxFontSize} ${fontFamily}`;


            if (shouldFill && !textStyle.onlyStroke) {
                const { fillStyle } = textStyle;
                ctx.fillStyle = fillStyle;

                const alpha = this.getFillAlpha(textStyle);
                ctx.globalAlpha = alpha;

                ctx.fillText(entity.text, x, y);
            }

            if (shouldStroke) {
                const { strokeStyle } = textStyle;
                if (strokeStyle !== undefined) {
                    ctx.strokeStyle = strokeStyle;

                    const alpha = this.getStrokeAlpha(textStyle);
                    ctx.globalAlpha = alpha;

                    ctx.strokeText(entity.text, x, y);
                }
            }

            ctx.restore();  // todo 需不需要
        }
    }

    /**
     * 获取 stroke 的透明度
     */
    private getStrokeAlpha(styleOption: TextStyle) {
        const { strokeAlpha, alpha } = styleOption;
        return strokeAlpha !== undefined ? strokeAlpha : alpha;
    }

    /**
     * 获取 fill 的透明度
     */
    private getFillAlpha(styleOption: TextStyle) {
        const { fillAlpha, alpha } = styleOption;
        return fillAlpha !== undefined ? fillAlpha : alpha;
    }

    /**
     * 是否需要 stroke
     */
    private hasStrokeStyle(styleOption: TextStyle) {
        const { strokeStyle, lineWidth } = styleOption;
        return strokeStyle && this.getStrokeAlpha(styleOption) > 0 && lineWidth > 0;
    }

    /**
     * 是否需要 fill
     */
    private hasFillStyle(styleOption: TextStyle) {
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
    TextRenderer
}