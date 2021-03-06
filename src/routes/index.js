/**
 * Created by 叶子 on 2017/8/13.
 */
import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import AllComponents from '../components';
import routesConfig from './config';
import queryString from 'query-string';
import {getCookie,setCookie} from '../utils/index';

export default class CRouter extends Component {
    requireAuth = (permission, component) => {
        const { auth } = this.props;

        const { permissions } = auth.data;
        // const { auth } = store.getState().httpData;
        if (!permissions || !permissions.includes(permission)) return <Redirect to={'404'} />;
        return component;
    };
    requireLogin = (component, permission) => {
        const { auth } = this.props;
        // const permissions = auth.permissions;

        const token=getCookie('token');
        const usertokentime=getCookie('usertokentime')||0;
        let curDate = new Date().getTime();
        // if (process.env.NODE_ENV === 'production' && !permissions) {

        if((curDate - usertokentime) > 2*3600*1000){
            setCookie('token','');
            setCookie('usertokentime','');
            return <Redirect to={'/login'} />;
        }
        if(!token ){

            // 线上环境判断是否登录
            // localStorage.setItem('user','');
            // localStorage.setItem('usertokentime','');
            setCookie('token','');
            setCookie('usertokentime','');
            return <Redirect to={'/login'} />;
        }

        return permission ? this.requireAuth(permission, component) : component;
    };
    render() {

        return (
            <Switch>
                {Object.keys(routesConfig).map(key =>
                    routesConfig[key].map(r => {
                        const route = r => {

                            const Component = AllComponents[r.component];

                            return (
                                <Route
                                    key={r.route || r.key}
                                    exact
                                    path={r.route || r.key}
                                    render={props => {

                                        const reg = /\?\S*/g;
                                        // 匹配?及其以后字符串
                                        const queryParams = window.location.hash.match(reg);
                                        // 去除?的参数
                                        const { params } = props.match;

                                        Object.keys(params).forEach(key => {
                                            params[key] =
                                                params[key] && params[key].replace(reg, '');
                                        });

                                        props.match.params = { ...params };
                                        const merge = {
                                            ...props,
                                            query: queryParams
                                                ? queryString.parse(queryParams[0])
                                                : {}
                                        };

                                        // 重新包装组件
                                        const wrappedComponent = (
                                            <DocumentTitle title={r.title}>
                                                <Component {...merge} />
                                            </DocumentTitle>
                                        );

                                        return r.login
                                            ? wrappedComponent
                                            : this.requireLogin(wrappedComponent, r.auth);
                                    }}
                                />
                            );
                        };
                        return r.component ? route(r) : r.subs.map(r => route(r));
                    })
                )}

                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        );
    }
}
