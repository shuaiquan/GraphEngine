import { EntityEmitter } from "./EntityEmitter";
import { Transform2D } from "./Transform2D";

/**
 * 表示一个 2D 下的 Entity 实体类
 */
class Entity2D extends EntityEmitter {
    /**
     * 表示当前实体的父实体
     * 
     * 当实体被添加到集合 Group 下时，Group 会被作为当前实体的父实体
     */
    private _parent?: Entity2D;

    /**
     * 模型实体的变换
     */
    transform: Transform2D = new Transform2D(this);

    /**
     * 实体是否可见。不可见的实体连同子树会一起被移除渲染
     * 
     * 默认：true
     */
    visible: boolean = true;

    /**
     * Z 方向的层级。渲染时层级高的会覆盖层级低的实体
     * 
     * 默认: 0
     */
    zIndex: number = 0;

    /**
     * 绑定当前实体的父实体
     * @param parent 父实体
     */
    bindParent(parent?: Entity2D) {
        this._parent = parent;
    }

    /**
     * 获取当前实体的父实体
     */
    getParent() {
        return this._parent;
    }
}

export {
    Entity2D
}