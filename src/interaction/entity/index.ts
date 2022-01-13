import { Vector2 } from "@s7n/math";
import { Command } from "../../command";
import { Entity2D, EntityUtil } from "../../entity";
import { BaseInteraction, InteractionEvent, InteractionType } from "../../listener";
import { hitEntityTest } from "./hitEntityTest";

interface HittedPath {
    /**
     * 碰撞到模型实体
     */
    entity: Entity2D;
    /**
     * 局部碰撞坐标
     */
    point: Vector2;
}

/**
 * TODO 考虑用户的使用来设计
 * 
 * 目标就是要将这些事件转发到 Entity 身上
 */
class EntityInteraction extends BaseInteraction {
    /**
     * 指令集
     */
    private commands: Command[] = [];

    triggerEvent(type: InteractionType, event: InteractionEvent) {
        // 对渲染树进行碰撞检测，找到碰撞路径
        const hittedPath = this.hitTestPath(this.renderTree, event.canvasPoint);
        // 对碰撞路径上的每个节点触发事件（模拟冒泡）
        this.bubbleOnHittedPath(hittedPath, type, event);
    }

    /**
     * 注册指令
     * @param command 指令
     */
    registerCommand(command: Command | Command[]) {
        if (Array.isArray(command)) {
            this.commands.push(...command);
        } else {
            this.commands.push(command);
        }
    }

    // private hitTest(entity: Entity2D, point: Vector2): Entity2D | undefined {
    //     // step 1 将 point 转化为局部坐标
    //     const matrix = entity.getLocalMatrix().invert();
    //     const localPoint = point.applyMatrix3(matrix);

    //     // step 2 检测当前实体是否被命中
    //     const hitted = hitEntityTest(entity, localPoint);

    //     if (hitted) {
    //         // step 3 被命中的情况，要优先考虑是不是命中的子孙代实体
    //         if (EntityUtil.isGroup(entity)) {
    //             const children = EntityUtil.sortByZIndex(entity.children, false);
    //             const hittedChild = children.find(child => this.hitTest(child, localPoint));

    //             if (hittedChild) {
    //                 return hittedChild;
    //             }
    //         }

    //         return entity;
    //     }
    //     return undefined;
    // }

    /**
     * 碰撞检测
     * @param entity 需要进行检测的模型实体
     * @param point 鼠标位置点
     * @returns 从当前节点到触发节点的碰撞路径（中间节点没有碰撞到的，不会出现在路径中）
     */
    private hitTestPath(entity: Entity2D, point: Vector2) {
        // 碰撞路径
        const path: HittedPath[] = [];

        // step 1 将 point 转化为局部坐标
        const matrix = entity.getLocalMatrix().invert();
        const localPoint = point.applyMatrix3(matrix);

        // step 2 检测当前实体是否被命中
        const hitted = hitEntityTest(entity, localPoint);

        // step 3 如果被命中，需要添加到 path 中，用以事件冒泡
        if (hitted) {
            path.push({ entity, point: localPoint });
        }

        // step 4 如果存在子树，需要深度优先的找到从根到叶子的冒泡路径
        if (EntityUtil.isGroup(entity)) {
            // step 4.1 按照 zIndex 从大到小的顺序进行
            const children = EntityUtil.sortByZIndex(EntityUtil.filterByVisible(entity.children), false);    // TODO 要考虑过滤不可交互的状态

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
    private bubbleOnHittedPath(path: HittedPath[], type: InteractionType, event: InteractionEvent) {
        // 反转路径，得到从叶子到根
        const bubblePath = path.reverse();
        // 获取触发事件的最初实体
        const originalNode = bubblePath[0];
        // 在 event 上绑定最初实体
        this.bindOriginalEntity(event, originalNode.entity);

        // 在冒泡实体路径上，按照顺序触发事件
        for (let i = 0; i < bubblePath.length; i++) {
            const { entity, point } = bubblePath[i];

            // clone 一个新的 event, 给每个实体用
            const currentEvent = InteractionEvent.clone(event);
            this.bindCurrentEntity(currentEvent, entity, point);

            // 触发目标实体的对应事件
            entity.emit(type, currentEvent);

            // 触发指令执行
            this.commands.forEach(command => command.trigger(type, entity, event));

            // 如果被标记了 stopPropagation || stopImmediatePropagation 则停止冒泡
            if (currentEvent.stopPropagation || currentEvent.stopImmediatePropagation) {
                break;
            }
        }
    }
}

export {
    EntityInteraction
};