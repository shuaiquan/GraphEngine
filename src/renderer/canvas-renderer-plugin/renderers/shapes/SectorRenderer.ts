import { Utils } from "@s7n/math";
import { Sector } from "../../../../entity-2d";
import { ShapeRenderer } from "./ShapeRenderer";

/**
 * 扇形渲染器
 */
class SectorRenderer extends ShapeRenderer<Sector> {
    protected getShapePath(entity: Sector): Path2D {
        const { center, radius, startAngle, endAngle, counterclockwise } = entity.shape;

        const startPoint = Utils.Circle.getPointByAngle(center, radius, startAngle, !counterclockwise)

        const path = new Path2D();
        path.moveTo(center.x, center.y);
        path.lineTo(startPoint.x, startPoint.y);
        path.arc(center.x, center.y, radius, startAngle, endAngle, counterclockwise);
        path.lineTo(center.x, center.y);
        return path;
    }
}

export {
    SectorRenderer
}