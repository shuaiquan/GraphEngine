import { Rect } from "../../../../entity-2d";
import { ShapeRenderer } from "./ShapeRenderer";

/**
 * 矩形渲染器
 */
class RectRenderer extends ShapeRenderer<Rect> {
    protected getShapePath(entity: Rect): Path2D {
        const { x, y, width, height } = entity.shape;

        const path = new Path2D();
        path.rect(x, y, width, height);
        return path;
    }
}

export {
    RectRenderer
}