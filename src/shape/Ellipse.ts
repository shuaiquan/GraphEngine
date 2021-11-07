import { IVec2, Vector2 } from "@s7n/math";
import { BaseShape } from "./BaseShape";
import { StyleOption } from "./style";

class Ellipse extends BaseShape {
    /**
     * 椭圆圆心
     */
    private center: Vector2 = new Vector2(0, 0);

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

    constructor(center: Vector2, radiusX: number, radiusY: number, rotation: number, styleOption?: StyleOption) {
        super(styleOption);
        this.center = center.clone();
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.rotation = rotation;
    }

    /**
     * 设置椭圆圆心
     */
    setCenter(center: Partial<IVec2>) {
        const x = center.x !== undefined ? center.x : this.center.x;
        const y = center.y !== undefined ? center.y : this.center.y;
        this.center = new Vector2(x, y);
        return this;
    }

    /**
     * 获取椭圆圆心
     */
    getCenter() {
        return this.center.clone();
    }

    getPath() {
        const { center, radiusX, radiusY, rotation } = this;
        const path = new Path2D();
        path.ellipse(center.x, center.y, radiusX, radiusY, rotation, 0, Math.PI * 2);
        return path;
    }
}

export { Ellipse };