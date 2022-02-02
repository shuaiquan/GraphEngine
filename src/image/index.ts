import { Entity2D } from "../entity";
import { ImageOption, mergeImageOption } from "./option";

type ImageSrc = string | HTMLImageElement;

class Image extends Entity2D {
    /**
     * 图像的原始内容，可以是 string , 也可以是 HTMLImageElement
     */
    imageSrc: ImageSrc;

    /**
     * 图像的绘制配置
     */
    private option: ImageOption;

    // private isReady: boolean = false;

    /**
     * @param image 图像原始内容
     * @param option 图像绘制配置，可选
     */
    constructor(image: ImageSrc, option: Partial<ImageOption> = {}) {
        super();
        this.imageSrc = image;
        this.updateImageOption(option);
    }

    /**
     * 设置当前图像的配置
     * 
     * @param option 图像配置
     * @param reset 是否重围初始配置，再应用当前配置。默认: false
     */
    updateImageOption(option: Partial<ImageOption>, reset: boolean = false) {
        if (reset) {
            this.option = mergeImageOption(option)
        } else {
            this.option = Object.assign(this.option, option);
        }
        return this;
    }

    /**
     * 获取当前图像的配置
     */
    getImageOption() {
        return this.option;
    }
}

export {
    Image,
}
