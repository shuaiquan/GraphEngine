import { Vector2 } from '@s7n/math';
import React, { useEffect, useRef } from 'react';
import { Arc, BezierCurve, Canvas2D, Circle, Rect, Ellipse, Line, Polygon, Sector, Text, Image } from '../../../src';
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
                sceneWidthRange: 1200,
                sceneHeightRange: 900,
                autoRender: true
            });

            const arc1 = new Arc(new Vector2(150, 150), 100, Math.PI / 4, Math.PI / 4 * 3, false, {
                strokeStyle: '#5B8FF9',
            });
            const arc2 = new Arc(new Vector2(150, 150), 100, Math.PI / 4 * 5, Math.PI / 4 * 7, false, {
                strokeStyle: '#61DDAA',
                lineWidth: 3,
            });

            const bezierCurve = new BezierCurve(new Vector2(20, 250), new Vector2(180, 40), new Vector2(280, 220), undefined, {
                strokeStyle: '#65789B',
                lineCap: LineCap.Round,
                lineWidth: 2,
            });
            bezierCurve.transform.translate.set(300, 0);

            const circle = new Circle(new Vector2(150, 150), 120, {
                fillStyle: '#008685',
            });
            circle.transform.translate.set(600, 0);

            const ellipse = new Ellipse(new Vector2(150, 150), 130, 90, Math.PI / 10, {
                fillStyle: '#F6BD16',
                fillAlpha: 0.6,
            });
            ellipse.transform.translate.set(900, 0);

            const line = new Line(new Vector2(20, 20), new Vector2(280, 280), {
                strokeStyle: '#5B8FF9',
                strokeAlpha: 0.6,
            });
            line.transform.translate.set(0, 300);

            const polygon1 = new Polygon([
                new Vector2(20, 60), new Vector2(170, 280), new Vector2(295, 155),
                new Vector2(175, 195), new Vector2(145, 80), new Vector2(30, 175),
            ], {
                strokeStyle: '#78D3F8',
                lineJoin: LineJoin.Miter,
            });
            polygon1.closed = false;
            polygon1.transform.translate.set(300, 300);

            const polygon2 = new Polygon([
                new Vector2(220, 60), new Vector2(270, 180), new Vector2(195, 155),
                new Vector2(85, 195), new Vector2(145, 80), new Vector2(230, 175),
            ], {
                strokeStyle: '#78D3F8',
                fillStyle: '#D3CEFD',
            });
            polygon2.transform.translate.set(300, 300);

            const rect = new Rect(20, 20, 240, 200, {
                fillStyle: '#00f',
                fillAlpha: 0.7,
                strokeStyle: '#0f0',
                lineWidth: 5,
            });
            rect.transform.translate.set(600, 300);

            const sector1 = new Sector(new Vector2(150, 150), 120, Math.PI / 4, Math.PI / 4 * 3, false, {
                strokeStyle: '#5B8FF9',
                fillStyle: '#FFE0C7'
            });
            sector1.transform.translate.set(900, 300);
            const sector2 = new Sector(new Vector2(150, 150), 120, Math.PI / 4 * 5, Math.PI / 4 * 7, false, {
                fillStyle: '#FFE0C7',
                strokeStyle: '#61DDAA',
                lineWidth: 3,
            });
            sector2.transform.translate.set(900, 300);

            const text1 = new Text('shuaiquan render demo', { x: 150, y: 100, fontStyle: 'italic', fontSize: '1em' });
            text1.transform.translate.set(0, 600);
            const text2 = new Text('text testing !!!', { x: 150, y: 200, fontSize: 30, align: 'center', fillStyle: '#F6903D', strokeStyle: '#BBDEDE' });
            text2.transform.translate.set(0, 600);

            const image = new Image('https://raw.githubusercontent.com/rayshuai/BikeVisualization/master/%E5%80%9F%E8%BD%A6%E9%87%8F%E8%BF%98%E8%BD%A6%E9%87%8F%E7%83%AD%E5%8A%9B%E5%9B%BE%E9%A1%B9%E7%9B%AE/images/%E8%87%AA%E8%A1%8C%E8%BD%A6%E7%AB%99%E7%82%B9%E5%80%9F%E8%BD%A6%E9%87%8F%E7%83%AD%E5%8A%9B%E5%9B%BE1.png', {
                width: 300,
                height: 300,
                x: 300,
                y: 600,
            });

            canvas2d.addEntity([
                arc1, arc2, bezierCurve, circle, ellipse, line, polygon1, polygon1, polygon2, rect, sector1, sector2, text1, text2, image,
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