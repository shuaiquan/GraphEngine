import { Arc } from "../../../../entity-2d";
import { ShapeRenderer } from "./ShapeRenderer";

/**
 * 圆弧渲染器
 */
class ArcRenderer extends ShapeRenderer<Arc> {
    protected getShapePath(entity: Arc) {
        const { center, radius, startAngle, endAngle, counterclockwise } = entity.shape;

        const path = new Path2D();
        path.arc(center.x, center.y, radius, startAngle, endAngle, counterclockwise);
        return path;
    }
}

export {
    ArcRenderer
}