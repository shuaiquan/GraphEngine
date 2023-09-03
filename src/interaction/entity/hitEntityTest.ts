import * as M from "@s7n/math";
import { Entity2D, EntityUtils } from "../../entity-2d";
// import { EntityUtils } from "../../shape";

/**
 * 对模型实体进行碰撞检测
 * @param entity 模型实体
 * @param point 碰撞点
 */
export function hitEntityTest(entity: Entity2D, point: M.Vector2) {
    if (EntityUtils.isShapeEntity(entity)) {
        return hitShapeTest(entity, point);
    } else if (EntityUtils.isRenderTree(entity)) {
        return true;
    }
    return false;
}

/**
 * 对几何图形的碰撞检测
 * @param entity 几何图形实体
 * @param point 碰撞点
 */
function hitShapeTest(entity: Entity2D, point: M.Vector2) {
    // todo 考虑 shape 的 stroke 粗细
    if (EntityUtils.isArc(entity)) {
        const { center, radius, startAngle, endAngle, counterclockwise } = entity.shape
        const mArc = new M.Arc(center, radius, startAngle, endAngle, counterclockwise);
        return mArc.isPointOnArc(point);

    } else if (EntityUtils.isBezierCurve(entity)) {

        // TODO 支持在贝塞尔曲线上的判断
        return false;

    } else if (EntityUtils.isCircle(entity)) {
        const { center, radius } = entity.shape;
        const mCircle = new M.Circle(center, radius);
        return mCircle.isPointInsideCircle(point, true);

    } else if (EntityUtils.isEllipse(entity)) {
        const { center, radiusX, radiusY, rotation } = entity.shape;
        const mEllipse = new M.Ellipse(center, radiusX, radiusY, rotation);
        return mEllipse.isPointInsideEllipse(point);

    } else if (EntityUtils.isLine(entity)) {
        const { start, end } = entity.shape;
        const mLine = new M.Line2().setStart(start).setEnd(end);
        return mLine.isPointOnSegment(point);

    } else if (EntityUtils.isPolygon(entity)) {
        const { path } = entity.shape;
        const mPolygon = new M.Polygon(path);
        return mPolygon.isPointInsidePolygon(point);

    } else if (EntityUtils.isRect(entity)) {
        const { x, y, width, height } = entity.shape;
        const mRect = M.Box2.createByGeometry(new M.Vector2(x + width / 2, y + height / 2), new M.Vector2(width, height));
        return mRect.isPointInBox(point);

    } else if (EntityUtils.isSector(entity)) {
        const { center, radius, startAngle, endAngle, counterclockwise } = entity.shape;
        const mArc = new M.Arc(center, radius, startAngle, endAngle, counterclockwise);
        return mArc.isPointInsideArc(point);
    }

    return false;
}