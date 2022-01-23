import { IVec2, Vector2, Utils } from "@s7n/math";
import { BaseShape } from "./BaseShape";
import { StyleOption } from "./style";

class Sector extends BaseShape {
    /**
     * 扇形的圆心坐标
     */
    private center: Vector2 = new Vector2(0, 0);

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

    constructor(center: Vector2, radius: number, startAngle: number, endAngle: number, counterclockwise: boolean = false, styleOption?: Partial<StyleOption>) {
        super(styleOption);
        this.center = center.clone();
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.counterclockwise = counterclockwise;
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
        const { center, radius, startAngle, endAngle, counterclockwise } = this;
        const path = new Path2D();
        const startPoint = this.getStartPoint();
        path.moveTo(center.x, center.y);
        path.lineTo(startPoint.x, startPoint.y);
        path.arc(center.x, center.y, radius, startAngle, endAngle, counterclockwise);
        path.lineTo(center.x, center.y);
        return path;
    }

    private getStartPoint() {
        return Utils.Circle.getPointByAngle(this.center, this.radius, this.startAngle, !this.counterclockwise);
    }
}

export { Sector };