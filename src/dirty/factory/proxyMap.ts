import { markDirty } from "../dirtyTag";

/**
 * 需要代理 Map 方法
 */
const FuncNames = ['set', 'delete', 'clear'] as const;

/**
 * 可代理的 Map 方法类型
 */
type FuncName = typeof FuncNames[number];

/**
 * 在 Map 对象上代理原有的方法
 * @param origin 原 Map 对象
 * @param name 要代理的方法名称
 */
function proxyFunc<K, V>(origin: Map<K, V>, name: FuncName) {
    Object.defineProperty(origin, name, {
        enumerable: false,
        writable: false,
        configurable: false,
        value: function () {
            markDirty(true);
            return Map.prototype[name].apply(this, arguments);
        }
    });
}

/**
 * 代理 Map 会对原数据产生变更的方法
 * @param origin 原 Map 对象
 */
function proxyMapFunc<K, V>(origin: Map<K, V>) {
    return FuncNames.reduce((map, name) => {
        proxyFunc(map, name);
        return map;
    }, origin);
}

/**
 * 代理目标 Map 对象
 * @param origin 目标 Map 对象
 */
export function proxyMap<K, V>(origin: Map<K, V>) {
    // 这里的 Proxy 没有实际的作用，仅为和其他类型保持结构一致
    return new Proxy(proxyMapFunc(origin), {});
}
