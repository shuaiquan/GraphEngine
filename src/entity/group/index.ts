import { remove } from "../../common";
import { Entity2D } from "../entity-2d";

/**
 * 承载了 children 能力
 */
class Group extends Entity2D {
    public children: Entity2D[] = [];

    addChild(child: Entity2D | Entity2D[]) {
        const children = Array.isArray(child) ? child : [child];
        this.children.push(...children);
    }

    removeChild(child: Entity2D | Entity2D[]) {
        remove(this.children, child);
    }
}

export {
    Group,
}