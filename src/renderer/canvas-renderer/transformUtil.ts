import { Transform } from "../../entity";

/**
 * CanvasRenderingContext2D 的 Transform 接口如下：
 * 
 * setTransform(a, b, c, d, e, f);
 * 
 * 其格式为：
 *  a c e
 *  b d f
 *  0 0 1
 */

/**
 * 将模型的 Transform 转化为 context 的 Transform
 */
export function getContextTransform(transform: Transform) {
    const { translate, scale, rotate } = transform;

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