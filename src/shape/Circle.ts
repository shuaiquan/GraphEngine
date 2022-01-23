import { IVec2, Vector2 } from "@s7n/math";
import { BaseShape } from "./BaseShape";
import { StyleOption } from './style';

class Circle extends BaseShape {
    /**
     * 圆心坐标
     */
    private center: Vector2 = new Vector2();

    /**
     * 圆半径
     */
    radius: number = 0;

    constructor(center: Vector2, radius: number, styleOption?: Partial<StyleOption>) {
        super(styleOption);
        this.center = center.clone();
        this.radius = radius;
    }

    /**
     * 设置圆心坐标
     */
    setCenter(center: Partial<IVec2>) {
        const x = center.x !== undefined ? center.x : this.center.x;
        const y = center.y !== undefined ? center.y : this.center.y;
        this.center = new Vector2(x, y);
        return this;
    }

    /**
     * 获取圆心坐标
     */
    getCenter() {
        return this.center.clone();
    }

    getPath() {
        const path = new Path2D();
        path.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
        return path;
    }
}

export { Circle };