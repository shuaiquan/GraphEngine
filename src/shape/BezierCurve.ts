import { IVec2, Vector2 } from "@s7n/math";
import { BaseShape } from "./BaseShape";
import { StyleOption } from "./style";

/**
 * 二次或三次贝塞尔曲线
 */
class BezierCurve extends BaseShape {
    /**
     * 起点
     */
    private startPoint: Vector2 = new Vector2();

    /**
     * 终点
     */
    private endPoint: Vector2 = new Vector2();

    /**
     * 控制点1
     */
    private cp1: Vector2 = new Vector2();

    /**
     * 控制点2
     */
    private cp2?: Vector2;

    /**
     * 
     * @param startPoint 起点
     * @param endPoint 终点
     * @param cp1 控制点1
     * @param cp2 控制点2（可选）
     */
    constructor(startPoint: Vector2, endPoint: Vector2, cp1: Vector2, cp2?: Vector2, styleOption?: Partial<StyleOption>) {
        super(styleOption);
        this.startPoint = startPoint.clone();
        this.endPoint = endPoint.clone();
        this.cp1 = cp1.clone();
        if (cp2) {
            this.cp2 = cp2.clone();
        }
    }

    /**
     * 设置起点坐标
     */
    setStart(start: Partial<IVec2>) {
        const x = start.x !== undefined ? start.x : this.startPoint.x;
        const y = start.y !== undefined ? start.y : this.startPoint.y;
        this.startPoint = new Vector2(x, y);
        return this;
    }

    /**
     * 获取起点坐标
     */
    getStart() {
        return this.startPoint.clone();
    }

    /**
     * 设置终点坐标
     */
    setEnd(end: Partial<IVec2>) {
        const x = end.x !== undefined ? end.x : this.endPoint.x;
        const y = end.y !== undefined ? end.y : this.endPoint.y;
        this.endPoint = new Vector2(x, y);
        return this;
    }

    /**
     * 获取终点坐标
     */
    getEnd() {
        return this.endPoint.clone();
    }

    /**
     * 设置控制点1坐标
     */
    setCP1(cp1: Partial<IVec2>) {
        const x = cp1.x !== undefined ? cp1.x : this.cp1.x;
        const y = cp1.x !== undefined ? cp1.y : this.cp2.y;
        this.cp1 = new Vector2(x, y);
        return this;
    }

    /**
     * 获取控制点1坐标
     */
    getCP1() {
        return this.cp1;
    }

    /**
     * 设置控制点2坐标
     */
    setCP2(cp2?: Partial<IVec2>) {
        if (cp2) {
            const x = cp2.x !== undefined ? cp2.x : (this.cp2 ? this.cp2.x : 0);
            const y = cp2.y !== undefined ? cp2.y : (this.cp2 ? this.cp2.y : 0);
            this.cp2 = new Vector2(x, y);
        } else {
            this.cp2 = undefined;
        }
        return this;
    }

    /**
     * 获取控制点2坐标
     */
    getCP2() {
        return this.cp2;
    }
}

export { BezierCurve };
