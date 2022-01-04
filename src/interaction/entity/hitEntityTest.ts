import * as M from "@s7n/math";
import { Entity2D, EntityUtil } from "../../entity";
import { ShapeEntityUtil } from "../../shape";

/**
 * 对模型实体进行碰撞检测
 * @param entity 模型实体
 * @param point 碰撞点
 */
export function hitEntityTest(entity: Entity2D, point: M.Vector2) {
    if (EntityUtil.isShapeEntity(entity)) {
        return hitShapeTest(entity, point);
    } else if (EntityUtil.isRenderTree(entity)) {
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
    if (ShapeEntityUtil.isArc(entity)) {

        const mArc = new M.Arc(entity.getCenter(), entity.radius, entity.startAngle, entity.endAngle, entity.counterclockwise);
        return mArc.isPointOnArc(point);

    } else if (ShapeEntityUtil.isBezierCurve(entity)) {

        // TODO 支持在贝塞尔曲线上的判断
        return false;

    } else if (ShapeEntityUtil.isCircle(entity)) {

        const mCircle = new M.Circle(entity.getCenter(), entity.radius);
        return mCircle.isPointInsideCircle(point, true);

    } else if (ShapeEntityUtil.isEllipse(entity)) {

        const mEllipse = new M.Ellipse(entity.getCenter(), entity.radiusX, entity.radiusY, entity.rotation);
        return mEllipse.isPointInsideEllipse(point);

    } else if (ShapeEntityUtil.isLine(entity)) {

        const mLine = new M.Line2().setStart(entity.getStart()).setEnd(entity.getEnd());
        return mLine.isPointOnSegment(point);

    } else if (ShapeEntityUtil.isPolygon(entity)) {

        const mPolygon = new M.Polygon(entity.getPathData());
        return mPolygon.isPointInsidePolygon(point);

    } else if (ShapeEntityUtil.isRect(entity)) {

        const { x, y, width, height } = entity;
        const mRect = M.Box2.createByGeometry(new M.Vector2(x + width / 2, y + height / 2), new M.Vector2(width, height));
        return mRect.isPointInBox(point);

    } else if (ShapeEntityUtil.isSector(entity)) {

        const mArc = new M.Arc(entity.getCenter(), entity.radius, entity.startAngle, entity.endAngle, entity.counterclockwise);
        return mArc.isPointInsideArc(point);
    }

    return false;
}