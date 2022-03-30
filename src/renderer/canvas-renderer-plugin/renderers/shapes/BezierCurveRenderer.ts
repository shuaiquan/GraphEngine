import { BezierCurve } from "../../../../entity-2d";
import { ShapeRenderer } from "./ShapeRenderer";

/**
 * 贝塞尔曲线渲染器
 */
class BezierCurveRenderer extends ShapeRenderer<BezierCurve> {
    protected getShapePath(entity: BezierCurve): Path2D {
        const { startPoint, endPoint, cp1, cp2 } = entity.shape;

        const path = new Path2D();
        path.moveTo(startPoint.x, startPoint.y);
        if (cp2) {
            path.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, endPoint.x, endPoint.y);
        } else {
            path.quadraticCurveTo(cp1.x, cp1.y, endPoint.x, endPoint.y);
        }
        return path;
    }
}

export {
    BezierCurveRenderer
}