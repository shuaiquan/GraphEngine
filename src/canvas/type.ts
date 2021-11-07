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
     * 是否开启自动渲染
     */
    autoRender?: boolean;
}