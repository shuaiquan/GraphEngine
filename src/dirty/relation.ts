import { $OBSERVER, $OPTION } from "./const";
import { mergeOption, ObserverTarget, OptionPrototype, ObserverOption, ObserverOptionData } from "./type";
import { Observer } from './observer';

/**
 * 用以协调和处理目标对象上 Observer 结构的关系
 * 
 * instance -------------------> prototype
 *    +                             +
 *    + [$OBSERVER]: Observer       + [$OPTION]: ObserverOptionData
 */
abstract class Relation {
    /**
     * 在目标 target 上增加一个不可枚举的属性 key
     * @param target 目标对象
     * @param key 属性名
     * @param value 属性值
     */
    private static addUnEnumerableProp(target: Object, key: PropertyKey, value: unknown) {
        Object.defineProperty(target, key, {
            enumerable: false,
            writable: true,
            configurable: true,
            value,
        });
    }

    /**
     * 从目标对象上获取 Observer 对象（如果不存在就新建一个）
     * @param target 目标对象
     * @returns Observer 对象
     */
    static getOrCreateObserver(target: ObserverTarget) {
        // 属性 enumerable 对 hasOwnProperty 接口没有影响
        if (!target.hasOwnProperty($OBSERVER)) {
            const observer = new Observer();
            this.addUnEnumerableProp(target, $OBSERVER, observer);
        }

        return target[$OBSERVER];
    }

    /**
     * 从目标原型上获取的 OptionData 对象（如果不存在就新建一个）
     * @param prototype 
     * @returns ObserverOptionData
     */
    static getOrCreateOption(prototype: OptionPrototype) {
        if (!prototype.hasOwnProperty($OBSERVER)) {
            this.addUnEnumerableProp(prototype, $OBSERVER, {});
        }

        return prototype[$OPTION];
    }

    /**
     * 通过实例对象获取 ObserverOption 配置
     * @param target 实例对象
     * @param key 目标字段
     * @returns ObserverOption
     */
    static getOptionByInstance(target: Object, key: PropertyKey): ObserverOption {
        const property = Object.getPrototypeOf(target);
        if (property) {
            const data = property[$OBSERVER] as ObserverOptionData;
            const option = data && data[key];
            if (option) {
                return option;
            }
        }

        // 如果没有找到配置，就返回默认的配置
        return mergeOption();
    }
}

export {
    Relation
}