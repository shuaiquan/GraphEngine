import { LineCap, LineJoin, CompleteStyleOption, StyleOption } from './type';
import { DEFAULT_STYLE_OPTION } from './const';

/**
 * 合并样式配置得到完整的样式配置
 */
function mergeStyleOption(styleOption: StyleOption = {}): CompleteStyleOption {
    return {
        ...DEFAULT_STYLE_OPTION,
        ...styleOption,
    };
}

export {
    // 类型
    LineCap, LineJoin, CompleteStyleOption, StyleOption,
    // 默认
    DEFAULT_STYLE_OPTION,
    // 接口
    mergeStyleOption,
}