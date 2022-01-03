import * as M from "@s7n/math";
import { Entity2D, Group, RenderTree } from "../../entity";
import { Arc, BaseShape, BezierCurve, Circle, Ellipse, Line, Polygon, Rect, Sector } from "../../shape";

/**
 * 对模型实体进行碰撞检测
 * @param entity 模型实体
 * @param point 碰撞点
 */
export function hitEntityTest(entity: Entity2D, point: M.Vector2) {
    if (entity instanceof BaseShape) {
        return hitShapeTest(entity, point);
    } else if (entity instanceof RenderTree) {
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
    if (entity instanceof Arc) {
        const mArc = new M.Arc(entity.getCenter(), entity.radius, entity.startAngle, entity.endAngle, entity.counterclockwise);
        return mArc.isPointOnArc(point);
    } else if (entity instanceof BezierCurve) {
        // TODO 支持在贝塞尔曲线上的判断
        return false;
    } else if (entity instanceof Circle) {
        const mCircle = new M.Circle(entity.getCenter(), entity.radius);
        return mCircle.isPointInsideCircle(point, true);
    } else if (entity instanceof Ellipse) {
        const mEllipse = new M.Ellipse(entity.getCenter(), entity.radiusX, entity.radiusY, entity.rotation);
        return mEllipse.isPointInsideEllipse(point);
    } else if (entity instanceof Line) {
        const mLine = new M.Line2().setStart(entity.getStart()).setEnd(entity.getEnd());
        return mLine.isPointOnSegment(point);
    } else if (entity instanceof Polygon) {
        const mPolygon = new M.Polygon(entity.getPathData());
        return mPolygon.isPointInsidePolygon(point);
    } else if (entity instanceof Rect) {
        const { x, y, width, height } = entity;
        const mRect = M.Box2.createByGeometry(new M.Vector2(x + width / 2, y + height / 2), new M.Vector2(width, height));
        return mRect.isPointInBox(point);
    } else if (entity instanceof Sector) {
        const mArc = new M.Arc(entity.getCenter(), entity.radius, entity.startAngle, entity.endAngle, entity.counterclockwise);
        return mArc.isPointInsideArc(point);
    }

    return false;
}