import { removeMatch } from '../common';
import { Listener } from './Listener';

class Ticker {
    /**
     * 监听队列
     */
    private listeners: Listener[] = [];

    /**
     * 动画调用 ID
     */
    private timer?: number;

    /**
     * 开启计时器
     */
    start() {
        this.tick();
    }

    /**
     * 停止计时器
     */
    stop() {
        if (this.timer) {
            cancelAnimationFrame(this.timer);
        }
    }

    /**
     * 注册定时监听函数
     * @param fn 
     * @param context 
     */
    add(fn: Function, context?: any) {
        this.listeners.push(Listener.create(fn, { context }));
    }

    /**
     * 移除定时监听函数
     */
    remove(fn: Function, context: any = null) {
        removeMatch(this.listeners, (listener) => listener.match(fn, context));
    }

    /**
     * 定时任务
     */
    private tick = () => {
        // step 1. 执行全部的监听函数
        this.execute();
        // step 2. 注册下一次的定时任务
        this.timer = requestAnimationFrame(this.tick);
    }

    /**
     * 执行注册的定时任务
     */
    private execute() {
        // 依次执行全部的监听函数
        this.listeners.forEach(listener => {
            listener.emit();
        });
    }
}

export {
    Ticker,
}
