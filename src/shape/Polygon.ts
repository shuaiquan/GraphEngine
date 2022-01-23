import { Vector2 } from "@s7n/math";
import { BaseShape } from "./BaseShape";
import { StyleOption } from "./style";

class Polygon extends BaseShape {
    /**
     * 路径数据
     */
    private pathData: Vector2[] = [];

    /**
     * 多边形是否闭合（默认：true）
     */
    closed: boolean = true;

    constructor(data: Vector2[], styleOption?: Partial<StyleOption>) {
        super(styleOption);
        this.pathData = data;
    }

    /**
     * 设置多边形的路径
     */
    setPathData(data: Vector2[]) {
        this.pathData = [...data];
        return this;
    }

    /**
     * 添加多边形的路径
     */
    addPathData(data: Vector2 | Vector2[]) {
        const pathData = Array.isArray(data) ? [...data] : [data];
        this.pathData.push(...pathData);
        return this;
    }

    /**
     * 获取多边形的路径
     */
    getPathData() {
        return [...this.pathData];
    }

    getPath() {
        const path = new Path2D();
        this.pathData.forEach((point, index) => {
            if (index === 0) {
                path.moveTo(point.x, point.y);
            } else {
                path.lineTo(point.x, point.y);
            }
        });
        return (this.closed && path.closePath(), path);
    }
}

export { Polygon };