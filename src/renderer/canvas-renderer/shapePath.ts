import { Utils } from "@s7n/math";
import { Arc, BaseShape, BezierCurve, Circle, Ellipse, Line, Polygon, Rect, Sector } from "../../shape";

/**
 * 将不同类型的图形转化为统一的 Path2D 结构
 * @param shape 图形
 * @returns Path2D
 */
export function getShapePath(shape: BaseShape): Path2D {
    const path = new Path2D();

    if (shape instanceof Arc) {
        // 圆弧
        const center = shape.getCenter();
        const { radius, startAngle, endAngle, counterclockwise } = shape;

        path.arc(center.x, center.y, radius, startAngle, endAngle, counterclockwise);

    } else if (shape instanceof BezierCurve) {
        // 贝塞尔曲线
        const start = shape.getStart();
        const end = shape.getEnd();
        const cp1 = shape.getCP1();
        const cp2 = shape.getCP2();

        path.moveTo(start.x, start.y);
        if (cp2) {
            path.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
        } else {
            path.quadraticCurveTo(cp1.x, cp1.y, end.x, end.y);
        }

    } else if (shape instanceof Circle) {
        // 圆形
        const center = shape.getCenter();
        const { radius } = shape;

        path.arc(center.x, center.y, radius, 0, Math.PI * 2);

    } else if (shape instanceof Ellipse) {
        // 椭圆  
        const center = shape.getCenter();
        const { radiusX, radiusY, rotation } = shape;

        path.ellipse(center.x, center.y, radiusX, radiusY, rotation, 0, Math.PI * 2);

    } else if (shape instanceof Line) {
        // 单个线条
        const start = shape.getStart();
        const end = shape.getEnd();

        path.moveTo(start.x, start.y);
        path.lineTo(end.x, end.y);

    } else if (shape instanceof Polygon) {
        // 多边形
        const pathData = shape.getPathData();
        const { closed } = shape;

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

    } else if (shape instanceof Rect) {
        // 矩形
        const { x, y, width, height } = shape;

        path.rect(x, y, width, height);

    } else if (shape instanceof Sector) {
        // 扇形
        const center = shape.getCenter();
        const { radius, startAngle, endAngle, counterclockwise } = shape;

        const startPoint = Utils.Circle.getPointByAngle(center, radius, startAngle, !counterclockwise)

        path.moveTo(center.x, center.y);
        path.lineTo(startPoint.x, startPoint.y);
        path.arc(center.x, center.y, radius, startAngle, endAngle, counterclockwise);
        path.lineTo(center.x, center.y);

    }

    return path;
}