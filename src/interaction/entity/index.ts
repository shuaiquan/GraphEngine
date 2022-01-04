import { Vector2 } from "@s7n/math";
import { Entity2D, EntityUtil, Group, RenderTree } from "../../entity";
import { BaseEvent, BaseInteraction, InteractiveType } from "../../listener";
import { getCoorFromEvent } from "../../listener/utils";
import { hitEntityTest } from "./hitEntityTest";

/**
 * TODO 考虑用户的使用来设计
 * 
 * 目标就是要将这些事件转发到 Entity 身上
 */
class EntityInteraction implements BaseInteraction {
    private renderTree: RenderTree;

    constructor(renderTree: RenderTree) {
        this.renderTree = renderTree;
    }

    triggerEvent(type: InteractiveType, payload: BaseEvent) {
        const { x, y } = getCoorFromEvent(payload);
        // 对渲染树惊醒碰撞检测，找到目标实体
        const entity = this.hitTest(this.renderTree, new Vector2(x, y));
        // 触发目标实体的对应事件
        entity.emit(type, payload);

        // TODO 事件在实体上的冒泡机制

        // switch (type) {
        //     case InteractiveType.Click: {
        //         break;
        //     }
        //     case InteractiveType.Hover: {
        //         break;
        //     }
        //     case InteractiveType.DragStart: {
        //         break;
        //     }
        //     case InteractiveType.DragMove: {
        //         break;
        //     }
        //     case InteractiveType.DragEnd: {
        //         break;
        //     }
        // }
    }

    private hitTest(entity: Entity2D, point: Vector2): Entity2D | undefined {
        // step 1 将 point 转化为局部坐标
        const matrix = entity.getLocalMatrix().invert();
        const localPoint = point.applyMatrix3(matrix);

        // step 2 检测当前实体是否被命中
        const hitted = hitEntityTest(entity, localPoint);

        if (hitted) {
            // step 3 被命中的情况，要优先考虑是不是命中的子孙代实体
            if (entity instanceof Group) {  // todo 将这些类型判断语义化到 EntityUtil 中实现
                const children = EntityUtil.sortByZIndex(entity.children, false);
                const hittedChild = children.find(child => this.hitTest(child, localPoint));

                if (hittedChild) {
                    return hittedChild;
                }
            }

            return entity;
        }
        return undefined;
    }
}

export {
    EntityInteraction
};