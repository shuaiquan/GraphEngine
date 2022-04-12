/**
 * 渲染器配置
 */
export class RendererOption {
    /**
     * 合并渲染器配置
     * @param option 指定的渲染配置
     */
    static mergeOption(option: Partial<RendererOption> = {}): RendererOption {
        return Object.assign(new RendererOption(), option);
    }

    /**
     * 是否开启自动渲染
     * 默认: false
     */
    autoRender: boolean = false;
}
