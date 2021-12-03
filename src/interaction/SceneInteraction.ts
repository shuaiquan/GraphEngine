import { Vector2 } from "@s7n/math";
import { CoordinateSystem } from "../coordinate";
import { BaseEvent, BaseInteraction, InteractiveType } from "../listener";
import { EventCoorType, getCoorFromEvent } from "../listener/utils";

class SceneInteraction implements BaseInteraction {
    /**
     * 放大场景比例
     * 
     * @description 放大场景会导致画布上呈现范围更小的场景，C/S 是变大的
     */
    private static BIGGER_RATIO = 1.1;

    /**
     * 缩小场景比例
     * 
     * @description 缩小场景会导致画布上呈现范围更大的场景，C/S 是变小的
     */
    private static SMALLER_RATIO = 1 / 1.1;

    /**
     * 画布 DOM 对象
     */
    private canvas: HTMLCanvasElement

    /**
     * 坐标系
     */
    private coordinate: CoordinateSystem;

    /**
     * 每次拖动时的鼠标位置
     */
    private lastDragPos?: Vector2

    constructor(canvas: HTMLCanvasElement, coordinate: CoordinateSystem) {
        this.canvas = canvas;
        this.coordinate = coordinate;
    }

    triggerEvent(type: InteractiveType, payload: BaseEvent) {
        switch (type) {
            case InteractiveType.DragStart: {
                this.onDragStart(payload as PointerEvent);
                break;
            }
            case InteractiveType.DragMove: {
                this.onDragMove(payload as PointerEvent);
                break;
            }
            case InteractiveType.DragEnd: {
                this.onDragEnd(payload as PointerEvent);
                break;
            }
            case InteractiveType.Wheel: {
                this.onWheel(payload as WheelEvent);
                break;
            }
        }
    }

    private onDragStart(event: PointerEvent) {
        const { x, y } = getCoorFromEvent(event, EventCoorType.Offset);
        // 记录这一次的鼠标位置
        this.lastDragPos = new Vector2(x, y);
    }

    private onDragMove(event: PointerEvent) {
        if (this.lastDragPos) {
            const { x, y } = getCoorFromEvent(event, EventCoorType.Offset);
            const curDragPos = new Vector2(x, y);
            // 计算和上一次的偏移量
            const translate = curDragPos.sub(this.lastDragPos);
            // 移动坐标系
            this.coordinate.dragSystem(translate);
            // 更新拖动坐标
            this.lastDragPos = curDragPos;
        }
    }

    private onDragEnd(event: PointerEvent) {
        this.onDragMove(event);
        // 将拖动坐标设空
        this.lastDragPos = undefined;
    }

    /**
     * 处理画布上的 Wheel 事件
     * @param event WheelEvent
     */
    private onWheel(event: WheelEvent) {
        // 判断当前是该放大还是缩小
        const ratio = event.deltaY > 0 ? SceneInteraction.SMALLER_RATIO : SceneInteraction.BIGGER_RATIO;
        // 以当前坐标点为缩放中心
        const { x, y } = getCoorFromEvent(event, EventCoorType.Offset);
        // 缩放坐标系
        this.coordinate.scaleSystem(new Vector2(x, y), ratio);
    }
}

export {
    SceneInteraction
}