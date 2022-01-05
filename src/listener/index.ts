import { IVec2 } from "@s7n/math";
import { BaseEvent, BaseInteraction, InteractiveType, EventType } from "./type";
import { EventCoorType, getCoorFromEvent } from "./utils";

/**
 * DOM 事件监听器
 */
class DOMListener {
    /**
     * 注册监听事件的目标元素
     */
    private dom: HTMLElement;

    /**
     * 监听事件的交互器
     */
    private interactions: BaseInteraction[] = [];

    /**
     * 鼠标是否处于按压状态
     */
    private isPressing: boolean = false;

    /**
     * 鼠标是否处于拖动状态
     */
    private isDragging: boolean = false;

    /**
     * 鼠标按下(pointerDown)的位置坐标
     */
    private downCoor: IVec2 = { x: 0, y: 0 };

    /**
     * PointerUp 事件在目标外触时，上一个在区域内有效的事件
     */
    private lastValidEvent?: PointerEvent

    constructor(dom: HTMLElement) {
        this.dom = dom;
        this.addListener(this.dom);
    }

    /**
     * 注册事件监听的交互器
     * @param interaction 
     */
    registerInteraction(interaction: BaseInteraction | BaseInteraction[]) {
        const interactions = Array.isArray(interaction) ? interaction : [interaction];
        this.interactions.push(...interactions);
    }

    /**
     * 移除注册的事件监听交互器
     * @param interaction 
     */
    unRegisterInteraction(interaction: BaseInteraction | BaseInteraction[]) {
        const interactions = Array.isArray(interaction) ? interaction : [interaction];
        interactions.forEach(i => {
            const index = this.interactions.indexOf(i);
            if (index !== -1) {
                this.interactions.splice(index, 1);
            }
        });
    }

    /**
     * 销毁
     */
    dispose() {
        this.removeListener(this.dom);
        this.dom = null;
    }

    /**
     * 触发交互器上的交互事件
     * @param type 
     * @param event 
     */
    private trigger(type: InteractiveType, event: BaseEvent) {
        // TODO throttle
        this.interactions.forEach(interaction => {
            const payload = interaction.handleEventPayload ? interaction.handleEventPayload(event) : event;
            interaction.triggerEvent(type, payload);
        });
    }

    /**
     * 注册 DOM 的监听事件
     */
    private addListener(dom: HTMLElement) {
        dom.addEventListener('pointerdown', this.onPointerDown);
        dom.addEventListener('pointermove', this.onPointerMove);
        dom.addEventListener('dblclick', this.onDblClick);
        dom.addEventListener('contextmenu', this.onContextMene);
        dom.addEventListener('wheel', this.onWheel);
    }

    /**
     * 移除 DOM 的 监听事件
     */
    private removeListener(dom: HTMLElement) {
        dom.removeEventListener('pointerdown', this.onPointerDown);
        dom.removeEventListener('pointermove', this.onPointerMove);
        dom.removeEventListener('dblclick', this.onDblClick);
        dom.removeEventListener('contextmenu', this.onContextMene);
        dom.removeEventListener('wheel', this.onWheel);
    }

    /**
     * PointerDown 事件回调函数
     */
    private onPointerDown = (event: PointerEvent) => {
        // 注册 Up 事件
        document.addEventListener('pointerup', this.onPointerUp);
        // 标记鼠标处于按下状态
        this.isPressing = true;
        // 记录鼠标按下(pointerDown)的位置坐标
        this.downCoor = getCoorFromEvent(event, EventCoorType.Client);
        // 标记当前事件为有效事件
        this.lastValidEvent = event;
    }

    /**
     * PointerMove 事件回调函数
     */
    private onPointerMove = (event: PointerEvent) => {
        if (this.isPressing) {
            if (this.isDragging) {
                this.trigger(InteractiveType.DragMove, event);
            } else if (this.isMouseMoved(event)) {
                this.trigger(InteractiveType.DragStart, event);
                this.isDragging = true;
            }
        } else {
            this.trigger(InteractiveType.Hover, event);
        }
        // 标记当前事件为有效事件
        this.lastValidEvent = event;
    }

    /**
     * PointerUp 事件回调函数
     */
    private onPointerUp = (event: PointerEvent) => {
        // Up 事件可能触发在 DOM 外，找到在 DOM 内的最后有效位置
        const validEvent = this.getValidEventOnUp(event);

        if (this.isDragging) {
            this.trigger(InteractiveType.DragEnd, validEvent);
            this.isDragging = false;
        } else {
            this.trigger(InteractiveType.Click, validEvent);
        }
        // 关闭鼠标按下状态
        this.isPressing = false;
        // 取消事件监听
        document.removeEventListener('pointerup', this.onPointerUp);
    }

    /**
     * DblClick 事件回调函数
     */
    private onDblClick = (event: PointerEvent) => {
        this.trigger(InteractiveType.DBClick, event);
    }

    /**
     * ContextMenu 事件回调函数
     */
    private onContextMene = (event: PointerEvent) => {
        this.trigger(InteractiveType.RightClick, event);
    }

    /**
     * Wheel 事件回调函数
     */
    private onWheel = (event: WheelEvent) => {
        this.trigger(InteractiveType.Wheel, event);
    }

    /**
     * 判断当前 Event 和 PointerDown 时，位置是否发生改变
     * @param event 当前 Event
     * @param tolerance 误差值
     * @returns 
     */
    private isMouseMoved(event: PointerEvent, tolerance: number = 4) {
        const current = getCoorFromEvent(event, EventCoorType.Client);
        const x = current.x - this.downCoor.x;
        const y = current.y - this.downCoor.y;
        return x * x + y * y < tolerance * tolerance;
    }

    /**
     * 获取坐标在 DOM 范围内的有效事件
     */
    private getValidEventOnUp(event: PointerEvent) {
        const { top, left, right, bottom } = this.dom.getBoundingClientRect();
        const { x, y } = getCoorFromEvent(event, EventCoorType.Client);
        const inArea = x >= left && x <= right && y >= top && y <= bottom;

        return inArea ? event : this.lastValidEvent;
    }
}

export {
    DOMListener,
    InteractiveType,
    BaseEvent,
    BaseInteraction,
    EventType,
};
