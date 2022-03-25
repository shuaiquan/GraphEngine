import { dirtyProperty } from "../../dirty";
import { Entity2D, EntityType } from "../core/Entity2D";
import { ImageStyle } from "./style";

type ImageSrc = string | HTMLImageElement;

class Image extends Entity2D {
    protected _entityType: EntityType = EntityType.ImageEntity;

    /**
     * 图像的原始内容，可以是 string , 也可以是 HTMLImageElement
     */
    @dirtyProperty imageSrc: ImageSrc;

    /**
     * 图像的样式
     */
    @dirtyProperty style: ImageStyle;

    // private isReady: boolean = false;

    /**
     * @param image 图像原始内容
     * @param style 图像样式，可选
     */
    constructor(image: ImageSrc, style: Partial<ImageStyle> = {}) {
        super();
        this.imageSrc = image;
        this.updateImageOption(style, true);
    }

    /**
     * 设置当前图像样式
     * 
     * @param style 图像样式
     * @param reset 是否重围初始样式，再应用当前样式。默认: false
     */
    updateImageOption(style: Partial<ImageStyle>, reset: boolean = false) {
        if (reset) {
            this.style = ImageStyle.mergeStyle(style)
        } else {
            this.style = Object.assign(this.style, style);
        }
        return this;
    }
}

export {
    Image,
}
