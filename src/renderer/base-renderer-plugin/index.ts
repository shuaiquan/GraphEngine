/**
 * 渲染插件基类
 */
abstract class BaseRendererPlugin<Entity> {
    /**
     * 画布 DOM 节点
     */
    protected dom: HTMLCanvasElement;

    constructor(dom: HTMLCanvasElement) {
        this.dom = dom;
    }

    /**
     * 增加要渲染的实体
     * @param entity 目标实体
     */
    abstract addEntity(entity: Entity | Entity[]): this;

    /**
     * 移除要渲染的实体
     * @param entity 目标实体
     */
    abstract removeEntity(entity: Entity | Entity[]): this;

    /**
     * 渲染场景
     */
    abstract render(): void;
}

/**
 * 渲染插件的构造器类型
 */
interface RendererPluginConstructorOf {
    new(dom: HTMLCanvasElement): BaseRendererPlugin<any>;
}

export {
    BaseRendererPlugin,
    RendererPluginConstructorOf,
}
