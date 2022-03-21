import { Vector2 } from "@s7n/math";
import { BaseStyle, Combine } from "./base";

class EllipseShape {
    /**
     * 椭圆圆心
     */
    center: Vector2 = new Vector2(0, 0);

    /**
     * 椭圆的长轴半径
     */
    radiusX: number = 0;

    /**
     * 椭圆的短轴半径
     */
    radiusY: number = 0;

    /**
     * 椭圆的旋转（弧度）
     */
    rotation: number = 0;
}

class Ellipse extends Combine(EllipseShape, BaseStyle) { }

export {
    Ellipse,
}