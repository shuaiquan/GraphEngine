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
    private eventMap: Map<InteractiveType, EventObject[]> = new Map();

    private addEventListener(type: InteractiveType, listener: Listener, once: boolean) {
        if (!(listener instanceof Function)) {
            throw new Error('listener must be a function');
        }

        if (!this.eventMap.has(type)) {
            this.eventMap.set(type, []);
        }

        const listeners = this.eventMap.get(type);
        listeners.push(new EventObject(listener, once));
    }

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

    on(type: InteractiveType, listener: Listener) {
        this.addEventListener(type, listener, false);
        return this;
    }

    once(type: InteractiveType, listener: Listener) {
        this.addEventListener(type, listener, true);
        return this;
    }

    off(type: InteractiveType, listener: Listener) {
        this.removeEventListener(type, listener);
    }

    offAll(type: InteractiveType) {
        this.removeEventListener(type);
    }

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