import { CanvasEvent, EventName } from "./type";

abstract class BaseListener {
    abstract trigger(name: EventName, event: CanvasEvent): void;
}

export {
    BaseListener,
}