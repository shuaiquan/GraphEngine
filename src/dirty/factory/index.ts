import { proxyArray } from "./proxyArray";
import { proxyMap } from "./proxyMap";
import { proxySet } from "./proxySet";

abstract class ObserverFactory {
    private static object(origin: Object) {
        return new Proxy(origin, {
            set(target: Object, key: PropertyKey, value: any) {
                // TODO 标记 dirty
                return Reflect.set(target, key, value);
            }
        });
    }

    private static array<T>(target: Array<T>) {
        target.forEach((value, index) => {
            const proxyValue = this.observe(value);
            target[index] = proxyValue;
        });
        return proxyArray(target);
    }

    private static map<K, V>(target: Map<K, V>) {
        target.forEach((value, key) => {
            const proxyValue = this.observe(value);
            target.set(key, proxyValue);
        });
        return proxyMap(target);
    }

    private static set<T>(target: Set<T>) {
        const set: Set<T> = new Set();
        target.forEach((value) => set.add(value));
        return proxySet(set);
    }

    /**
     * 将目标对象处理为被追踪的对象
     * @param target 目标对象
     * @returns 
     */
    static observe(target: any) {
        if (typeof target === 'object' && target !== null) {
            return this.object(target);
        } else if (Array.isArray(target)) {
            return this.array(target);
        } else if (target instanceof Map) {
            return this.map(target);
        } else if (target instanceof Set) {
            return this.set(target);
        }
        return target;
    }
}

export {
    ObserverFactory
}