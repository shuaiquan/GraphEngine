import { markDirty } from ".";
import { ObserverFactory } from "./factory";
import { Relation } from "./relation";

/**
 * 被观察数据的处理结构
 */
class Observer {
    /**
     * key -> value 原始数据储存
     */
    private values: { [key: PropertyKey]: unknown } = {};

    /**
     * 获取属性的值
     * @param key 属性字段
     */
    propertyGet(key: PropertyKey) {
        return this.values[key];
    }

    /**
     * 设置属性的值
     * @param key 属性字段
     * @param value 属性值
     */
    propertySet(key: PropertyKey, value: unknown) {
        // step 1. 标记数据变脏，目前全部都跳过了数据一致的对比
        markDirty(true);
        // step 2. 根据配置判断是否需要将 value 进行深层代理
        const { deep } = Relation.getOptionByInstance(this, key);
        const proxyValue = deep ? ObserverFactory.observe(value) : value;
        //  step 3. 储存新值
        this.values[key] = proxyValue;
    }
}

export {
    Observer,
}
