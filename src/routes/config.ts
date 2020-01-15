export interface IFMenuBase {
    key: string;
    title: string;
    icon?: string;
    component?: string;
    query?: string;
    auth?: string;
    route?: string;
    exact?:boolean;
    /** 是否登录校验，true不进行校验（访客） */
    login?: boolean;
}

export interface IFMenu extends IFMenuBase {
    subs?: IFMenu[];
}

const menus: {
    menus: IFMenu[];
    others: IFMenu[] | [];
    [index: string]: any;
} = {
    menus: [
        {
            key: '/app/MenuPermissions',
            title: '菜单权限',
            exact: true,
            icon: 'solution',
            subs: [
                { key: '/app/MenuPermissions/MenuManager', title: '菜单维护', component: 'MenuManager' },
                { key: '/app/MenuPermissions/GroupManagerList', title: '群组维护', component: 'GroupManagerList' },
                { key: '/app/MenuPermissions/RoleManagerList', title: '角色维护', component: 'RoleManagerList' },
                { key: '/app/MenuPermissions/RoleAllocationList', title: '角色分配', component: 'RoleAllocationList' },
                { key: '/app/MenuPermissions/UserManagerList', title: '用户管理', component: 'UserManagerList' }
            ]
        },
        {
            key: '/app/Monitor',
            title: '数据监控',
            icon: 'area-chart',
            exact: false,
            component: 'Monitor',
            subs: [
                { key: '/app/Monitor', title: '监控配置', component: 'Monitor' }
            ]
        },
        {
            key: '/app/DataTool',
            title: '数据工具',
            exact: false,

            icon: 'sliders',
            subs: [
                { key: '/app/DataTool/CHManager', title: 'CK工具', component: 'CHManager' },
                { key: '/app/DataTool/LightHouse', title: 'LightHouse', component: 'LightHouse' }
            ]
        },
        {
            key: '/app/WindControlList',
            title: '风控设置',
            icon: 'copy',
            exact: false,

            component: 'WindControlList',
            subs: [
                { key: '/app/WindControlList', title: '黑白名单', component: 'WindControlList' }
            ]
        },
        {
            key: '/app/ABtest',
            title: 'AB测试',
            exact: false,
            icon: 'safety',
            component: 'ABtest',
            subs: [
                { key: '/app/ABtest', title: 'AB测试', component: 'ABtest' }
            ]
        },


        {
            key: '/app/DataKnowledge',
            title: '数据知识',
            exact: false,
            icon: 'radar-chart',
            subs: [
                { key: '/app/DataKnowledge/DataSearch', title: '数据检索', component: 'DataSearch' },
                { key: '/app/DataKnowledge/MetricsList', title: '指标管理', component: 'MetricsList' },
                { key: '/app/DataKnowledge/MarketList', title: '集市管理', component: 'MarketList' },
                { key: '/app/DataKnowledge/TagManage', title: '标签管理', component: 'TagManage' },
                { key: '/app/DataKnowledge/TagMapping', title: '标签映射', component: 'TagMapping' },
                { key: '/app/DataKnowledge/HiveTableList', title: '表管理', component: 'HiveTableList' }
            ]
        }

    ],
    others: [
        {
            key: '/app/ABtestDetile',
            title: 'AB测试详情',
            icon: 'safety',
            component: 'ABtestDetile'
        }
    ] // 非菜单相关路由
};

export default menus;
