interface ListenerOption {
    /**
     * 上下文
     */
    context: any;
    /**
     * 优先级
     */
    priority: number;
    /**
     * 是否仅执行一次
     */
    once: boolean;
}

class Listener {
    /**
     * 创建监听者
     * @param fn 回调函数
     * @param option 配置（可选）
     */
    static create(fn: Function, option?: Partial<ListenerOption>) {
        return new Listener(fn, option);
    }

    /**
     * 待执行的回调函数
     */
    private fn: Function;

    /**
     * 回调函数上下文
     */
    private _context: T;

    /**
     * 优先级
     */
    private _priority: number;

    /**
     * 是否仅执行一次
     */
    private _once: boolean;

    constructor(fn: Function, option?: Partial<ListenerOption>) {
        const { context = null, priority = 0, once = false } = option;

        this.fn = fn;
        this._context = context;
        this._priority = priority;
        this._once = once;
    }

    /**
     * 优先级
     */
    get priority() {
        return this._priority;
    }

    /**
     * 是否仅执行一次
     */
    get once() {
        return this._once;
    }

    /**
     * 触发 Listener 的执行
     * @param args 
     */
    emit(...args: any[]) {
        this.fn.apply(this._context, args);
    }

    /**
     * 匹配测试
     * @param fn 目标回调
     * @param context 回调上下文
     */
    match(fn: Function, context: any = null) {
        return this.fn === fn && this._context === context;
    }
}

export {
    Listener,
}