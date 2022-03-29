import { Entity2D } from "../../entity-2d";
import { BaseRenderer } from "./BaseRenderer";

interface IEntityConstructor<T extends Entity2D> {
    new(...args: any[]): T;
}

interface IEntityRenderer<T extends Entity2D> {
    new(): BaseRenderer<T>
}

class CanvasRendererPlugin {
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
}

export {
    CanvasRendererPlugin
}
