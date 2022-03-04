import { remove } from "../../common";
import { dirtyProperty } from "../../dirty";
import { Entity2D } from "../entity-2d";

/**
 * 承载了 children 能力
 */
class Group extends Entity2D {
    @dirtyProperty public children: Entity2D[] = [];

    addChild(child: Entity2D | Entity2D[]) {
        const children = Array.isArray(child) ? child : [child];
        // 绑定 child 的 parent 
        children.forEach(child => child.parent = this);
        // 将 children 添加到自己的 children 中
        this.children.push(...children);
    }

    removeChild(child: Entity2D | Entity2D[]) {
        const children = Array.isArray(child) ? child : [child];
        // 移除 child 的 parent 
        children.forEach(child => child.parent = undefined);
        // 将 children 从自己的 children 中移除
        remove(this.children, child);
    }
}

export {
    Group,
}