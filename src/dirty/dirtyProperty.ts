import { Relation } from "./relation";
import { mergeOption, ObserverOption } from "./type";

/**
 * 绑定 Observer 相关代理
 * @param option Observer 配置
 * @param property 代理实例的原型
 * @param key 代理实例的目标属性
 */
function bindObserver(option: ObserverOption, property: Object, key: PropertyKey) {
    // step 1. 在原型上记录下 key 所对应的 ObserverOption
    const optionData = Relation.getOrCreateOption(property);
    optionData[key] = option;

    // step 2. 通过代理 getter & setter ，将对 key 的读写转发到 Observer 上
    Object.defineProperty(property, key, {
        get() {
            const observer = Relation.getOrCreateObserver(this);
            return observer.propertyGet(key);
        },
        set(value: unknown) {
            const observer = Relation.getOrCreateObserver(this);
            return observer.propertySet(key, value);
        }
    })
}

/**
 * 标记属性被追踪的装饰器
 * @param option 配置（可选）
 */
function dirtyProperty(option?: ObserverOption): Function;
/**
 * 标记属性被追踪的装饰器
 */
function dirtyProperty(property: Object, key: PropertyKey): void;
function dirtyProperty() {
    // 判断用户是否使用的装饰器工厂
    const isFactory = !arguments[1];

    // 获取完整的配置
    const option = isFactory ? mergeOption(arguments[1]) : mergeOption();

    if (isFactory) {
        return bindObserver.bind(null, option);
    }

    return bindObserver(option, arguments[0], arguments[1]);
}

export {
    dirtyProperty,
}