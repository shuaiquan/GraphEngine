import { Vector2 } from "@s7n/math";
import { CanvasEvent } from "../../canvas-observer";
import { Entity2D } from "../core/Entity2D";

class InteractEvent {
    /**
     * 拷贝 InteractionEvent 的基本信息
     */
    static clone(event: InteractEvent) {
        const { originalEvent, originalEntity, canvasPoint, scenePoint, _isStopPropagation, _isStopImmediatePropagation } = event;

        const iEvent = new InteractEvent(originalEvent);
        iEvent.originalEntity = originalEntity;
        iEvent.canvasPoint = canvasPoint.clone();
        iEvent.scenePoint = scenePoint.clone();
        iEvent._isStopPropagation = _isStopPropagation;
        iEvent._isStopImmediatePropagation = _isStopImmediatePropagation;
        return iEvent;
    }

    /**
     * 原始 DOM 事件
     */
    originalEvent: CanvasEvent;

    /**
     * 触发事件的最初实体模型
     */
    originalEntity: Entity2D;

    /**
     * 事件当前冒泡到的模型实体
     */
    currentEntity: Entity2D;

    /**
     * 画布坐标
     */
    canvasPoint: Vector2;

    /**
     * 场景中的全局坐标
     */
    scenePoint: Vector2;

    /**
     * 局部坐标（当前实体坐标系下的坐标）
     */
    localPoint: Vector2;

    /**
     * 是否已调用 stopPropagation 阻止事件传播
     */
    _isStopPropagation: boolean = false;

    /**
     * 是否已调用 stopImmediatePropagation 阻止事件传播
     */
    _isStopImmediatePropagation: boolean = false;

    constructor(originalEvent: CanvasEvent) {
        this.originalEvent = originalEvent;
    }

    /**
     * 阻止事件继续向其他实体传播
     */
    stopPropagation() {
        this.originalEvent.stopImmediatePropagation
        this._isStopPropagation = true;
    }

    /**
     * 阻止事件传播（包括同一实体上的其他事件）
     */
    stopImmediatePropagation() {
        this._isStopPropagation = true;
        this._isStopImmediatePropagation = true;
    }
}

export {
    InteractEvent,
}
