export default {
    menus: [
        // 菜单相关路由
        {
            key: '/app/dashboard/index',
            title: '首页',
            icon: 'mobile',
            subs: [
                { key: '/app/waterData/main', title: '主页面', component: 'Main' }
            ]
        },
        {
            key: '/app/alumni',
            title: '校友相关管理',
            icon: 'area-chart',
            subs: [
                { key: '/app/alumni/realNameAuthentication', title: '入会审核', component: 'RealNameAuthentication' },

                { key: '/app/alumni/user', title: '校友管理', component: 'AlumniUser' },

                { key: '/app/alumni/organization', title: '校友会管理', component: 'AlumniOrg' },
                { key: '/app/alumni/AlumnixhOrg', title: '校友协会管理', component: 'AlumnixhOrg' },
                { key: '/app/alumni/class', title: '院系班级管理', component: 'ClassOrg' }

            ]
        },
        {
            key: '/app/operate',
            title: '运营管理',
            icon: 'mobile',
            subs: [
                { key: '/app/config/nav', title: '首页轮播图', component: 'Navigation' },
                { key: '/app/operate/notice', title: '公告管理', component: 'Notice' },
                { key: '/app/operate/news', title: '新闻管理', component: 'News' },
                { key: '/app/operate/Actions', title: '活动管理', component: 'Actions' },
                
                { key: '/app/operate/Project', title: '项目管理', component: 'Project' },
                { key: '/app/operate/Jijin', title: '基金管理', component: 'Jijin' },
                { key: '/app/operate/MentorProgram', title: '导师计划', component: 'MentorProgram' },
                { key: '/app/operate/FeedBack', title: '用户反馈', component: 'FeedBack' },
                { key: '/app/operate/Recruit', title: '招聘管理', component: 'Recruit' },
                { key: '/app/operate/Donation', title: '校园捐赠', component: 'Donation' }
            ]
        },
        {
            key: '/app/dashboard/index44',
            title: '数据统计',
            icon: 'mobile',
            subs: [
                { key: '/app/waterData/main4', title: '地图', component: 'Main' }
            ]
        },
        {
            key: '/app/dashboard/index33',
            title: '财务统计',
            icon: 'mobile',
            subs: [
                { key: '/app/waterData/main5', title: '流水', component: 'Echarts' }
            ]
        },
        {
            key: '/app/config',
            title: 'APP管理',
            icon: 'scan',
            subs: [
                { key: '/app/config/wheelPlanting', title: '主页导航', component: 'WheelPlanting' },
                { key: '/app/config/Configure', title: '配置管理', component: 'Configure' },
            ]
        },
        {
            key: '/app/sys',
            title: '系统管理',
            icon: 'scan',
            subs: [
                // { key: '/app/operate/main', title: '用户管理', component: 'User' },
                { key: '/app/operate/Role', title: '角色管理', component: 'Role' },
                { key: '/app/operate/Menu', title: '菜单管理', component: 'Menu' }
                // { key: '/app/operate/overview2', title: '组织管理', component: 'open' },
                // { key: '/app/operate/overview2', title: '首页配置', component: 'open' }
            ]
        }

    ],
    others: [] // 非菜单相关路由
};