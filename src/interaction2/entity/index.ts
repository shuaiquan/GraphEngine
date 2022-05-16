import { Vector2 } from "@s7n/math";
import { EventName, CanvasEvent, getCoorFromEvent, EventCoorType } from "../../canvas-observer";
import { Entity2D, EntityInteract, EntityUtils, InteractEvent } from "../../entity-2d";
import { BaseInteraction } from "../BaseInteraction";
import { hitEntityTest, HittedNode } from "./hitEntityTest";

class EntityInteraction extends BaseInteraction {
    /**
     * 标记此时的设备是否处于按下的状态
     */
    private isPressing: boolean = false;

    /**
     * 标记在鼠标按下抬起的过程中，是否发生了 Drag
     */
    private isDragged: boolean = false;

    // private lastHoverEntities: Entity2D[] = [];

    // private stageHoverEntities: Entity2D[] = [];

    trigger(name: EventName, event: CanvasEvent): void {
        // step 1. 碰撞检测：找到碰撞路径上面的全部实体
        const { x, y } = getCoorFromEvent(event, EventCoorType.Offset);
        const hittedPath = this.hitTestPath(this.renderTree, new Vector2(x, y));

        if (hittedPath.length > 0) {
            // step 2. 事件冒泡：对碰撞路径上的每个节点触发事件
            this.bubbleOnHittedPath(hittedPath, name, event);
        }

    }

    /**
     * 碰撞检测
     * @param entity 需要进行检测的模型实体
     * @param point 鼠标位置点
     * @returns 从当前节点到触发节点的碰撞路径（中间节点没有碰撞到的，不会出现在路径中）
     */
    private hitTestPath(entity: Entity2D, point: Vector2) {
        // 碰撞路径
        const path: HittedNode[] = [];

        // step 1. 将 point 转化为局部坐标
        const matrix = entity.transform.localMatrix.invert();
        const localPoint = point.applyMatrix3(matrix);

        // step 2. 检测当前实体是否被命中
        const hitted = hitEntityTest(entity, localPoint);

        // step 3. 如果被命中，需要添加到 path 中，用以事件冒泡
        if (hitted) {
            // 同时缓存 localPoint 避免冒泡时重复计算
            path.push({ entity, point: localPoint });
        }

        // step 4 如果存在子树，需要深度优先的找到从根到叶子的冒泡路径
        if (EntityUtils.isGroup(entity)) {
            // step 4.1 按照 zIndex 从大到小的顺序进行
            const children = [...entity.getChildren()].sort((a, b) => a.zIndex - b.zIndex);

            /**
             * TODO 考虑过滤掉 不可见 和 不可交互 的实体
             */

            // step 4.2 找到碰撞到目标点的子树，就停止
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                const childPath = this.hitTestPath(child, localPoint);
                if (childPath.length > 0) {
                    path.push(...childPath);
                    break;
                }
            }
        }

        return path;
    }

    /**
     * 对碰撞路径上的每个节点触发事件（模拟冒泡）
     * @param path 碰撞路径
     * @param type 交互事件类型 InteractionType
     * @param event 交互事件对象 InteractionEvent
     */
    private bubbleOnHittedPath(path: HittedNode[], name: EventName, event: CanvasEvent) {
        // step 1. 得到触发事件的初始实体
        const length = path.length;
        // step 2. path 是从顶到叶的路径
        const originalEntity = path[length - 1].entity;

        // step 3. 转换 InteractEvent
        const baseEvent = this.switchEvent(event, originalEntity);

        // step 4. 按照从叶子到顶的顺序，让事件在实体上冒泡
        for (let i = length - 1; i >= 0; i++) {

            // step 4.1 每个实体触发事件，要在 InteractEvent 上绑定 entity
            const { entity, point } = path[i];
            const iEvent = this.iEventBindEntity(baseEvent, entity, point);

            // step 4.2 触发每个实体上的交互事件
            this.emitOnEntity(entity, name, iEvent);

            // TODO Command

            // 如果被标记了 stopPropagation || stopImmediatePropagation 则停止冒泡
            if (iEvent._isStopPropagation) {
                break;
            }
        }
    }

    private emitOnEntity(entity: Entity2D, name: EventName, event: InteractEvent) {
        switch (name) {
            case EventName.LPointerDown:
                this.onPointerDown(EntityInteract.LPointerDown, entity, event);
                break;
            case EventName.RPointerDown:
                this.onPointerDown(EntityInteract.RPointerDown, entity, event);
                break;
            case EventName.LPointerUp:
                this.onPointerUp(EntityInteract.LPointerUp, entity, event);
                break;
            case EventName.RPointerUp:
                this.onPointerUp(EntityInteract.RPointerUp, entity, event);
                break;
            case EventName.Click:
                entity.emit(EntityInteract.Click, event);
                break;
            case EventName.RightClick:
                entity.emit(EntityInteract.RightClick, event);
                break;
            case EventName.DBClick:
                entity.emit(EntityInteract.DoubleClick, event);
                break;
            case EventName.Move:

        }
    }

    /**
     * 处理 PointerDown 类型的交互
     */
    private onPointerDown(type: EntityInteract, entity: Entity2D, event: InteractEvent) {
        // step 1. 标记为 isPressing 的状态
        this.isPressing = true;
        // step 2. 触发 entity 事件
        entity.emit(type, event);
    }

    private onPointerUp(type: EntityInteract, entity: Entity2D, event: InteractEvent) {
        // step 1. 触发 pointerup 交互事件
        entity.emit(type, event);
        // step 2. 通过判断是否发生了 drag , 从而决定是否触发 dragEnd 事件
        if (this.isDragged) {
            entity.emit(EntityInteract.DragEnd, event);
            this.isDragged = false;
        }
        // step 3. 恢复标记的初始值
        this.isPressing = false;
    }

    private onMove(entity: Entity2D, event: InteractEvent) {
        // step 1. 通过 isPressing 区分 Hover 和 Drag 的交互
        if (this.isPressing) {
            // 处理 Drag 交互逻辑
            if (this.isDragged) {
                // step 2.1 如果 Drag 过了，则触发 drag 事件
                entity.emit(EntityInteract.Drag, event);
            } else {
                /**
                 * TODO dragStart 触发前是否判断 event 相比 pointerdown 是否发生移动，会更好一点
                 */
                // step 2.2 还没有开始 drag ，需要先触发 dragStart 事件
                entity.emit(EntityInteract.DragStart, event);
            }
        } else {
            // 处理 Hover 交互逻辑

            /**
             * TODO
             * 
             * 原生 mouseover mouseout 的表现为：
             * 1. 会冒泡，从低至顶
             * 2. 从 A -> B 先触发 A.out + 冒泡，在触发 B.over + 冒泡
             */

            // 判断之前是否 Hover 该实体目标
            // const isHovered = this.lastHoverEntities.includes(entity);
            // const type = isHovered ? EntityInteract.Hover : EntityInteract.HoverIn;
        }
    }
}

export {
    EntityInteraction
}