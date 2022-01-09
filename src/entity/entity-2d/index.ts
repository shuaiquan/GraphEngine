import { EntityEmitter } from "../entity-emitter";
import { Transform } from "../transform";

class Entity2D extends EntityEmitter {
    /**
     * 模型实体的父节点
     */
    parent?: Entity2D;

    /**
     * 模型实体的变换
     */
    transform: Transform = new Transform();

    /**
     * Z 方向的层级，层级高的会覆盖层级低的实体
     * 
     * 默认: 0
     */
    zIndex: number = 0;

    /**
     * 实体是否可见。不可见的实体连同子树会一起被移除渲染
     * 
     * 默认：true
     */
    visible: boolean = true;

    /**
     * 获取模型实体的局部坐标系变换
     * @returns 
     */
    getLocalMatrix() {
        return this.transform.getMatrix();
    }

    /**
     * 获取模型实体的全局坐标变换
     * @returns 
     */
    getWorldMatrix() {
        let matrix = this.getLocalMatrix();
        let parent = this.parent;
        while (parent) {
            matrix = parent.getLocalMatrix().preMultiply(matrix);
            parent = parent.parent;
        }
        return matrix;
    }
}

export {
    Entity2D
}