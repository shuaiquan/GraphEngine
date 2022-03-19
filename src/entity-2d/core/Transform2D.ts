import { Matrix3, Vector2 } from "@s7n/math";
import { dirtyProperty } from "../../dirty";
import { Entity2D } from "./Entity2D";

/**
 * TODO 二维变换后续工作计划：
 * 
 * 1. 支持设置 transform-origin
 * 
 * 2. 支持 skew 不按预案
 */

/**
 * 二维变换数据结构
 */
class Transform2D {
    /**
     * 当前变换所属的实体
     */
    private _entity: Entity2D;

    /**
     * 平移
     * 
     * 默认: Vector2(0, 0)
     */
    @dirtyProperty translate: Vector2 = new Vector2(0, 0);

    /**
     * 缩放
     * 
     * 默认: Vector2(1, 1)
     */
    @dirtyProperty scale: Vector2 = new Vector2(1, 1);

    /**
     * 旋转
     * 
     * 默认: 0 (弧度表示)
     */
    @dirtyProperty rotate: number = 0;

    constructor(entity: Entity2D) {
        this._entity = entity;
    }

    /**
     * 相对于父坐标的变换矩阵
     */
    get localMatrix() {
        const { translate, scale, rotate } = this;

        return (new Matrix3()).applyRotate(rotate).applyScale(scale).applyTranslate(translate);
    }

    /**
     * 相对于全局坐标系的变换矩阵
     */
    get worldMatrix() {
        let matrix = this.localMatrix;
        let parent = this._entity.getParent();
        while (parent) {
            matrix = parent.transform.localMatrix.preMultiply(matrix);
            parent = parent.getParent();
        }
        return matrix;
    }
}

export {
    Transform2D,
}
