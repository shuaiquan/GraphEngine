import { Arc, BezierCurve, Circle, Ellipse, Image, Line, Polygon, Rect, Sector, Text } from '../../entity-2d';

import { CanvasRendererPlugin } from './RendererPlugin';
import { ImageRenderer } from './renderers/ImageRenderer';
import { TextRenderer } from './renderers/TextRenderer';
import { ArcRenderer } from './renderers/shapes/ArcRenderer';
import { BezierCurveRenderer } from './renderers/shapes/BezierCurveRenderer';
import { CircleRenderer } from './renderers/shapes/CircleRenderer';
import { EllipseRenderer } from './renderers/shapes/EllipseRenderer';
import { LineRenderer } from './renderers/shapes/LineRenderer';
import { PolygonRenderer } from './renderers/shapes/PolygonRenderer';
import { RectRenderer } from './renderers/shapes/RectRenderer';
import { SectorRenderer } from './renderers/shapes/SectorRenderer';

CanvasRendererPlugin.registerRenderer(Image, ImageRenderer);
CanvasRendererPlugin.registerRenderer(Text, TextRenderer);
CanvasRendererPlugin.registerRenderer(Arc, ArcRenderer);
CanvasRendererPlugin.registerRenderer(BezierCurve, BezierCurveRenderer);
CanvasRendererPlugin.registerRenderer(Circle, CircleRenderer);
CanvasRendererPlugin.registerRenderer(Ellipse, EllipseRenderer);
CanvasRendererPlugin.registerRenderer(Line, LineRenderer);
CanvasRendererPlugin.registerRenderer(Polygon, PolygonRenderer);
CanvasRendererPlugin.registerRenderer(Rect, RectRenderer);
CanvasRendererPlugin.registerRenderer(Sector, SectorRenderer);

export {
    CanvasRendererPlugin,
}