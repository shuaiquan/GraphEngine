import { Entity2D } from "../entity-2d";
import { Group } from "../group";

/**
 * 模型渲染树，组织所有可被渲染的模型实体
 */
class RenderTree extends Group {
    /**
     * 遍历渲染树上的全部模型实体
     * @param cb 模型实体处理函数
     */
    deepTraverse(cb: (entity: Entity2D) => void) {
        const entities = this.flattenTree();
        entities.forEach(cb);
    }

    /**
     * 获取渲染树上的全部模型实体
     * @returns 按照渲染顺序拍平的实体数组 Entity2D[]
     */
    flattenTree() {
        const children = this.sortByZIndex(this.filterByVisible(this.children));
        return children.reduce((entities: Entity2D[], child) => this.flattenRecursively(child, entities), []);
    }

    /**
     * 递归地拍平渲染树的每一层级
     * @param entity 
     * @returns 按照渲染顺序拍平的实体数组 Entity2D[]
     * 
     * @todo 几何遮挡导致不可见是否合适在这里处理
     */
    private flattenRecursively(entity: Entity2D, entities: Entity2D[] = []) {
        // step 1 首先将自己放入数组
        entities.push(entity);
        // step 2 递归地处理自己的子实体
        if (entity instanceof Group) {
            // 将可见子实体按照 zIndex 从小到大排序
            const children = this.sortByZIndex(this.filterByVisible(entity.children));
            // 深度优先，先处理 zIndex 小的子树
            children.forEach(child => this.flattenRecursively(child, entities));
        }
        return entities;
    }

    /**
     * 将实体按照 zIndex 的从小到大排列
     */
    private sortByZIndex(children: Entity2D[]) {
        return [...children].sort((a, b) => a.zIndex - b.zIndex);
    }

    /**
     * 过滤出 visible 为 true 的实体
     */
    private filterByVisible(children: Entity2D[]) {
        return children.filter(child => child.visible);
    }
}

export {
    RenderTree,
}