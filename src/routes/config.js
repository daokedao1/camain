export default {
    menus: [
        // 菜单相关路由
        { key: '/app/dashboard/index', title: '首页', icon: 'mobile',
            subs:[
                { key: '/app/waterData/main', title: '地图', component: 'Main' }
            ]
        },
        {
            key: '/app/operate', title: '校友管理',icon: 'area-chart',
            subs: [
                { key: '/app/alumni/realNameAuthentication', title: '注册/审核', component: 'allData' },

                { key: '/app/alumni/user', title: '校友管理', component: 'AlumniUser' },

                { key: '/app/alumni/organization', title: '校友会管理', component: 'AlumniOrg' },
                { key: '/app/waterData/course', title: '院系组织', component: 'course' }

            ]},
        {
            key: '/app/dashboard/index', title: '运营管理', icon: 'mobile',
            subs:[
                { key: '/app/waterData/222', title: '公告管理', component: 'Gallery' },
                { key: '/app/waterData/main', title: '新闻管理', component: 'Main' },
                { key: '/app/waterData/main', title: '活动管理', component: 'Main' },
                { key: '/app/waterData/main', title: '招聘管理', component: 'Main' },
                { key: '/app/waterData/main', title: '基金管理', component: 'Main' },
                { key: '/app/waterData/main', title: '校园捐赠', component: 'Main' }
            ]
        },
        {
            key: '/app/dashboard/index', title: '数据统计', icon: 'mobile',
            subs:[
                { key: '/app/waterData/main', title: '地图', component: 'Main' }
            ]
        },
        {
            key: '/app/dashboard/index', title: '财务统计', icon: 'mobile',
            subs:[
                { key: '/app/waterData/main', title: '流水', component: 'Echarts' }
            ]
        },
        {
            key: '/app/other', title: '平台管理',icon: 'scan',
            subs:[
                { key: '/app/operate/main', title: '用户管理', component: 'open' },
                { key: '/app/operate/overview1', title: '角色管理', component: 'open' },
                { key: '/app/operate/overview1', title: '菜单管理', component: 'open' },
                { key: '/app/operate/overview2', title: '组织管理', component: 'open' },
                { key: '/app/operate/overview2', title: '首页配置', component: 'open' }
            ]
        }

    ],
    others: [] // 非菜单相关路由
};
