import { Vector2 } from "@s7n/math";
import { BaseStyle, Combine } from "./base";

class LineShape {
    /**
     * 线段的起点
     */
    start: Vector2 = new Vector2(0, 0);

    /**
     * 线段的终点
     */
    end: Vector2 = new Vector2(0, 0);
}

class Line extends Combine(LineShape, BaseStyle) { }

export {
    Line,
}
