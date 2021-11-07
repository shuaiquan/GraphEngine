import { remove } from "../common";

class Object2D {
    public children: Object2D[] = [];

    addChild(child: Object2D | Object2D[]) {
        const children = Array.isArray(child) ? child : [child];
        this.children.push(...children);
    }

    removeChild(child: Object2D | Object2D[]) {
        remove(this.children, child);
    }
}

export { Object2D }