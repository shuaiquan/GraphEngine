import { markDirty } from "../../dirty";
import { Entity2D } from "../../entity-2d";

/**
 * Canvas 渲染器基类
 */
abstract class BaseRenderer<T extends Entity2D> {
    abstract render(entity: T, context: CanvasRenderingContext2D): void;

    /**
     * 标记当前渲染器需要重新渲染
     */
    markDirty() {
        markDirty(true);
    }
}

export {
    BaseRenderer
}