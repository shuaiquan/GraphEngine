import { Entity2D, EntityType } from "./core/Entity2D";
import { Group } from "./core/Group2D";
import { RenderTree } from "./core/RenderTree";
import { Text } from './text';
import { Image } from './image';
import { ShapeEntity } from "./shape/base";
import { Arc } from "./shape/Arc";
import { BezierCurve } from "./shape/BezierCurve";
import { Circle } from "./shape/Circle";
import { Ellipse } from "./shape/Ellipse";
import { Line } from "./shape/Line";
import { Polygon } from "./shape/Polygon";
import { Rect } from "./shape/Rect";
import { Sector } from "./shape/Sector";

abstract class EntityUtils {
    /**
     * 是否是 Group
     */
    static isGroup(value: Entity2D): value is Group {
        return value.getEntityType() === EntityType.GroupEntity;
    }

    /**
     * 是否是 RenderTree
     */
    static isRenderTree(value: Entity2D): value is RenderTree {
        return value instanceof RenderTree;
    }

    /**
     * 是否是图形实体
     */
    static isShapeEntity(value: Entity2D): value is ShapeEntity<any, any> {
        return value.getEntityType() === EntityType.ShapeEntity
    }

    /**
     * 是否是文本实体
     */
    static isTextEntity(value: Entity2D): value is Text {
        return value.getEntityType() === EntityType.TextEntity;
    }

    /**
     * 是否是图像实体
     */
    static isImageEntity(value: Entity2D): value is Image {
        return value instanceof Image;
    }

    /**
     * 是否是 Arc 图形
     */
    static isArc(entity: Entity2D): entity is Arc {
        return entity instanceof Arc;
    }

    /**
     * 是否是 BezierCurve 图形
     */
    static isBezierCurve(entity: Entity2D): entity is BezierCurve {
        return entity instanceof BezierCurve;
    }

    /**
     * 是否是 Circle 图形
     */
    static isCircle(entity: Entity2D): entity is Circle {
        return entity instanceof Circle;
    }

    /**
     * 是否是 Ellipse 图形
     */
    static isEllipse(entity: Entity2D): entity is Ellipse {
        return entity instanceof Ellipse;
    }

    /**
     * 是否是 Line 图形
     */
    static isLine(entity: Entity2D): entity is Line {
        return entity instanceof Line;
    }

    /**
     * 是否是 Polygon 图形
     */
    static isPolygon(entity: Entity2D): entity is Polygon {
        return entity instanceof Polygon;
    }

    /**
     * 是否是 Rect 图形
     */
    static isRect(entity: Entity2D): entity is Rect {
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
    EntityUtils,
}