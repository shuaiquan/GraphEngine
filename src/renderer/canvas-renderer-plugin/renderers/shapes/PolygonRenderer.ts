import { Polygon } from "../../../../entity-2d";
import { ShapeRenderer } from "./ShapeRenderer";

/**
 * 多边形渲染器
 */
class PolygonRenderer extends ShapeRenderer<Polygon> {
    protected getShapePath(entity: Polygon): Path2D {
        const { path: pathData, closed } = entity.shape;

        const path = new Path2D();
        pathData.forEach((point, index) => {
            if (index === 0) {
                path.moveTo(point.x, point.y);
            } else {
                path.lineTo(point.x, point.y);
            }
        });

        if (closed) {   // 处理闭合的情况
            path.closePath();
        }

        return path;
    }
}

export {
    PolygonRenderer
}