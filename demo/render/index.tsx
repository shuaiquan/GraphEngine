import { Vector2 } from '@s7n/math';
import React, { useEffect, useRef } from 'react';
import { Canvas2D, Circle, Rect } from '../../src';

const RenderDemo = () => {
    const ref = useRef();

    useEffect(() => {
        if (ref.current) {
            const canvas2d = new Canvas2D({
                element: ref.current,
                width: 1000,
                height: 700,
                sceneWidthRange: 3000,
            });

            const circle = new Circle(new Vector2(0, 0), 50, {
                fillStyle: '#f00',
            });

            circle.transform.scale.setX(2);
            circle.transform.translate.set(100, 200);

            const rect = new Rect(300, 300, 100, 200, {
                fillStyle: '#00f',
                fillAlpha: 0.7,
                strokeStyle: '#0f0',
                lineWidth: 10,
            });

            canvas2d.addEntity(circle).addEntity(rect);
            canvas2d.render();
        }
    }, []);

    return (
        <canvas ref={ref} />
    );
}

export { RenderDemo };