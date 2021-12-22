import { InteractiveType } from "../../listener";

type Listener = (...arg: any[]) => void;

class EventObject {
    fn: Listener;
    once: boolean;

    constructor(fn: Listener, once: boolean) {
        this.fn = fn;
        this.once = once;
    }
}

/**
 * 模型实体事件管理器
 */
class EntityEmitter {
    /**
     * 交互事件对应处理函数
     */
    private eventMap: Map<InteractiveType, EventObject[]> = new Map();

    /**
     * 注册交互事件
     * @param type 交互类型
     * @param listener 回调函数
     * @param once 是否只触发一次（默认：false）
     */
    private addEventListener(type: InteractiveType, listener: Listener, once: boolean = false) {
        if (!(listener instanceof Function)) {
            throw new Error('listener must be a function');
        }

        if (!this.eventMap.has(type)) {
            this.eventMap.set(type, []);
        }

        const listeners = this.eventMap.get(type);
        listeners.push(new EventObject(listener, once));
    }

    /**
     * 移除交互事件
     * @param type 交互类型
     * @param listener 回调函数（可选，不传时会取消该交互事件下的所有回调函数）
     */
    private removeEventListener(type: InteractiveType, listener?: Listener) {
        if (!this.eventMap.has(type)) {
            return this;
        }

        if (!listener) {
            this.eventMap.delete(type);
            return this;
        }

        const listeners = this.eventMap.get(type);
        for (let i = 0; i < listeners.length;) {
            const obj = listeners[i];
            if (obj.fn === listener) {
                listeners.splice(i, 1);
            } else {
                i++;
            }
        }
    }

    /**
     * 注册交互事件监听
     * @param type 交互类型
     * @param listener 回调函数
     */
    on(type: InteractiveType, listener: Listener) {
        this.addEventListener(type, listener, false);
        return this;
    }

    /**
     * 注册一次性的交互事件监听
     * @param type 交互类型
     * @param listener 回调函数
     * @returns 
     */
    once(type: InteractiveType, listener: Listener) {
        this.addEventListener(type, listener, true);
        return this;
    }

    /**
     * 移除交互事件监听
     * @param type 交互类型
     * @param listener 回调函数
     */
    off(type: InteractiveType, listener: Listener) {
        this.removeEventListener(type, listener);
        return this;
    }

    /**
     * 移除该交互类型的全部监听事件
     * @param type 交互类型
     */
    offAll(type: InteractiveType) {
        this.removeEventListener(type);
        return this;
    }

    /**
     * 触发交互事件
     * @param type 交互类型
     */
    emit(type: InteractiveType) {
        if (!this.eventMap.has(type)) {
            return this;
        }

        const listeners = this.eventMap.get(type);
        for (let i = 0; i < listeners.length;) {
            const obj = listeners[i];

            obj.fn();

            if (obj.once) {
                listeners.splice(i, 1);
            } else {
                i++;
            }
        }
        return this;
    }
}

export {
    EntityEmitter
}