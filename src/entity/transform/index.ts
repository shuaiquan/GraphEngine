import { Vector2 } from "@s7n/math";

/**
 * 变换数据
 * 
 * @todo 1. 支持 origin 的修改 ；2. 支持 skew 变换
 */
class Transform {
    /**
     * 平移
     * 
     * @default (0, 0)
     */
    translate: Vector2 = new Vector2(0, 0);

    /**
     * 缩放
     * 
     * @default (1, 1)
     */
    scale: Vector2 = new Vector2(1, 1);

    /**
     * 旋转
     * 
     * @default 0 (弧度)
     */
    rotate: number = 0;
}

export {
    Transform,
}
