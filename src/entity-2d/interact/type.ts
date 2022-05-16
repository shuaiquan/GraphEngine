/**
 * 实体交互行为
 */
export enum EntityInteract {
    /**
     * 设备左键按下事件
     */
    LPointerDown,
    /**
     * 设备右键按下事件
     */
    RPointerDown,
    /**
     * 设备左键抬起事件
     */
    LPointerUp,
    /**
     * 设备右键抬起事件
     */
    RPointerUp,
    /**
     * 点击事件
     */
    Click,
    /**
     * 右键的点击事件
     */
    RightClick,
    /**
     * 双击事件
     */
    DoubleClick,
    /**
     * 开始 Hover 实体时的事件
     */
    HoverIn,
    /**
     * Hover 实体的事件
     */
    Hover,
    /**
     * 结束 Hover 实体时的事件
     */
    HoverOut,
    /**
     * 开始拖拽实体时的事件
     */
    DragStart,
    /**
     * 拖拽实体的事件
     */
    Drag,
    /**
     * 结束拖拽实体的事件
     */
    DragEnd,
}
