import { BaseShape } from "../shape";
import { Text } from "../text";
import { Entity2D } from "./entity-2d";
import { Group } from "./group";
import { RenderTree } from "./render-tree";

/**
 * 实体模型处理工具函数
 */
abstract class EntityUtil {
    /**
     * 是否是模型实体
     */
    static isEntity2D(value: any): value is Entity2D {
        return value instanceof Entity2D;
    }

    /**
     * 是否是 Group
     */
    static isGroup(value: any): value is Group {
        return value instanceof Group;
    }

    /**
     * 是否是图形实体
     */
    static isShapeEntity(value: any): value is BaseShape {
        return value instanceof BaseShape;
    }

    /**
     * 是否是文本实体
     */
    static isTextEntity(value: any): value is Text {
        return value instanceof Text;
    }

    /**
     * 是否是 RenderTree
     */
    static isRenderTree(value: any): value is RenderTree {
        return value instanceof RenderTree;
    }

    /**
     * 将实体按照 zIndex 进行排序
     * @param children 需要排序的实体数组
     * @param minFirst 是否从小到大，默认：true (从小到大：true; 从大到小：false)
     * @returns 排序后的实体数组
     */
    static sortByZIndex(children: Entity2D[], minFirst: boolean = true) {
        if (minFirst) {
            return [...children].sort((a, b) => a.zIndex - b.zIndex);
        }
        // 按照 zIndex 从大到小，还需要注意的是 children 本身 zIndex 相同的情况下，后添加的会高于先添加的
        return [...children].reverse().sort((a, b) => b.zIndex - a.zIndex);
    }

    /**
     * 过滤出 visible 为 true 的实体
     * @param children 需要进行过滤的实体数组
     */
    static filterByVisible(children: Entity2D[]) {
        return children.filter(child => child.visible);
    }
}

export {
    EntityUtil,
};
