/**
 * 交互管理器可以注册监听的交互类型（交互事件）
 */
export enum InteractiveType {
    /**
     * 点击事件
     */
    Click,
    /**
     * 双击事件
     */
    DBClick,
    /**
     * 右键事件
     */
    RightClick,
    /**
     * Hover 事件
     */
    Hover,
    /**
     * 拖动开始事件
     */
    DragStart,
    /**
     * 拖动事件
     */
    DragMove,
    /**
     * 拖动结束事件
     */
    DragEnd,
    /**
     * 滚轮事件
     */
    Wheel,
}

export type BaseEvent = PointerEvent | KeyboardEvent | WheelEvent;

export type EventType<T extends InteractiveType> = T extends InteractiveType.Wheel ? WheelEvent : PointerEvent;

export interface BaseInteraction<P = BaseEvent> {
    /**
     * 对 Event 的预处理，处理为 triggerEvent 接口所需要的 payload 类型
     */
    handleEventPayload?: (e: BaseEvent) => P;
    /**
     * 触发交互器的交互事件 
     */
    triggerEvent(type: InteractiveType, payload: P): void;
}
