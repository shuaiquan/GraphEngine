import { markDirty } from "../dirtyTag";
import { proxyArray } from "./proxyArray";
import { proxyMap } from "./proxyMap";
import { proxySet } from "./proxySet";

abstract class ObserverFactory {
    private static object(origin: Object) {
        // step 1. 递归处理数据的每一项
        Object.keys(origin).forEach(key => {
            const proxyValue = this.observe((origin as any)[key]);
            (origin as any)[key] = proxyValue;
        });
        //. step 2. 代理当前目标
        return new Proxy(origin, {
            set(target: Object, key: PropertyKey, value: any) {
                markDirty(true);
                return Reflect.set(target, key, value);
            }
        });
    }

    private static array<T>(target: Array<T>) {
        // step 1. 递归处理数据的每一项
        target.forEach((value, index) => {
            const proxyValue = this.observe(value);
            target[index] = proxyValue;
        });
        //. step 2. 代理当前目标
        return proxyArray(target);
    }

    private static map<K, V>(target: Map<K, V>) {
        // step 1. 递归处理数据的每一项
        target.forEach((value, key) => {
            const proxyValue = this.observe(value);
            target.set(key, proxyValue);
        });
        //. step 2. 代理当前目标
        return proxyMap(target);
    }

    private static set<T>(target: Set<T>) {
        // step 1. 递归处理数据的每一项
        const set: Set<T> = new Set();
        target.forEach((value) => set.add(value));
        //. step 2. 代理当前目标
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