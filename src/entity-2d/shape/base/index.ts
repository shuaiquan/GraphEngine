import { dirtyProperty } from "../../../dirty";
import { Entity2D } from "../../core/Entity2D";
import { BaseStyle } from "./Style";

interface ConstructorOf<T> {
    new(): T
}

interface IShapeParam<Shape, Style> {
    /**
     * 图形的形状信息
     */
    shape?: Partial<Shape>;
    /**
     * 图形的样式信息
     */
    style?: Partial<Style>;
}

abstract class ShapeEntity<Shape, Style> extends Entity2D {
    /**
     * 图形的形状信息
     */
    @dirtyProperty shape: Shape;

    /**
     * 图形的样式信息
     */
    @dirtyProperty style: Style;
}

interface ShapeEntityConstructor<Shape, Style> {
    new(param?: IShapeParam<Shape, Style>): ShapeEntity<Shape, Style>;
}

/**
 * 合并 Shape类型 和 Style类型 共同构成 ShapeEntity 类型
 * @param SHAPE 
 * @param STYLE 
 */
function Combine<Shape, Style>(SHAPE: ConstructorOf<Shape>, STYLE: ConstructorOf<Style>): ShapeEntityConstructor<Shape, Style> {
    return class extends ShapeEntity<Shape, Style> {
        constructor(param?: IShapeParam<Shape, Style>) {
            super();

            // 根据用户的设置，初始化 ShapeEntity 的 shape 和 style
            const { shape, style } = param || {};
            this.shape = shape ? Object.assign(new SHAPE(), shape) : new SHAPE();
            this.style = style ? Object.assign(new STYLE(), style) : new STYLE();
        }
    }
}

export {
    Combine,
    BaseStyle,
    ShapeEntityConstructor,
}