import { BaseEvent, BaseInteraction, InteractiveType } from "../listener";

/**
 * TODO 考虑用户的使用来设计
 */
class ObjectInteraction implements BaseInteraction {
    triggerEvent(type: InteractiveType, payload: BaseEvent) {
        switch (type) {
            case InteractiveType.Click: {
                break;
            }
            case InteractiveType.Hover: {
                break;
            }
            case InteractiveType.DragStart: {
                break;
            }
            case InteractiveType.DragMove: {
                break;
            }
            case InteractiveType.DragEnd: {
                break;
            }
        }
    }
}

export { ObjectInteraction };