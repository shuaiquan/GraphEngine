class Ticker {
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
     * 定时任务
     */
    private tick = () => {

        this.timer = requestAnimationFrame(this.tick);
    }

    /**
     * 执行注册的定时任务
     */
    private execute() {
        // TODO
    }
}

export {
    Ticker,
}
