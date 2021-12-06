import { Vector2 } from "@s7n/math";

export interface CoordinateSystemOptions {
    /**
     * 坐标系原点所处位置
     * 
     * @default (0, 0)
     */
    origin?: Vector2;
    /**
     * 坐标系是否可拖拽
     */
    draggable?: boolean;
    /**
     * 坐标系拖拽后触发的回调函数
     */
    afterDragCallBack?: () => void;
    /**
     * 坐标系的缩放比例
     * 
     * @default 1
     * 
     * @description 缩放比例定义为：画布坐标/场景坐标。例如：画布呈现了原始 2 倍的场景，则 scale = 1/2  =  0.5
     */
    scale?: number;
    /**
     * 坐标系是否可缩放
     */
    scalable?: boolean;
    /**
     * 坐标系缩放后触发的回调函数
     */
    afterScaleCallBack?: () => void;
}

export interface CoordinateSystemInitOption {
    /**
     * 画布的物理宽度
     */
    width: number;
    /**
     * 画布的物理高度
     */
    height: number;
    /**
     * 场景显示的宽度范围
     */
    widthRange: number[];
    /**
     * 场景显示的高度范围
     */
    heightRange: number[];
}