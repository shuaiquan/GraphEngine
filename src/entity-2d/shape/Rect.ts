import { BaseStyle, Combine } from "./base";

class RectShape {
    /**
     * 矩形左上角 X 坐标
     */
    x: number = 0;

    /**
     * 矩形左上角 Y 坐标
     */
    y: number = 0;

    /**
     * 矩形宽度
     */
    width: number = 0;

    /**
     * 矩形高度
     */
    height: number = 0;
}

class Rect extends Combine(RectShape, BaseStyle) { }

export {
    Rect,
}