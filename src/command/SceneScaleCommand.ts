import { Entity2D, EntityUtil } from "../entity";
import { InteractionEvent } from "../listener";
import { Command } from "./Command";

class SceneScaleCommand extends Command {
    /**
     * 放大场景比例
     * 
     * @description 放大场景会导致画布上呈现范围更小的场景，C/S 是变大的
     */
    private static BIGGER_RATIO = 1.1;

    /**
     * 缩小场景比例
     * 
     * @description 缩小场景会导致画布上呈现范围更大的场景，C/S 是变小的
     */
    private static SMALLER_RATIO = 1 / 1.1;

    protected onWheel(entity: Entity2D, event: InteractionEvent) {
        if (EntityUtil.isRenderTree(entity)) {
            const originalEvent = event.originalEvent as WheelEvent;
            const ratio = originalEvent.deltaY > 0 ? SceneScaleCommand.SMALLER_RATIO : SceneScaleCommand.BIGGER_RATIO;

            // step 1 叠加缩放比例
            const { x: sx, y: sy } = entity.transform.scale;
            entity.transform.scale.set(sx * ratio, sy * ratio);

            // step 2 缩放以鼠标点为中心，所以可能产生位移
            const scaleOrigin = event.localPoint;
            const origin = entity.transform.translate;

            entity.transform.translate = scaleOrigin.add(origin.sub(scaleOrigin).multiply(ratio));
        }
    }
}

export {
    SceneScaleCommand,
}