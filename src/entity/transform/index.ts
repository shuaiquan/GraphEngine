import { Matrix3, Vector2 } from "@s7n/math";
import { dirtyProperty } from "../../dirty";

/**
 * 变换数据
 * 
 * @todo 1. 支持 origin 的修改 ；2. 支持 skew 变换
 */
class Transform {
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
     * 默认: 0 (弧度)
     */
    @dirtyProperty rotate: number = 0;

    /**
     * 获取变换合成的矩阵
     * @returns Matrix3
     */
    getMatrix() {
        const { translate, scale, rotate } = this;

        return (new Matrix3()).applyRotate(rotate).applyScale(scale).applyTranslate(translate);
    }
}

export {
    Transform,
}
