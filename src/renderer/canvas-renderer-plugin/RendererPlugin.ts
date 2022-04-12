import { Entity2D, RenderTree } from "../../entity-2d";
import { BaseRendererPlugin } from "../base-renderer-plugin";
import { BaseRenderer } from "./BaseRenderer";

interface IEntityConstructor<T extends Entity2D> {
    new(...args: any[]): T;
}

interface IEntityRenderer<T extends Entity2D> {
    new(): BaseRenderer<T>
}

class CanvasRendererPlugin extends BaseRendererPlugin<Entity2D> {
    /**
     * Entity -> Renderer 的映射
     */
    private static rendererMap: Map<IEntityConstructor<Entity2D>, BaseRenderer<Entity2D>> = new Map();

    /**
     * 注册实体对应的渲染器
     * @param EntityConstructor 实体类
     * @param Renderer 渲染器
     */
    static registerRenderer<T extends Entity2D>(EntityConstructor: IEntityConstructor<T>, Renderer: IEntityRenderer<T>) {
        this.rendererMap.set(EntityConstructor, new Renderer());
        return this;
    }

    /**
     * 画布 2D Context
     */
    private ctx?: CanvasRenderingContext2D;

    /**
     * 画布的宽度
     */
    private width: number = 0;

    /**
     * 画布的高度
     */
    private height: number = 0;

    /**
     * 渲染树：场景所有要被渲染的实体都会挂载在渲染树下
     */
    private renderTree: RenderTree = new RenderTree();

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        // 初始化 CanvasRenderingContext2D
        this.ctx = canvas.getContext('2d');

        if (!this.ctx) {
            console.warn('Failed to initialize CanvasRenderingContext2D');
            return this;
        }

        const { width, height } = canvas.getBoundingClientRect();
        this.width = width;
        this.height = height;
    }

    /**
     * 增加要渲染的实体
     * @param entity 目标实体
     */
    addEntity(entity: Entity2D | Entity2D[]) {
        this.renderTree.addChild(entity);
        return this;
    }

    /**
     * 移除要渲染的实体
     * @param entity 目标实体
     */
    removeEntity(entity: Entity2D | Entity2D[]) {
        this.renderTree.addChild(entity);
        return this;
    }

    /**
     * 渲染场景
     */
    render() {
        if (this.ctx) {
            /**
             * TODO 探索局部绘制的方案，避免全量重绘
             */

            // step 1 清除画布
            this.ctx.clearRect(0, 0, this.width, this.height);
            // step 2 重新绘制全部实体
            this.renderTree.flattenTree().forEach(entity => {
                const renderer = CanvasRendererPlugin.rendererMap.get(entity.constructor as IEntityConstructor<Entity2D>);
                if (renderer) {
                    renderer.render(entity, this.ctx);
                }
            });
        }
    }
}

export {
    CanvasRendererPlugin
}
