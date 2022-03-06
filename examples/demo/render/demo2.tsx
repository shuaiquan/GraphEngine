import { Vector2 } from '@s7n/math';
import React, { useEffect, useRef } from 'react';
import { Canvas2D, Circle } from '../../../src';

const RenderDemo2 = () => {
    const ref = useRef<HTMLCanvasElement>();

    useEffect(() => {
        if (ref.current) {
            const { width = 1000, height = 600 } = ref.current.parentElement.getBoundingClientRect();

            const canvas2d = new Canvas2D({
                element: ref.current,
                width,
                height,
                sceneWidthRange: [1000, 4000],
                sceneHeightRange: 2400,
                scalable: true,
                draggable: true,
                autoRender: true,
            });

            const data: { x: number, y: number }[] = [];
            for (let i = 0; i < 100; i++) {
                for (let j = 0; j < 100; j++) {
                    data.push({ x: i, y: j });
                }
            }

            const circles: Circle[] = [];

            data.forEach(d => {
                const center = new Vector2(d.x * 40 + 20, d.y * 40 + 20);
                const radius = Math.random() * 8 + 12;
                const circle = new Circle(center, radius, {
                    fillStyle: '#78D3F8',
                });
                circles.push(circle);
                canvas2d.addEntity(circle);
            });

            setInterval(() => {
                circles.forEach(circle => {
                    circle.radius = Math.random() * 8 + 12;
                });
            }, 1000);

            // const circle = new Circle(new Vector2(2000, 1200), 100, {
            //     fillStyle: '#78D3F8',
            // });
            // canvas2d.addEntity(circle);

            canvas2d.render();
        }
    }, []);

    return (
        <canvas ref={ref} />
    );
}

export {
    RenderDemo2
};