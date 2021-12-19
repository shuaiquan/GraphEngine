import { Group } from "../entity";
import { StyleOption } from './style';

abstract class BaseShape extends Group {
    /**
     * 样式配置
     */
    protected styleOption: StyleOption = {};

    constructor(styleOption: StyleOption = {}) {
        super();
        this.setStyleOption(styleOption);
    }

    /**
     * 更新图形的 styleOption
     * 
     * @param styleOption 样式配置
     */
    setStyleOption(styleOption: StyleOption) {
        this.styleOption = styleOption;
    }

    /**
     * 获取图形的样式配置
     */
    getStyleOption() {
        return this.styleOption;
    }

    /**
     * 获取图形的 Path
     */
    abstract getPath(): Path2D;
}

export { BaseShape };