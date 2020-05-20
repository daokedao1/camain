/**
 * 路由组件出口文件
 *
 */


import Echarts from './charts/Echarts';
import Recharts from './charts/Recharts';

import Main from './main';

import Role from './Role/index.jsx'; //角色管理
import AlumniUser from './alumniUser'; // 校友
import AlumniOrg from './alumniOrg'; // 校友会
import AlumnixhOrg from './alumnixhOrg';//AlumnixhOrg
import ClassOrg from './classOrg'; // 班级
import RealNameAuthentication from './realNameAuthentication';
import Notice from './notice';
import Employment from './employee';//招聘
import Jijin from './jijinmanage';//基金
import News from './News'; //新闻
import Actions from './Actions'; //活动
import Project from './Project'; //活动
import Navigation from './Navigation';//活动
import WheelPlanting from './WheelPlanting';//活动
import Menu from './Menu';//菜单
import Donation from './donation';//捐赠
import MentorProgram from './mentor-program';//导师计划
import FeedBack from './feedback';//用户反馈
import Configure from './Configure';//用户反馈
import Recruit from './recruit'//招聘



export default {
    MentorProgram,
    Recruit,
    Employment,
    Jijin,
    Donation,
    FeedBack,

    Echarts,
    News,
    Configure,
    Recharts,

    Project,

    AlumnixhOrg,

    Actions,
    Main,
    WheelPlanting,
    Navigation,

 
    Menu,

    AlumniUser,
    AlumniOrg,
    RealNameAuthentication,
    ClassOrg,
    Role,
    Notice
};