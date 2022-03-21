import { Vector2 } from "@s7n/math";
import { BaseStyle, Combine } from "./base";

class SectorShape {
    /**
     * 扇形的圆心坐标
     */
    center: Vector2 = new Vector2(0, 0);

    /**
     * 扇形的半径
     */
    radius: number = 0;

    /**
     * 扇形的起始角度（弧度）
     */
    startAngle: number = 0;

    /**
     * 扇形的终止角度（弧度）
     */
    endAngle: number = 0;

    /**
     * 是否逆时针。默认：false
     */
    counterclockwise: boolean = false;
}

class Sector extends Combine(SectorShape, BaseStyle) { }

export {
    Sector,
}