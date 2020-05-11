/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import routes from '../routes/config';
import {cloneDeep, forEach, find, findIndex} from 'lodash';
import SiderMenu from './SiderMenu';
import {getUserMenus} from '@/axios'

const { Sider } = Layout;

class SiderCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'inline',
            openKey: '',
            selectedKey: '',
            routes: routes,
            firstHide: true // 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
        };
    }

    static getDerivedStateFromProps (props, state) {
        if (props.collapsed !== state.collapsed) {
            const state1 = SiderCustom.setMenuOpen(props);
            const state2 = SiderCustom.onCollapse(props.collapsed);
            return {
                ...state1,
                ...state2,
                firstHide: state.collapsed !== props.collapsed && props.collapsed, // 两个不等时赋值props属性值否则为false
                openKey: state.openKey || (!props.collapsed && state1.openKey)
            };
        }
        return null;
    }
    static setMenuOpen = props => {
        const { pathname } = props.location;
        return {
            openKey: pathname.substr(0, pathname.lastIndexOf('/')),
            selectedKey: pathname
        };
    };
    static onCollapse = (collapsed) => {
        return {
            collapsed,
            // firstHide: collapsed,
            mode: collapsed ? 'vertical' : 'inline'
        };
    };

    componentDidMount() {
        // this.setMenuOpen(this.props);
        let cloneRoutes = cloneDeep(routes);
        const state = SiderCustom.setMenuOpen(this.props);
        getUserMenus().then(res => {
            if(res && res.data) {
                let flattenDataSource = [];
                this.flatten(res.data, flattenDataSource);
                forEach(cloneRoutes.menus, menu => {
                    if(menu.subs && menu.subs.length) {
                        forEach(menu.subs || [], subMenu => {
                            if(subMenu) {
                                let index = findIndex(flattenDataSource, {name: subMenu.title});
                                let subsIndex = findIndex(subMenu, {title: subMenu.title });
                                if(index === -1) {
                                    menu.subs.splice(subsIndex, 1);
                                }
                            }
                        })
                    }
                });

                state.routes = cloneRoutes;
                this.setState(state);
            }
        }, err => {
            this.setState(state);
        })
    }

    flatten(list = [], flattenDataSource) {
        list.forEach(item => {
            item.id = item.id + '';
            flattenDataSource.push(item);
            this.flatten(item.children || [], flattenDataSource);
        });
    }
    menuClick = e => {
        this.setState({
            selectedKey: e.key
        });
        const { popoverHide } = this.props; // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
        popoverHide && popoverHide();
    };
    openMenu = v => {
        this.setState({
            openKey: v[v.length - 1],
            firstHide: false
        });
    };
    render() {
        const { selectedKey, openKey, firstHide, collapsed, routes } = this.state;
        return (
            <Sider
                trigger={null}
                breakpoint="lg"
                collapsed={collapsed}
                style={{ overflowY: 'auto' }}
            >

                <div className="logo" style={{lineHeight:'32px',textAlign:'center',fontSize:'12px',backgrounColor:'#000'}}>
                    {/* <img src={img} alt=""/> */}
                     后台管理系统
                </div>
                <SiderMenu
                    menus={routes.menus}
                    onClick={this.menuClick}
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    openKeys={firstHide ? null : [openKey]}
                    onOpenChange={this.openMenu}
                />
                <style>
                    {`
                    #nprogress .spinner{
                        left: ${collapsed ? '70px' : '206px'};
                        right: 0 !important;
                    }
                    `}
                </style>
            </Sider>
        );
    }
}

export default withRouter(SiderCustom);
