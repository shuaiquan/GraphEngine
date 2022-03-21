import { Vector2 } from "@s7n/math";
import { BaseStyle, Combine } from "./base";

class BezierCurveShape {
    /**
     * 起点
     */
    startPoint: Vector2 = new Vector2();

    /**
     * 终点
     */
    endPoint: Vector2 = new Vector2();

    /**
     * 控制点1
     */
    cp1: Vector2 = new Vector2();

    /**
     * 控制点2
     */
    cp2?: Vector2;
}

class BezierCurve extends Combine(BezierCurveShape, BaseStyle) { }

export {
    BezierCurve,
}