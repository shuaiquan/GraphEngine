import React from 'react';
import {
    Routes,
    Route
} from "react-router-dom";
import { RenderDemo } from './render';

const AppRoute = () => (
    <Routes>
        <Route path="/render/demo1" element={<RenderDemo />} />
    </Routes>
);

export {
    AppRoute
}