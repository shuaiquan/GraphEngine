import { Circle } from "../../../../entity-2d";
import { ShapeRenderer } from "./ShapeRenderer";

/**
 * 圆形渲染器
 */
class CircleRenderer extends ShapeRenderer<Circle> {
    protected getShapePath(entity: Circle): Path2D {
        const { center, radius } = entity.shape;

        const path = new Path2D();
        path.arc(center.x, center.y, radius, 0, Math.PI * 2);
        return path;
    }
}

export {
    CircleRenderer
}