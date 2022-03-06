import { getDirtyTag, markDirty } from "../dirty";
import { RenderTree } from "../entity";
import { CanvasRenderer } from "./canvas-renderer";

/**
 * 渲染器：负责将 Canvas 传递来的数据进行渲染
 */
class Renderer {
    /**
     * 画布 DOM 节点
     */
    private dom: HTMLCanvasElement;

    /**
     * 使用 Canvas2D 的渲染器
     * 
     * @todo 将来有多种渲染器的情况时，不会这样写死
     */
    private canvasRenderer: CanvasRenderer;

    /**
     * 要被渲染的视口
     */
    private renderTree?: RenderTree;

    /**
     * 是否开启自动渲染
     */
    // private autoRender: boolean = false;

    /**
     * 自动渲染任务的 id
     */
    private timer?: number;

    constructor(dom: HTMLCanvasElement, autoRender: boolean = false) {
        this.dom = dom;
        this.canvasRenderer = new CanvasRenderer(this.dom);
        if (autoRender) {
            this.tick();
        }
    }

    /**
     * 渲染场景
     * @param  
     */
    render(renderTree: RenderTree) {
        this.renderTree = renderTree
        this.renderViewport();
    }

    /**
     * 开启自动渲染
     */
    startAutoRender() {
        if (!this.timer) {
            this.tick();
        }
    }

    /**
     * 停止自动渲染
     */
    stopAutoRender() {
        if (this.timer) {
            cancelAnimationFrame(this.timer);
        }
    }

    /**
     * 渲染当前视口
     */
    private renderViewport() {
        if (this.renderTree && getDirtyTag()) {
            // step 1 清空画布
            this.canvasRenderer.clearCanvas();
            // step 2 重新渲染全部实体模型
            const entities = this.renderTree.flattenTree();
            entities.forEach(entity => this.canvasRenderer.render(entity));
            markDirty(false);
        }
    }

    /**
     * 自动渲染任务
     */
    private tick() {
        this.timer = requestAnimationFrame(() => {
            this.renderViewport();
            this.tick();
        });
    }
}

export { Renderer };