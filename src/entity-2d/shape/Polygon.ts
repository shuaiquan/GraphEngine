import { Vector2 } from "@s7n/math";
import { BaseStyle, Combine } from "./base";

class PolygonShape {
    /**
     * 路径数据
     */
    path: Vector2[] = [];

    /**
     * 多边形是否闭合（默认：true）
     */
    closed: boolean = true;
}

class Polygon extends Combine(PolygonShape, BaseStyle) {
    /**
     * 添加多边形的路径
     */
    addPathPoints(data: Vector2 | Vector2[]) {
        const path = Array.isArray(data) ? [...data] : [data];
        this.shape.path.push(...path);
        return this;
    }
}

export {
    Polygon,
}