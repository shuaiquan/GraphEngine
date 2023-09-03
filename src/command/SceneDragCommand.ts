import { Vector2 } from "@s7n/math";
import { Entity2D, EntityUtils } from "../entity-2d";
import { InteractionEvent } from "../listener";
import { Command } from "./Command";

/**
 * TODO 把这种每个交互函数中都要判断 entity 类型的行为变成一种前置的配置
 */

/**
 * 场景拖拽指令
 */
class SceneDragCommand extends Command {
    /**
     * 每次拖动时的鼠标位置
     */
    private lastDragPos?: Vector2;

    protected onDragStart(entity: Entity2D, event: InteractionEvent) {
        if (EntityUtils.isRenderTree(entity)) {
            this.lastDragPos = event.canvasPoint
        }
    }

    protected onDragMove(entity: Entity2D, event: InteractionEvent) {
        if (EntityUtils.isRenderTree(entity)) {
            const currentPos = this.move(entity, event);

            this.lastDragPos = currentPos;
        }
    }

    protected onDragEnd(entity: Entity2D, event: InteractionEvent) {
        if (EntityUtils.isRenderTree(entity)) {
            this.move(entity, event);

            this.lastDragPos = undefined;
        }
    }

    private move(entity: Entity2D, event: InteractionEvent) {
        // step 1 计算偏移距离
        const currentPos = event.canvasPoint;
        const translate = currentPos.sub(this.lastDragPos);
        // step 2 更新渲染偏移
        entity.transform.translate = entity.transform.translate.add(translate);

        return currentPos;
    }
}

export {
    SceneDragCommand,
}
