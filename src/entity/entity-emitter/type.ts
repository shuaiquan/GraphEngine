import { InteractionEvent } from "../../listener";

/**
 * 监听函数的格式
 */
export type Listener = (event: InteractionEvent) => void;

/**
 * 监听数据
 */
export class ListenerData {
    /**
     * 回调函数
     */
    fn: Listener;
    /**
     * 是否是一次性的
     */
    once: boolean;

    constructor(fn: Listener, once: boolean) {
        this.fn = fn;
        this.once = once;
    }
}