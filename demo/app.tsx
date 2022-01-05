
// import { Canvas2D, Circle } from '../src';

// const canvas = new Canvas2D();

// // const circle = new Circle();

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import 'antd/dist/antd.css';
import { RenderDemo } from './render';
import { Row, Col } from 'antd';
import { AppMenu } from './menu';
import { AppRoute } from './route';

// const App = () => (
//     <div>
//         <RenderDemo />
//     </div>
// );

function Expenses() {
    return (
        <main style={{ padding: "1rem 0" }}>
            <h2>Expenses</h2>
        </main>
    );
}

function Invoices() {
    return (
        <main style={{ padding: "1rem 0" }}>
            <h2>Invoices</h2>
        </main>
    );
}


// const App = () => (
//     <BrowserRouter>
//         <div>
//             <h1>Canvas 2D Demo Gallery</h1>
//             <nav
//                 style={{
//                     borderBottom: "solid 1px",
//                     paddingBottom: "1rem"
//                 }}
//             >
//                 <Link to="/invoices">Invoices</Link> |{" "}
//                 <Link to="/expenses">Expenses</Link>
//             </nav>
//         </div>
//         <div>
//             shuaiquan
//         </div>
//         <div>
//             <Routes>
//                 {/* <Route path="/" element={<App />} /> */}
//                 <Route path="expenses" element={<Expenses />} />
//                 <Route path="invoices" element={<Invoices />} />
//             </Routes>
//         </div>
//     </BrowserRouter>
// );

const App = () => (
    <BrowserRouter>
        <Row style={{ width: '100vw', height: '100vh' }}>
            <Col span={3}>
                <AppMenu />
            </Col>
            <Col span={21}>
                <AppRoute />
            </Col>
        </Row>
    </BrowserRouter>
)


ReactDOM.render(<App />, document.body);