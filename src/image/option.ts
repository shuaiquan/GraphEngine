export interface ImageOption {
    /**
     * 图像左上角的 X 坐标
     * 
     * @default 0
     */
    x: number;
    /**
     * 图像左上角的 Y 坐标
     * 
     * @default 0
     */
    y: number;
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

const DEFAULT_IMAGE_OPTION = {
    x: 0,
    y: 0,
}

export function mergeImageOption(option: Partial<ImageOption>): ImageOption {
    return Object.assign({}, DEFAULT_IMAGE_OPTION, option);
}
