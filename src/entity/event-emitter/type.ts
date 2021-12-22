import { InteractiveType, EventType } from "../../listener";

/**
 * 监听函数的格式
 */
export type Listener<T extends InteractiveType> = (event: EventType<T>) => void;

/**
 * 监听数据
 */
export class ListenerData {
    /**
     * 回调函数
     */
    fn: Listener<InteractiveType>;
    /**
     * 是否是一次性的
     */
    once: boolean;

    constructor(fn: Listener<InteractiveType>, once: boolean) {
        this.fn = fn;
        this.once = once;
    }
}