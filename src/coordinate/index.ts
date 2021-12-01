import { Vector2 } from "@s7n/math";
import { CoordinateSystemOptions } from "./type";

const DEFAULT_OPTION: CoordinateSystemOptions = {
    origin: new Vector2(0, 0),
    draggable: true,
    scale: 1,
    scalable: true,
}

class CoordinateSystem {
    /**
     * 画布对象
     */
    private canvas: HTMLCanvasElement;

    /**
     * 坐标系的原点
     * 
     * @description 虚拟的场景坐标系原点在物理画布上的位置（可能在画布外）
     */
    private origin: Vector2;

    /**
     * 坐标系的缩放
     */
    private scale: number;

    /**
     * 坐标系是否可拖拽
     */
    private draggable: boolean;

    /**
     * 坐标系是否可缩放
     */
    private scalable: boolean;

    /**
     * 坐标系拖拽后触发的回调函数
     */
    private afterDragCallBack?: () => void;

    /**
     * 坐标系缩放后触发的回调函数
     */
    private afterScaleCallBack?: () => void;

    constructor(canvas: HTMLCanvasElement, options?: CoordinateSystemOptions) {
        this.canvas = canvas;

        const { origin, draggable, afterDragCallBack, scale, scalable, afterScaleCallBack } = Object.assign({}, DEFAULT_OPTION, options);
        this.origin = origin.clone();
        this.scale = scale;
        this.draggable = draggable;
        this.scalable = scalable;
        this.afterDragCallBack = afterDragCallBack;
        this.afterScaleCallBack = afterScaleCallBack;
    }

    /**
     * 将画布上的物理坐标转化为对应的场景坐标
     * @param point 画布上的物理坐标
     */
    switchCanvasToScene(point: Vector2) {
        const { origin, scale } = this;
        return origin.add(point.sub(origin).divide(scale));
    }

    /**
     * 将场景坐标转化为画布上的物理坐标
     * @param point 场景坐标 
     */
    switchSceneToCanvas(point: Vector2) {
        const { origin, scale } = this;
        return origin.add(point.sub(origin).multiply(scale));
    }
}

export {
    CoordinateSystem,
}
