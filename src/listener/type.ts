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

export interface BaseInteraction<E = BaseEvent> {
    /**
     * 对原始事件对象 event 进行处理
     */
    normalizeEvent(e: BaseEvent): E;
    /**
     * 出发交互器的交互事件 
     */
    triggerEvent(type: InteractiveType, e: E): void;
}
