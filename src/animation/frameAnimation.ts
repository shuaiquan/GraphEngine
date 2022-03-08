import { generateUUID } from "../common";

/**
 * 逐帧动画
 */
abstract class FrameAnimation {
    private static cbMap: Map<string, Function> = new Map();

    /**
     * 增加逐帧动画回调
     * @param cb 
     * @returns 
     */
    static add(cb: Function) {
        const uuid = generateUUID();
        this.cbMap.set(uuid, cb);
        return uuid;
    }

    /**
     * 移除逐帧动画回调
     * @param id 
     * @returns 
     */
    static remove(id: string) {
        if (this.cbMap.has(id)) {
            this.cbMap.delete(id);
            return true;
        }
        return false;
    }

    /**
     * 执行全部逐帧动画
     * @param lastTime 上一帧的时间 
     * @param currentTime 当前时间
     */
    static execute(lastTime: number, currentTime: number) {
        this.cbMap.forEach(cb => cb(lastTime, currentTime));
    }
}

export {
    FrameAnimation,
}