import { Line } from "../../../../entity-2d";
import { ShapeRenderer } from "./ShapeRenderer";

/**
 * 线条渲染器
 */
class LineRenderer extends ShapeRenderer<Line> {
    protected getShapePath(entity: Line): Path2D {
        // 单个线条
        const { start, end } = entity.shape;

        const path = new Path2D();
        path.moveTo(start.x, start.y);
        path.lineTo(end.x, end.y);
        return path;
    }
}

export {
    LineRenderer
}