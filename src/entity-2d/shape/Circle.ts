import { Vector2 } from "@s7n/math";
import { BaseStyle, Combine } from "./base";

class CircleShape {
    /**
     * 圆心坐标
     */
    center: Vector2 = new Vector2();

    /**
     * 圆半径
     */
    radius: number = 0;
}

class Circle extends Combine(CircleShape, BaseStyle) { }

export {
    Circle,
}