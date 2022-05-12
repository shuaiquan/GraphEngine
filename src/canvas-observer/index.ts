import { IVec2 } from "@s7n/math";
import { BaseEvent, CanvasEvent } from "./type";
import { EventCoorType, getCoorFromEvent, isLeftButton, isSupportPointerEvent } from "./utils";


/**
 * Canvas 基础事件的监听
 */
class CanvasObserver {
    /**
     * 注册监听事件的目标元素
     */
    private canvas: HTMLCanvasElement;


    /**
     * 当前 canvas 的 boundingClientRect 数据的缓存
     */
    private boundingBox: number[] = [];

    /**
     * 鼠标是否处于按压状态
     */
    private isPressing: boolean = false;

    /**
     * 最后一个在 Canvas 区域内的 Pointer 事件
     * 
     * @description 应对 move 事件可能会把鼠标移出 canvas 区域时的情况
     */
    private lastEventInArea: PointerEvent;

    /**
     * 鼠标按下(pointerDown)的位置坐标
     */
    private downPoint: IVec2 = { x: 0, y: 0 };

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.addEventListeners(this.canvas);
    }

    /**
     * 销毁 Observer ,会移除全部的监听事件
     */
    dispose() {
        this.removeEventListeners(this.canvas);
        this.canvas = null;
    }

    // /**
    //  * 注册事件监听的交互器
    //  * @param interaction 
    //  */
    // registerInteraction(interaction: BaseInteraction | BaseInteraction[]) {
    //     const interactions = Array.isArray(interaction) ? interaction : [interaction];
    //     this.interactions.push(...interactions);
    // }

    // /**
    //  * 移除注册的事件监听交互器
    //  * @param interaction 
    //  */
    // unRegisterInteraction(interaction: BaseInteraction | BaseInteraction[]) {
    //     const interactions = Array.isArray(interaction) ? interaction : [interaction];
    //     interactions.forEach(i => {
    //         const index = this.interactions.indexOf(i);
    //         if (index !== -1) {
    //             this.interactions.splice(index, 1);
    //         }
    //     });
    // }

    /**
     * 触发 Observer 上的交互事件
     * @param type 
     * @param event 
     */
    private trigger(type: CanvasEvent, event: BaseEvent) {
        // TODO throttle
        // this.interactions.forEach(interaction => interaction.trigger(type, event));
    }

    /**
     * 注册 DOM 的监听事件
     */
    private addEventListeners(canvas: HTMLCanvasElement) {
        /**
         * 我们将使用 down + up 来模拟 click、rightclick 事件
         */
        if (isSupportPointerEvent()) {
            canvas.addEventListener('pointerdown', this.onPointerDown);
            canvas.addEventListener('pointermove', this.onPointerMove);
            // 优先注册 pointerup 事件到全局上，保证在 Canvas 外才释放鼠标按键的事件可以被捕获，避免错误处于 isPress 的状态
            const upTarget = self.document || canvas;
            upTarget.addEventListener('pointerup', this.onPointerUp);
        } else {
            canvas.addEventListener('mousedown', this.onPointerDown);
            canvas.addEventListener('mousemove', this.onPointerMove);
            // 优先注册 mouseup 事件到全局上，保证在 Canvas 外才释放鼠标按键的事件可以被捕获，避免错误处于 isPress 的状态
            const upTarget = self.document || canvas;
            upTarget.addEventListener('mouseup', this.onPointerUp);

        }
        /**
         * 这里选择监听 dblclick 而不使用 down + up 的方式来模拟 "双击事件" ，是因为：
         * 原生体系中 dblclick 之前会触发两次 click , 就算模拟的方式也无法避免，
         * 除非延迟第一次的 click , 等待指定时间内是否有第二次的 click 发生，而这个延迟我认为是无法接受的。
         * 所以，这里保持原生事件的监听，还可以保持用户设备双击间隔的一致性。
         */
        canvas.addEventListener('dblclick', this.onDblClick);
        canvas.addEventListener('wheel', this.onWheel);

        self.addEventListener('resize', this.onResize);
    }

    /**
     * 移除 DOM 的监听事件
     */
    private removeEventListeners(canvas: HTMLCanvasElement) {
        if (isSupportPointerEvent()) {
            canvas.removeEventListener('pointerdown', this.onPointerDown);
            canvas.removeEventListener('pointermove', this.onPointerMove);

            const upTarget = self.document || canvas;
            upTarget.removeEventListener('pointerup', this.onPointerUp);
        } else {
            canvas.removeEventListener('mousedown', this.onPointerDown);
            canvas.removeEventListener('mousemove', this.onPointerMove);

            const upTarget = self.document || canvas;
            upTarget.removeEventListener('mouseup', this.onPointerUp);

        }
        canvas.removeEventListener('dblclick', this.onDblClick);
        canvas.removeEventListener('wheel', this.onWheel);

        self.removeEventListener('resize', this.onResize);
    }

    /**
     * 根据原生 pointerdown 触发 LPointerDown 、 RPointerDown 交互事件
     */
    private onPointerDown = (event: PointerEvent) => {
        // step 1. 标记鼠标处于按下状态
        this.isPressing = true;

        // step 2. 根据左右键来触发 down 事件
        const isLeft = isLeftButton(event);
        if (isLeft) {
            this.trigger(CanvasEvent.LPointerDown, event);
        } else {
            this.trigger(CanvasEvent.RPointerDown, event);
        }

        // step 3. 记录 event 坐标，用于 pointerup 事件时判断
        this.downPoint = getCoorFromEvent(event, EventCoorType.Client);
    }

    /**
     * PointerMove 事件回调函数
     */
    private onPointerMove = (event: PointerEvent) => {
        // step 1. 触发 Move 事件
        this.trigger(CanvasEvent.Move, event);
        // step 2. 记录在 Canvas 中最新的 Move Event
        this.lastEventInArea = event;
    }

    /**
     * PointerUp 事件回调函数
     */
    private onPointerUp = (event: PointerEvent) => {
        // 必要条件：在先触发 Down 事件的情况下，触发 UP 事件才会识别
        if (this.isPressing) {
            // step 1. 用实际 event 进行 左键/右键 的判断
            const isLeft = isLeftButton(event);

            // step 2. 拿到修正在画布内的事件
            const fixedEvent = this.getEventInArea(event);

            // step 3. 判断相比 pointerdown ，设备是否发生移动
            const isMoved = this.isPointerMoved(fixedEvent);

            if (isLeft) {
                this.trigger(CanvasEvent.LPointerUp, fixedEvent);

                if (isMoved) {
                    this.trigger(CanvasEvent.Click, fixedEvent);
                }
            } else {
                this.trigger(CanvasEvent.RPointerUp, fixedEvent);

                if (isMoved) {
                    // TODO 右键的默认行为怎么办？
                    this.trigger(CanvasEvent.RightClick, fixedEvent);
                }
            }
        }
    }

    /**
     * DblClick 事件回调函数
     */
    private onDblClick = (event: PointerEvent) => {
        this.trigger(CanvasEvent.DBClick, event);
    }

    /**
     * Wheel 事件回调函数
     */
    private onWheel = (event: WheelEvent) => {
        this.trigger(CanvasEvent.Wheel, event);
    }

    /**
     * resize 事件的回调
     */
    private onResize() {
        // 清理掉画布的 BoundingBox 缓存
        this.boundingBox = [];
    }

    /**
     * 判断当前 Event 和 PointerDown 时，位置是否发生改变
     */
    private isPointerMoved(event: PointerEvent, tolerance: number = 4) {
        // 通过两次事件的位置差判断鼠标是否发生了移动
        const current = getCoorFromEvent(event, EventCoorType.Client);
        const x = current.x - this.downPoint.x;
        const y = current.y - this.downPoint.y;
        return x * x + y * y > tolerance * tolerance;
    }

    /**
     * 获取当前 canvas 的 boundingBox
     */
    private getCanvasBoundingBox() {
        // step 1. 优先读取缓存数据
        if (this.boundingBox.length === 4) {
            return this.boundingBox;
        }

        // step 2. 计算 canvas 的 boundingBox
        const { top, left, right, bottom } = this.canvas.getBoundingClientRect();
        // step 3. 缓存数据
        this.boundingBox = [top, left, right, bottom];

        return this.boundingBox;
    }

    /**
     * 用于在 pointerup 事件时，如果不在 canvas 的区域内，则返回在 canvas 内的最后一个坐标
     */
    private getEventInArea(event: PointerEvent) {
        // step 1. 获取 canvas 的 boundingBox
        const [top, left, right, bottom] = this.getCanvasBoundingBox();
        // step 2. 拿到事件的页面坐标 clientX clientY
        const { x, y } = getCoorFromEvent(event, EventCoorType.Client);

        // step 3. 判断 event 坐标是否在画布内
        const isInArea = x >= left && x <= right && y >= top && y <= bottom;
        return isInArea ? event : (this.lastEventInArea || event);
    }
}

export {
    CanvasObserver,
}