/**
 * CanvasObserver 所支持的交互事件
 */
export enum CanvasEvent {
    /**
     * 左键按下事件
     */
    LPointerDown,
    /**
     * 左键抬起事件
     */
    LPointerUp,
    /**
     * 右键按下事件
     */
    RPointerDown,
    /**
     * 右键抬起事件
     */
    RPointerUp,
    /**
     * 点击事件
     */
    Click,
    /**
     * 右键点击事件
     */
    RightClick,
    /**
     * 双击事件
     */
    DBClick,
    /**
     * 在 Canvas 上的移动事件
     */
    Move,
    /**
     * 在 Canvas 上的 Wheel 事件
     */
    Wheel,
}

export type BaseEvent = PointerEvent | WheelEvent;
