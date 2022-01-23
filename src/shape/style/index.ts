import { LineCap, LineJoin, StyleOption, DEFAULT_STYLE_OPTION } from './type';

/**
 * 合并样式配置得到完整的样式配置
 */
function mergeStyleOption(styleOption: Partial<StyleOption>): StyleOption {
    return Object.assign({}, DEFAULT_STYLE_OPTION, styleOption);
}

export {
    // 类型
    LineCap, LineJoin, StyleOption,
    // 数据
    DEFAULT_STYLE_OPTION,
    // 接口
    mergeStyleOption,
}
