import { $OBSERVER, $OPTION } from "./const";
import { Observer } from './observer';

/**
 * Observer 配置
 */
export interface ObserverOption {
    deep: boolean;
}

/**
 * 被观察实例的配置数据
 */
export type ObserverOptionData = Record<PropertyKey, ObserverOption>


/**
 * 被观察的实例类型
 */
export type ObserverTarget = Object & {
    [$OBSERVER]?: Observer;
}

/**
 * 被观察的原型类型
 */
export type OptionPrototype = Object & {
    [$OPTION]?: ObserverOptionData;
}

const DEFAULT_OPTION: ObserverOption = {
    deep: true,
};

/**
 * 获取完整 Option 配置
 * @param option 用户传入的 Option 配置
 */
export function mergeOption(option: Partial<ObserverOption> = {}): ObserverOption {
    return Object.assign({}, DEFAULT_OPTION, option);
}