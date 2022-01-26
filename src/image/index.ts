import { Entity2D } from "../entity";
import { ImageOption, mergeImageOption } from "./option";

type ImageParam = string | HTMLImageElement;

class Image extends Entity2D {
    private image: ImageParam;

    private option: ImageOption;

    constructor(image: ImageParam, option: Partial<ImageOption> = {}) {
        super();
        this.image = image;
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
