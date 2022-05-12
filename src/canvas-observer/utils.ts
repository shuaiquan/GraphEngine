/**
 * 检测设备是否支持 PointerEvent 接口
 */
export function isSupportPointerEvent() {
    return self.PointerEvent;
}

/**
 * 检测鼠标按下的是否是左键
 * 
 * @link https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
 */
export function isLeftButton(event: MouseEvent) {
    /**
     * 通常：0 为左键；1 为滚轮；2 为右键
     */
    return event.button === 0;
}

/**
 * PointerEvent 事件中不同的坐标类型
 * 
 * @link https://developer.mozilla.org/en-US/docs/Web/CSS/CSSOM_View/Coordinate_systems
 */
export enum EventCoorType {
    /**
     * screenX & screenY
     * 
     * @description the top-left corner of the user's entire screen space
     */
    Screen,
    /**
     * pageX & pageY
     * 
     * @description the top-left corner of the entire Document (相对于整个 Document 文档的位置，受 scroll 影响)
     */
    Page,
    /**
     * clientX & clientY
     * 
     * @description the top-left corner of the viewport (相对于视口的坐标，不受 scroll 影响)
     * 
     * Viewport: 
     *  1. 通常页面就是浏览器页面区域的左上角
     *  2. iframe 就是承载 iframe 的左上角
     */
    Client,
    /**
     * offsetX & offsetY
     * 
     * @description top-left corner of the node to which the event has been delivered (相对于触发事件节点的左上角)
     */
    Offset,
}

/**
 * 获取 PointEvent 中的不同类型坐标
 * @param event PointerEvent
 * @param type 事件的中何种坐标：Screen、Client、Page、Offset
 */
export function getCoorFromEvent(event: PointerEvent | WheelEvent, type: EventCoorType = EventCoorType.Offset) {
    switch (type) {
        case EventCoorType.Screen: {
            const { screenX: x, screenY: y } = event;
            return { x, y };
        }
        case EventCoorType.Page: {
            const { pageX: x, pageY: y } = event;
            return { x, y };
        }
        case EventCoorType.Client: {
            const { clientX: x, clientY: y } = event;
            return { x, y };
        }
        case EventCoorType.Offset:
        default: {
            const { offsetX: x, offsetY: y } = event;
            return { x, y };
        }
    }
}
