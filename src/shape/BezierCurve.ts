import { IVec2, Vector2 } from "@s7n/math";

/**
 * 二次或三次贝塞尔曲线
 */
class BezierCurve {
    private startPoint: Vector2 = new Vector2();

    private endPoint: Vector2 = new Vector2();

    private cp1: Vector2 = new Vector2();

    private cp2?: Vector2;

    constructor() {

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

    getPath() {
        const { startPoint, endPoint, cp1, cp2 } = this;
        const path = new Path2D();

        path.moveTo(startPoint.x, startPoint.y);
        if (cp2) {
            path.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, endPoint.x, endPoint.y);
        } else {
            path.quadraticCurveTo(cp1.x, cp1.y, endPoint.x, endPoint.y);
        }
        return path;
    }
}