import { Arc } from "./Arc";
import { BezierCurve } from "./BezierCurve";
import { Circle } from "./Circle";
import { Ellipse } from "./Ellipse";
import { Line } from "./Line";
import { Polygon } from "./Polygon";
import { Rect } from "./Rect";
import { Sector } from "./Sector";

/**
 * 图形实体工具集
 */
abstract class ShapeEntityUtil {
    /**
     * 是否是 Arc 图形
     */
    static isArc(entity: any): entity is Arc {
        return entity instanceof Arc;
    }

    /**
     * 是否是 BezierCurve 图形
     */
    static isBezierCurve(entity: any): entity is BezierCurve {
        return entity instanceof BezierCurve;
    }

    /**
     * 是否是 Circle 图形
     */
    static isCircle(entity: any): entity is Circle {
        return entity instanceof Circle;
    }

    /**
     * 是否是 Ellipse 图形
     */
    static isEllipse(entity: any): entity is Ellipse {
        return entity instanceof Ellipse;
    }

    /**
     * 是否是 Line 图形
     */
    static isLine(entity: any): entity is Line {
        return entity instanceof Line;
    }

    /**
     * 是否是 Polygon 图形
     */
    static isPolygon(entity: any): entity is Polygon {
        return entity instanceof Polygon;
    }

    /**
     * 是否是 Rect 图形
     */
    static isRect(entity: any): entity is Rect {
        return entity instanceof Rect;
    }

    /**
     * 是否是 Sector 图形
     */
    static isSector(entity: any): entity is Sector {
        return entity instanceof Sector;
    }
}

export {
    ShapeEntityUtil,
}