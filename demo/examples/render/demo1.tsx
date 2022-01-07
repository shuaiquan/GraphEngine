import { Vector2 } from '@s7n/math';
import React, { useEffect, useRef } from 'react';
import { Arc, BezierCurve, Canvas2D, Circle, Rect, Ellipse, Line, Polygon, Sector } from '../../../src';
import { LineCap, LineJoin } from '../../../src/shape';

/**
 * 渲染多种基础图形
 */
const RenderDemo1 = () => {
    const ref = useRef<HTMLCanvasElement>();

    useEffect(() => {
        if (ref.current) {
            const { width = 1000, height = 600 } = ref.current.parentElement.getBoundingClientRect();

            const canvas2d = new Canvas2D({
                element: ref.current,
                width,
                height,
            });

            const arc1 = new Arc(new Vector2(50, 50), 50, Math.PI / 4, Math.PI / 4 * 3, false, {
                strokeStyle: '#5B8FF9',
            });
            const arc2 = new Arc(new Vector2(150, 50), 50, Math.PI / 4 * 5, Math.PI / 4 * 7, false, {
                strokeStyle: '#61DDAA',
                lineWidth: 3,
            });

            const bezierCurve = new BezierCurve(new Vector2(200, 50), new Vector2(280, 80), new Vector2(220, 20), undefined, {
                strokeStyle: '#65789B',
                lineCap: LineCap.Round,
                lineWidth: 2,
            });

            const circle = new Circle(new Vector2(0, 0), 50, {
                fillStyle: '#008685',
            });
            circle.transform.translate.set(350, 50);

            const ellipse = new Ellipse(new Vector2(500, 50), 80, 40, Math.PI / 10, {
                fillStyle: '#F6BD16',
                fillAlpha: 0.6,
            });

            const line = new Line(new Vector2(610, 10), new Vector2(680, 90), {
                strokeStyle: '#5B8FF9',
                strokeAlpha: 0.6,
            });

            const polygon1 = new Polygon([
                new Vector2(20, 60), new Vector2(70, 80), new Vector2(95, 55),
                new Vector2(75, 95), new Vector2(45, 80), new Vector2(30, 75),
            ], {
                strokeStyle: '#78D3F8',
                lineJoin: LineJoin.Miter,
            });
            polygon1.closed = false;
            polygon1.transform.translate.setY(50);

            const polygon2 = new Polygon([
                new Vector2(20, 60), new Vector2(70, 80), new Vector2(95, 55),
                new Vector2(85, 95), new Vector2(45, 80), new Vector2(30, 75),
            ], {
                strokeStyle: '#78D3F8',
                fillStyle: '#D3CEFD',
            });
            polygon2.transform.translate.set(100, 0);
            polygon2.transform.translate.setY(50);

            const rect = new Rect(210, 60, 80, 40, {
                fillStyle: '#00f',
                fillAlpha: 0.7,
                strokeStyle: '#0f0',
                lineWidth: 5,
            });
            rect.transform.translate.setY(50);

            const sector1 = new Sector(new Vector2(50, 50), 50, Math.PI / 4, Math.PI / 4 * 3, false, {
                strokeStyle: '#5B8FF9',
                fillStyle: '#FFE0C7'
            });
            sector1.transform.translate.set(300, 200);
            const sector2 = new Sector(new Vector2(50, 50), 50, Math.PI / 4 * 5, Math.PI / 4 * 7, false, {
                fillStyle: '#FFE0C7',
                strokeStyle: '#61DDAA',
                lineWidth: 3,
            });
            sector2.transform.translate.set(300, 200);

            canvas2d.addEntity([
                arc1, arc2, bezierCurve, circle, ellipse, line, polygon1, polygon1, polygon2, rect, sector1, sector2
            ]);
            canvas2d.render();
        }
    }, []);

    return (
        <canvas ref={ref} />
    );
}

export {
    RenderDemo1
};