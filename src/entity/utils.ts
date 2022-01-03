import { Entity2D } from "./entity-2d";

/**
 * 实体模型处理工具函数
 */
abstract class EntityUtil {
    /**
     * 将实体按照 zIndex 进行排序
     * @param children 需要排序的实体数组
     * @param minFirst 是否从小到大，默认：true (从小到大：true; 从大到小：false)
     * @returns 排序后的实体数组
     */
    static sortByZIndex(children: Entity2D[], minFirst: boolean = true) {
        return [...children].sort((a, b) => minFirst ? a.zIndex - b.zIndex : b.zIndex - a.zIndex);
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
