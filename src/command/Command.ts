import { Entity2D } from "../entity-2d";
import { InteractionEvent, InteractionType } from "../listener";

class Command {
    protected onClick(entity: Entity2D, event: InteractionEvent) {
        //
    }

    protected onDBClick(entity: Entity2D, event: InteractionEvent) {
        //
    }

    protected onRightClick(entity: Entity2D, event: InteractionEvent) {
        //
    }

    protected onDragStart(entity: Entity2D, event: InteractionEvent) {
        //
    }

    protected onDragMove(entity: Entity2D, event: InteractionEvent) {
        //
    }

    protected onDragEnd(entity: Entity2D, event: InteractionEvent) {
        //
    }

    protected onHover(entity: Entity2D, event: InteractionEvent) {
        //
    }

    protected onWheel(entity: Entity2D, event: InteractionEvent) {
        //
    }

    /**
     * 将交互事件分发给自身的回调函数处理
     */
    public trigger(type: InteractionType, entity: Entity2D, event: InteractionEvent) {
        switch (type) {
            case InteractionType.Click:
                this.onClick(entity, event);
                break;
            case InteractionType.DBClick:
                this.onDBClick(entity, event);
                break;
            case InteractionType.RightClick:
                this.onRightClick(entity, event);
                break;
            case InteractionType.DragStart:
                this.onDragStart(entity, event);
                break;
            case InteractionType.DragMove:
                this.onDragMove(entity, event);
                break;
            case InteractionType.DragEnd:
                this.onDragEnd(entity, event);
                break;
            case InteractionType.Hover:
                this.onHover(entity, event);
                break;
            case InteractionType.Wheel:
                this.onWheel(entity, event);
                break;
            default: break;
        }
    }
}

export { Command };