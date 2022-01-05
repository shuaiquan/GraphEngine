import React from 'react';
import { Menu } from 'antd';
import { Link } from "react-router-dom";

const { SubMenu, Item } = Menu;

const AppMenu = () => {
    return (
        <Menu
            style={{ width: '100%', height: '100%', overflow: 'scroll' }}
            mode="inline"
        >
            <SubMenu key="shape-render" title="几何图形渲染">
                {/* <Item key="render1">基础图形渲染</Item>
                <Item key="render2">基础图形渲染2</Item>
                <Item key="render3">基础图形渲染3</Item>
                <Item key="render4">基础图形渲染4</Item> */}
                <Item key="render1">
                    <Link to="/render/demo1">基础图形渲染</Link>
                </Item>
                <Item key="render2">
                    <Link to="/render2">基础图形渲染2</Link>
                </Item>
                <Item key="render3">
                    <Link to="/render3">基础图形渲染3</Link>
                </Item>
                <Item key="render4">
                    <Link to="/render4">基础图形渲染4</Link>
                </Item>
            </SubMenu>
            <SubMenu key="interaction" title="交互事件测试">
                <Item key="interaction1">基础事件交互</Item>
            </SubMenu>
        </Menu>
    )
}

export {
    AppMenu,
}