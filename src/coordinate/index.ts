import { Vector2 } from "@s7n/math";
import { CoordinateSystemInitOption, CoordinateSystemOptions } from "./type";

const DEFAULT_OPTION: CoordinateSystemOptions = {
    origin: new Vector2(0, 0),
    draggable: true,
    scale: 1,
    scalable: true,
}

class CoordinateSystem {
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

    constructor(options?: CoordinateSystemOptions) {
        const { origin, draggable, afterDragCallBack, scale, scalable, afterScaleCallBack } = Object.assign({}, DEFAULT_OPTION, options);
        this.origin = origin.clone();
        this.scale = scale;
        this.draggable = draggable;
        this.scalable = scalable;
        this.afterDragCallBack = afterDragCallBack;
        this.afterScaleCallBack = afterScaleCallBack;
    }

    /**
     * 通过画布尺寸和场景尺寸初始化坐标系
     * @param option 适配数据
     */
    init(option: CoordinateSystemInitOption) {
        const { width, height, widthRange, heightRange } = option;

        // 计算场景的缩放
        const scaleW = width / (Math.abs(widthRange[1] - widthRange[0]) || width);
        const scaleH = height / (Math.abs(heightRange[1] - heightRange[0]) || height);
        this.scale = Math.min(scaleW, scaleH);

        // 计算场景原点所处画布的位置
        const x = Math.min(widthRange[1], widthRange[0]);
        const y = Math.min(heightRange[1], heightRange[0]);
        this.origin = (new Vector2(-x, -y)).multiply(this.scale);

        return this;
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

    /**
     * 移动坐标系
     * @param translate 坐标系的偏移量
     */
    dragSystem(translate: Vector2) {
        if (this.draggable) {
            const { origin, afterDragCallBack } = this;

            this.origin = origin.add(translate);

            if (afterDragCallBack) {
                afterDragCallBack();
            }
        }
    }

    /**
     * 缩放坐标系
     * @param scaleOrigin 缩放坐标系的原点（缩放时，该位置的相对物理坐标是不变的）
     * @param ratio 缩放比例（例如 1.1 是在原有的基础上缩放 1.1 倍）
     */
    scaleSystem(scaleOrigin: Vector2, ratio: number) {
        if (this.scalable) {
            const { origin, afterScaleCallBack } = this;

            this.scale *= ratio;

            this.origin = scaleOrigin.add(origin.sub(scaleOrigin).multiply(ratio));

            if (afterScaleCallBack) {
                afterScaleCallBack();
            }
        }

    }
}

export {
    CoordinateSystem,
}
