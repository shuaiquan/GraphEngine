import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { flatten } from 'lodash';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import { routerConfig } from './router';

const { SubMenu, Item } = Menu;

const App = () => (
    <BrowserRouter>
        <div style={{ width: '100vw', height: '100vh', display: 'flex' }}>
            <Menu
                style={{ width: 160, height: '100%', overflow: 'scroll' }}
                mode="inline"
            >
                {
                    routerConfig.map(menu => (
                        <SubMenu key={menu.key} title={menu.label}>
                            {
                                menu.routes.map(route => (
                                    <Item key={route.path}>
                                        <Link to={route.path}>{route.label}</Link>
                                    </Item>
                                ))
                            }
                        </SubMenu>
                    ))
                }
            </Menu>
            <div style={{ flexGrow: 1, height: '100%' }}>
                <Routes>
                    {
                        flatten(routerConfig.map(menu => menu.routes)).map(route => (
                            <Route path={route.path} element={<route.component />} />
                        ))
                    }
                </Routes>
            </div>
        </div>
    </BrowserRouter>
)


ReactDOM.render(<App />, document.body);