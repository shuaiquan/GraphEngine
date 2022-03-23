export class ImageStyle {
    /**
     * 合并默认样式
     * @param style 图片样式
     * @returns ImageStyle
     */
    static mergeStyle(style: Partial<ImageStyle>): ImageStyle {
        return Object.assign(new ImageStyle(), style);
    }

    /**
     * 图像左上角的 X 坐标
     * 
     * @default 0
     */
    x: number = 0;
    /**
     * 图像左上角的 Y 坐标
     * 
     * @default 0
     */
    y: number = 0;
    /**
     * 图像的显示宽度
     * 
     * @default 图像的实际宽度
     */
    width?: number;
    /**
     * 图像的显示高度
     * 
     * @default 图像的实际高度
     */
    height?: number;
}
