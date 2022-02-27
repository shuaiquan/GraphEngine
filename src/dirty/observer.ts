class Observer {
    private values: { [key: PropertyKey]: unknown } = {};

    propertyGet(key: PropertyKey) {
        return this.values[key];
    }

    propertySet(key: PropertyKey, value: unknown) {
        // TODO 对 value 的处理
        this.values[key] = value;
    }
}

export {
    Observer,
}
