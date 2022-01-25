import { IVec2, Vector2 } from "@s7n/math";
import { BaseShape } from "./BaseShape";
import { StyleOption } from "./style";

class Arc extends BaseShape {
    /**
     * 圆弧的圆心坐标
     */
    private center: Vector2 = new Vector2(0, 0);

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
}

export { Arc };