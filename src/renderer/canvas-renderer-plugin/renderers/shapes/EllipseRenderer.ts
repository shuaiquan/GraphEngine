import { Ellipse } from "../../../../entity-2d";
import { ShapeRenderer } from "./ShapeRenderer";

/**
 * 椭圆渲染器
 */
class EllipseRenderer extends ShapeRenderer<Ellipse> {
    protected getShapePath(entity: Ellipse): Path2D {
        const { center, radiusX, radiusY, rotation } = entity.shape;

        const path = new Path2D();
        path.ellipse(center.x, center.y, radiusX, radiusY, rotation, 0, Math.PI * 2);
        return path;
    }
}

export {
    EllipseRenderer
}