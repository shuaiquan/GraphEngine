import React from 'react';
import {
    Routes,
    Route
} from "react-router-dom";
import { InteractionDemo1 } from './examples/interaction/demo1';
import { RenderDemo1 } from './examples/render/demo1';

const AppRoute = () => (
    <Routes>
        <Route path="/render/demo1" element={<RenderDemo1 />} />
        <Route path="/interaction/demo1" element={<InteractionDemo1 />} />
    </Routes>
);

export {
    AppRoute
}