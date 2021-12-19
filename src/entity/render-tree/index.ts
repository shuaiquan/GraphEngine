import { Group } from "../group";

/**
 * 模型渲染树，组织所有可被渲染的模型实体
 */
class RenderTree extends Group {
    // /**
    //  * 遍历模型树上的所有模型
    //  * 
    //  * @todo 不可见等模型会在这里被晒出
    //  * @todo 几何遮挡导致不可见是否合适在这里处理
    //  */
    // traverse(cb: (entity: Entity2D) => void) {
    //     const entities = [...this.children];

    //     for (let i = 0; i < entities.length; i++) {
    //         // todo
    //     }
    // }

    /**
     * 获取渲染树上的全部模型
     */
    getAllEntities() {
        const entities = [...this.children];

        for (let i = 0; i < entities.length; i++) {
            // todo 同级模型要按照 z 方向的顺序从小到大
            const entity = entities[i];
            if (entity instanceof Group) {
                // todo 剔除不可见模型
                entities.push(...entity.children);
            }
        }

        return entities;
    }
}

export {
    RenderTree,
}