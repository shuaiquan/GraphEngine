import { BaseShape } from "./BaseShape";
import { StyleOption } from "./style";

class Rect extends BaseShape {
    /**
     * 矩形左上角 X 坐标
     */
    private x: number = 0;

    /**
     * 矩形左上角 Y 坐标
     */
    private y: number = 0;

    /**
     * 矩形宽度
     */
    private width: number = 0;

    /**
     * 矩形高度
     */
    private height: number = 0;

    constructor(x: number, y: number, width: number, height: number, styleOption?: StyleOption) {
        super(styleOption);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    /**
     * 设置矩形左上角 X 坐标
     */
    setX(x: number) {
        this.x = x;
        return this;
    }

    /**
     * 获取矩形左上角 X 坐标
     */
    getX() {
        return this.x;
    }

    /**
     * 设置矩形左上角 Y 坐标
     */
    setY(y: number) {
        this.y = y;
        return this;
    }

    /**
     * 获取矩形左上角 Y 坐标
     */
    getY() {
        return this.y;
    }

    /**
     * 设置宽度
     */
    setWidth(w: number) {
        this.width = w;
        return this;
    }

    /**
     * 获取宽度
     */
    getWidth() {
        return this.width;
    }

    /**
     * 设置高度
     */
    setHeight(h: number) {
        this.height = h;
        return this;
    }

    /**
     * 获取高度
     */
    getHeight() {
        return this.height;
    }

    getPath() {
        const { x, y, width, height } = this;
        const path = new Path2D();
        path.rect(x, y, width, height);
        return path;
    }
}

export { Rect };