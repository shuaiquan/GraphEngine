import { remove } from "../../common";
import { dirtyProperty } from "../../dirty";
import { Entity2D } from "./Entity2D";

/**
 * 表示一个容器/集合，可以将多个实体组合在一起。给容器的变换会应用给所有的子实体
 */
class Group extends Entity2D {
    /**
     * 子实体
     */
    @dirtyProperty private _children: Entity2D[] = [];

    /**
     * 获取子实体
     */
    getChildren() {
        return this._children;
    }

    /**
     * 添加子实体
     */
    addChild(child: Entity2D | Entity2D[]) {
        const children = Array.isArray(child) ? child : [child];
        // 绑定 child 的 parent 
        children.forEach(child => child.bindParent(this));
        // 将 children 添加到自己的 children 中
        this._children.push(...children);
    }

    /**
     * 移除子实体
     */
    removeChild(child: Entity2D | Entity2D[]) {
        const children = Array.isArray(child) ? child : [child];
        // 移除 child 的 parent 
        children.forEach(child => child.bindParent(undefined));
        // 将 children 从自己的 children 中移除
        remove(this._children, child);
    }
}

export {
    Group,
}