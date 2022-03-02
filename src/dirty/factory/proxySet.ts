import { markDirty } from "../dirtyTag";

/**
 * 需要代理 Map 方法
 */
const FuncNames = ['add', 'delete', 'clear'] as const;

/**
 * 可代理的 Map 方法类型
 */
type FuncName = typeof FuncNames[number];

/**
 * 在 Set 对象上代理原有的方法
 * @param origin 原 Set 对象
 * @param name 要代理的方法名称
 */
function proxyFunc<T>(origin: Set<T>, name: FuncName) {
    Object.defineProperty(origin, name, {
        enumerable: false,
        writable: false,
        configurable: false,
        value: function () {
            markDirty(true);
            return Set.prototype[name].apply(this, arguments);
        }
    });
}

/**
 * 代理 Set 会对原数据产生变更的方法
 * @param origin 原 Set 对象
 */
function proxySetFunc<T>(origin: Set<T>) {
    return FuncNames.reduce((set, name) => {
        proxyFunc(set, name);
        return set;
    }, origin);
}

/**
 * 代理目标 Set 对象
 * @param origin 目标 Set 对象
 */
export function proxySet<T>(origin: Set<T>) {
    return new Proxy(proxySetFunc(origin), {});
}