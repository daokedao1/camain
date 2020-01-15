import React, { Component } from 'react';

import Loadable from 'react-loadable';
const loadingComponent =()=>{
    return (
        <div></div>
        // <div>正在玩命加载中。。。</div>
    );
};
let config = [
    {
        name: '/',
        path: '/',
        exact: true,
        component: Loadable({
            loader: () => import('@/pages/login'),
            loading: loadingComponent
        })
    },
    {
        name: 'login',
        path: '/login',
        exact: true,
        component: Loadable({
            loader: () => import('@/pages/login'),
            loading: loadingComponent
        })
    },
    {
        name: '/app',
        path: '/app',
        exact: false,
        component: Loadable({
            loader: () => import('../App'),
            loading: loadingComponent
        })
    },

    {
        name: '404',
        path: '/404',
        exact: true,
        component: Loadable({
            loader: () => import('@/pages/login/NotFound'),
            loading:loadingComponent
        })
    },
    {
        name: 'ABtestDetile',
        path: '/ABtestDetile',
        exact: true,
        component: Loadable({
            loader: () => import('@/pages/ABtest/Detile'),
            loading: loadingComponent
        })
    }


];

export default config;