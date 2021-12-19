import { CoordinateSystem } from '../coordinate';
import { Entity2D, RenderTree } from '../entity';
import { Renderer } from '../renderer';
import { StyleOption } from '../shape';
import { DEFAULT_CANVAS_OPTION } from './const';
import { CanvasOption } from './type';

class Canvas2D {
    /**
     * 渲染器
     */
    private renderer: Renderer;

    /**
     * 场景坐标系
     */
    private coordinateSystem: CoordinateSystem;

    /**
     * 被渲染的目标画布
     */
    private element: HTMLCanvasElement;

    /**
     * 渲染模型树
     * 
     * @description 组织场景下要被渲染的全部实体
     */
    private renderTree: RenderTree = new RenderTree();

    constructor(option: CanvasOption = {}) {
        // 初始化画布
        this.element = this.createCanvas(option);
        // 初始化坐标系
        this.coordinateSystem = this.adaptCoordinateSystem(this.element, option);
        // 初始化渲染器
        this.renderer = new Renderer(this.element, option.autoRender);
    }

    /**
     * 获取被渲染的目标画布
     */
    getCanvas() {
        return this.element;
    }

    /**
     * 增加要渲染的元素
     * @param child 目标元素
     */
    addEntity(entity: Entity2D | Entity2D[]) {
        this.renderTree.addChild(entity);
        return this;
    }

    /**
     * 移除要渲染的元素
     * @param child 目标元素
     */
    removeEntity(entity: Entity2D | Entity2D[]) {
        this.renderTree.addChild(entity);
        return this;
    }

    /**
     * 渲染画布
     */
    render() {
        this.renderer.render(this.viewPort);
    }

    setGlobalStyleOption(styleOption: StyleOption) {
        // todo
    }

    /**
     * 创建画布 DOM
     */
    private createCanvas(option: CanvasOption) {
        const { element, width, height } = option;

        let canvas = typeof element === 'string' ? document.getElementById(element) as HTMLCanvasElement : element;
        if (canvas && canvas.tagName === 'CANVAS') {
            // 用户传入了有效的画布DOM，仅可以根据用户传入的宽高进行设置
            return (
                width && canvas.setAttribute('width', `${width}`),
                height && canvas.setAttribute('height', `${height}`),
                canvas
            );
        }

        // 需要创建画布对象DOM，优先使用用户传入的宽高进行设置
        canvas = document.createElement('canvas');
        canvas.setAttribute('width', `${width || DEFAULT_CANVAS_OPTION.width}`);
        canvas.setAttribute('height', `${height || DEFAULT_CANVAS_OPTION.height}`);
        return canvas;
    }

    /**
     * 将场景坐标系适配画布
     */
    private adaptCoordinateSystem(canvas: HTMLCanvasElement, option: CanvasOption) {
        const { width, height } = canvas.getBoundingClientRect();
        const { sceneWidthRange = [0, width], sceneHeightRange = [0, height] } = option;

        const widthRange = typeof sceneWidthRange === 'number' ? [0, sceneWidthRange] : sceneWidthRange;
        const heightRange = typeof sceneHeightRange === 'number' ? [0, sceneHeightRange] : sceneHeightRange;

        const coordinateSystem = new CoordinateSystem();
        return coordinateSystem.init({
            width, height, widthRange, heightRange
        });
    }
}

export { Canvas2D };
