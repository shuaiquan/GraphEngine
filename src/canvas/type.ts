export interface CanvasOption {
    /** 
     * 用以渲染的 Canvas 画布，可选。
     */
    element?: string | HTMLCanvasElement;
    /**
     * 画布的宽度
     */
    width?: number;
    /**
     * 画布的高度
     */
    height?: number;
    /**
     * 场景所容纳的宽度范围
     * 
     * 默认：[0, width]
     * 
     * sceneWidthRange: 200 表示 [0, 200]
     * 
     * sceneWidthRange: [100, 200] 表示 [100, 200]
     */
    sceneWidthRange?: number | number[];
    /**
     * 场景所容纳的高度范围
     * 
     * 默认：[0, height]
     * 
     * sceneHeightRange: 200 表示 [0, 200]
     * 
     * sceneHeightRange: [100, 200] 表示 [100, 200]
     */
    sceneHeightRange?: number | number[];
    /**
     * 是否开启自动渲染
     */
    autoRender?: boolean;
}