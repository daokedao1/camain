/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import {projectDefault} from '../redux/common';
import routes from '../routes/config';
import {cloneDeep, forEach, find, findIndex} from 'lodash';
import SiderMenu from './SiderMenu';
import {getUserMenus} from '@/axios';
import Storage from '../utils/localStorage';
import UserRes from './pages/serve';

const { Sider } = Layout;

console.log(routes);

class SiderCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateRoutes: {menus: [], others: []}
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

    componentWillMount() {

    }

    componentDidMount() {
        // this.setMenuOpen(this.props);
        let cloneRoutes = cloneDeep(routes);
        const {stateRoutes} = this.state;
        console.log('cloneRoutes', cloneRoutes);
        
        const state = SiderCustom.setMenuOpen(this.props);
        // 先hack一下，后面看如何用react-redux
        // 原来的路由建立的有问题，不用react-redux无法处理数据传递的问题
        setTimeout(() => {
           const userRes = Storage.get('userRes');
        })
        getUserMenus().then(res => {
            if(res && res.data) {
                let flattenDataSource = [];
                this.flatten(res.data, flattenDataSource);
                // 先最简单让功能看起来实现
                // 只判断父级有菜单，就全部显示出来，后台返回的菜单跟前端根本无法对应，现在只能通过名字去判断
                const newRoutes = [];
                forEach(cloneRoutes.menus, menu => {
                    let index = findIndex(flattenDataSource, {name: menu.title});
                    if(index !== -1) {
                        newRoutes.push(menu);
                    }
                    // forEach(menu.subs || [], subMenu => {
                    //     if(subMenu) {
                    //         let index = findIndex(flattenDataSource, {path: subMenu.key});
                    //         let subsIndex = findIndex(menu.subs, {key: subMenu.key });
                    //         if(index === -1) {
                    //             menu.subs.splice(subsIndex, 1);
                    //         }
                    //     }
                    // })
                    
                });
                
                stateRoutes.menus = newRoutes;
                this.setState({stateRoutes, ...state});
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

    render() {
        const {collapsed, stateRoutes } = this.state;
        console.log(stateRoutes);
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
                    menus={stateRoutes.menus}
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
