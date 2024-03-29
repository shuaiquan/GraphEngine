import { Vector2 } from '@s7n/math';
import React, { useEffect, useRef } from 'react';
import { Canvas2D, Circle, Rect } from '../../../src';
import { InteractionType } from '../../../src/listener';

const InteractionDemo1 = () => {
    const ref = useRef<HTMLCanvasElement>();

    useEffect(() => {
        if (ref.current) {
            const { width = 1000, height = 600 } = ref.current.parentElement.getBoundingClientRect();

            const canvas2d = new Canvas2D({
                element: ref.current,
                width,
                height,
                // sceneWidthRange: 3000,
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

            // 这个类型
            /**
             * TODO
             *  - InteractionType 这个类型没有导出
             *  - 必须使用这个类型也很烦
             */
            rect.on(InteractionType.Click, () => {
                console.log('rect Click');
            });

            rect.on(InteractionType.DBClick, () => {
                console.log('rect DBClick');
            });

            rect.on(InteractionType.DragStart, () => {
                console.log('rect DragStart');
            });

            rect.on(InteractionType.DragMove, () => {
                console.log('rect DragMove');
            });

            rect.on(InteractionType.DragEnd, () => {
                console.log('rect DragEnd');
            });

            rect.on(InteractionType.Hover, () => {
                console.log('rect Hover');
            });

            rect.on(InteractionType.RightClick, () => {
                console.log('rect RightClick');
            });

            circle.on(InteractionType.Click, () => {
                console.log('circle Click');
            });

            circle.on(InteractionType.DBClick, () => {
                console.log('circle DBClick');
            });

            circle.on(InteractionType.DragStart, () => {
                console.log('circle DragStart');
            });

            circle.on(InteractionType.DragMove, () => {
                console.log('circle DragMove');
            });

            circle.on(InteractionType.DragEnd, () => {
                console.log('circle DragEnd');
            });

            circle.on(InteractionType.Hover, () => {
                console.log('circle Hover');
            });

            circle.on(InteractionType.RightClick, () => {
                console.log('circle RightClick');
            });
        }
    }, []);

    return (
        <canvas ref={ref} />
    );
}

export {
    InteractionDemo1
};