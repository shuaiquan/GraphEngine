import { InteractionType, InteractionEvent } from "../../listener";
import { Listener, ListenerData } from './type';

/**
 * 模型实体事件管理器
 */
class EntityEmitter {
    /**
     * 交互事件对应处理函数
     */
    private eventMap: Map<InteractionType, ListenerData[]> = new Map();

    /**
     * 注册交互事件
     * @param type 交互类型
     * @param listener 回调函数
     * @param once 是否只触发一次（默认：false）
     */
    private addEventListener(type: InteractionType, listener: Listener, once: boolean = false) {
        if (!(listener instanceof Function)) {
            throw new Error('listener must be a function');
        }

        if (!this.eventMap.has(type)) {
            this.eventMap.set(type, []);
        }

        const listeners = this.eventMap.get(type);
        listeners.push(new ListenerData(listener, once));
    }

    /**
     * 移除交互事件
     * @param type 交互类型
     * @param listener 回调函数（可选，不传时会取消该交互事件下的所有回调函数）
     */
    private removeEventListener(type: InteractionType, listener?: Listener) {
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
    on(type: InteractionType, listener: Listener) {
        this.addEventListener(type, listener, false);
        return this;
    }

    /**
     * 注册一次性的交互事件监听
     * @param type 交互类型
     * @param listener 回调函数
     * @returns 
     */
    once(type: InteractionType, listener: Listener) {
        this.addEventListener(type, listener, true);
        return this;
    }

    /**
     * 移除交互事件监听
     * @param type 交互类型
     * @param listener 回调函数
     */
    off(type: InteractionType, listener: Listener) {
        this.removeEventListener(type, listener);
        return this;
    }

    /**
     * 移除该交互类型的全部监听事件
     * @param type 交互类型
     */
    offAll(type: InteractionType) {
        this.removeEventListener(type);
        return this;
    }

    /**
     * 触发交互事件
     * @param type 交互类型
     */
    emit(type: InteractionType, event: InteractionEvent) {
        if (!this.eventMap.has(type)) {
            return;
        }

        const listeners = this.eventMap.get(type);
        for (let i = 0; i < listeners.length;) {
            const obj = listeners[i];

            // 触发回调
            obj.fn(event);

            if (obj.once) {
                listeners.splice(i, 1);
            } else {
                i++;
            }

            // 如果被标记了 stopImmediatePropagation，要停止后续监听函数的调用
            if (event.stopImmediatePropagation) {
                break;
            }
        }
        return this;
    }
}

export {
    EntityEmitter,
}