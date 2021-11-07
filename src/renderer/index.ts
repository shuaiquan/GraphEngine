import { Object2D } from "../object";
import { render } from "./render";

/**
 * 渲染器：负责将 Canvas 传递来的数据进行渲染
 */
class Renderer {
    /**
     * 画布 DOM 节点
     */
    private dom: HTMLCanvasElement;

    /**
     * 画布 2D Context
     */
    private ctx: CanvasRenderingContext2D;

    /**
     * 要被渲染的视口
     */
    private viewport?: Object2D;

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
        this.ctx = dom.getContext('2d');
        if (autoRender) {
            this.tick();
        }
    }

    /**
     * 渲染
     * @param viewport 
     */
    render(viewport: Object2D) {
        this.viewport = viewport;
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
        if (this.viewport) {
            render(this.viewport, this.ctx);
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