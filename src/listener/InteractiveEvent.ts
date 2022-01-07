import { Vector2 } from "@s7n/math";
import { Entity2D } from "../entity";

class InteractiveEvent {
    static create(originalEvent: Event) {
        return new InteractiveEvent(originalEvent);
    }

    /**
     * 原始事件
     */
    originalEvent: Event;

    /**
     * 触发事件的最初实体模型
     */
    originalEntity: Entity2D;

    /**
     * 事件当前冒泡到的模型实体
     */
    currentEntity: Entity2D;

    /**
     * 阻止事件冒泡（默认：false）
     */
    stopPropagation: boolean = false;

    /**
     * 阻止事件的其他监听函数调用（默认：false）
     */
    stopImmediatePropagation: boolean = false;

    /**
     * 画布坐标
     */
    get canvasPoint() {
        return new Vector2();
    }

    /**
     * 场景中的全局坐标
     */
    get scenePoint() {
        return new Vector2();
    }

    /**
     * 父坐标系下的局部坐标
     */
    get localPoint() {
        return new Vector2();
    }

    constructor(originalEvent: Event) {
        this.originalEvent = originalEvent;
    }
}

export {
    InteractiveEvent,
}