import { EntityEmitter } from "../event-emitter";
import { Transform } from "../transform";

class Entity2D extends EntityEmitter {
    /**
     * 模型实体的变换
     */
    transform: Transform;

    /**
     * Z 方向的层级，层级高的会覆盖层级低的实体
     * 
     * @default 0
     */
    zIndex: number = 0;
}

export {
    Entity2D
}