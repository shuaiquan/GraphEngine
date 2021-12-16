import { Vector2 } from "@s7n/math";

/**
 * TODO
 * 
 * 1. 支持 origin 设置
 * 2. 支持 skew 变换
 */

class Transform {
    /**
     * 平移
     * 
     * @default (0, 0)
     */
    translate: Vector2 = new Vector2(0, 0);

    /**
     * 缩放
     * 
     * @default (1, 1)
     */
    scale: Vector2 = new Vector2(1, 1);

    /**
     * 旋转
     * 
     * @default 0 (弧度)
     */
    rotate: number = 0;

    /**
     * 变换矩阵 (CanvasRenderingContext2D)
     * 
     * ctx.setTransform(a, b, c, d, e, f);
     * 
     * 其格式为：
     *  a c e
     *  b d f
     *  0 0 1
     */
    get matrix() {
        const { translate, scale, rotate } = this;

        const cos = Math.cos(rotate);
        const sin = Math.sin(rotate);

        const { x: sx, y: sy } = scale;

        const a = cos * sx;
        const b = sin;
        const c = -sin;
        const d = cos * sy;
        const e = translate.x;
        const f = translate.y;

        return [a, b, c, d, e, f];
    }
}

export {
    Transform,
}
