import { Vector2 } from "@s7n/math";
import { BaseStyle, Combine } from "./base";

class ArcShape {
    /**
     * 圆弧的圆心坐标
     */
    center: Vector2 = new Vector2(0, 0);

    /**
     * 圆弧的半径
     */
    radius: number = 0;

    /**
     * 圆弧的起始角度（弧度）
     */
    startAngle: number = 0;

    /**
     * 圆弧的终止角度（弧度）
     */
    endAngle: number = 0;

    /**
     * 是否逆时针。默认：false
     */
    counterclockwise: boolean = false;
}

class Arc extends Combine(ArcShape, BaseStyle) { }

export {
    Arc,
}