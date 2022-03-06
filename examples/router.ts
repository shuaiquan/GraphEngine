import React from "react";
import { InteractionDemo1 } from "./demo/interaction/demo1";
import { InteractionDemo2 } from "./demo/interaction/demo2";
import { RenderDemo1 } from "./demo/render/demo1";
import { RenderDemo2 } from "./demo/render/demo2";

interface RouterItem {
    path: string;
    label: string;
    component: React.ComponentType;
}

interface RouterMenu {
    key: string;
    label: string;
    routes: RouterItem[];
}

export const routerConfig: RouterMenu[] = [
    {
        key: 'render',
        label: '图形渲染',
        routes: [
            {
                path: '/render/shapes',
                label: '基础图形渲染',
                component: RenderDemo1,
            },
            {
                path: '/render/onlyDirty',
                label: '按需渲染',
                component: RenderDemo2,
            }
        ]
    },
    {
        key: 'interaction',
        label: '事件交互',
        routes: [
            {
                path: '/interaction/basic',
                label: '基础事件交互',
                component: InteractionDemo1,
            },
            {
                path: '/interaction/scene',
                label: '场景拖动缩放',
                component: InteractionDemo2,
            }
        ]
    }
];