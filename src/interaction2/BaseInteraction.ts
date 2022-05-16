import { Vector2 } from "@s7n/math";
import { BaseListener, CanvasEvent, EventCoorType, getCoorFromEvent } from "../canvas-observer";
import { Entity2D, InteractEvent, RenderTree } from "../entity-2d";

abstract class BaseInteraction extends BaseListener {
    /**
     * 渲染树
     */
    protected renderTree: RenderTree;

    /**
     * 将 Canvas 转换为 InteractEvent
     */
    protected switchEvent(event: CanvasEvent, originalEntity: Entity2D) {
        // step 1. 转换为 InteractEvent
        const iEvent = new InteractEvent(event);

        // step 2. 设置 canvasPoint
        const { x, y } = getCoorFromEvent(event, EventCoorType.Offset);
        iEvent.canvasPoint = new Vector2(x, y);

        // step 2. 绑定场景信息到 InteractEvent 上
        const matrix = this.renderTree.transform.localMatrix.invert();      // 获取 renderTree 的变换逆矩阵
        // 设置 event 上的场景坐标
        iEvent.scenePoint = iEvent.canvasPoint.applyMatrix3(matrix);

        // step 3. 绑定 originalEntity
        iEvent.originalEntity = originalEntity;

        return iEvent;
    }

    /**
     * 绑定 InteractEvent 上的 currentEntity 和 localPoint
     */
    protected iEventBindEntity(event: InteractEvent, entity: Entity2D, point: Vector2) {
        // 为每个 currentEntity 复制一个新的 InteractEvent
        const iEvent = InteractEvent.clone(event);

        iEvent.currentEntity = entity;
        iEvent.localPoint = point;
        return iEvent;
    }
}

export {
    BaseInteraction
}
