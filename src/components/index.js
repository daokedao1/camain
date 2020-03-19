/**
 * 路由组件出口文件
 *
 */

import Loadable from 'react-loadable';
import Loading from './widget/Loading';
import BasicForm from './forms/BasicForm';
import BasicTable from './tables/BasicTables';
import AdvancedTable from './tables/AdvancedTables';
import AsynchronousTable from './tables/AsynchronousTable';
import Echarts from './charts/Echarts';
import Recharts from './charts/Recharts';
import Icons from './ui/Icons';
import Buttons from './ui/Buttons';
import Spins from './ui/Spins';
import Modals from './ui/Modals';
import Notifications from './ui/Notifications';
import Tabs from './ui/Tabs';
import Banners from './ui/banners';
import Drags from './ui/Draggable';
import Dashboard from './dashboard/Dashboard';
import Gallery from './ui/Gallery';
import BasicAnimations from './animation/BasicAnimations';
import ExampleAnimations from './animation/ExampleAnimations';
import AuthBasic from './auth/Basic';
import RouterEnter from './auth/RouterEnter';
import Cssmodule from './cssmodule';
import MapUi from './ui/map';
import QueryParams from './extension/QueryParams';
//*********************


import allData from './waterData/allData.jsx';
import course from './waterData/course';
import historyData from './waterData/historyData';
import historyLine from './waterData/historyLine';
import realData from './waterData/realData';
import realLine from './waterData/realLine';
import alertSet from './waterData/alertSet';
import alertRecord from './waterData/alertRecord';
import open from './waterData/open';
import XcalertSet from './waterData/XcalertSet';
import XcAlertRecord from './waterData/XcAlertRecord';


//*************
import Main from './main';
import DataOverView from './dataoverview';

import AlumniUser from './alumniUser';
import AlumniOrg from './alumniOrg';
import ClassOrg from './classOrg';
import RealNameAuthentication from './realNameAuthentication';
import Notice from './notice';
import News from './News';//新闻
import Actions from './Actions';//活动

const WysiwygBundle = Loadable({
    // 按需加载富文本配置
    loader: () => import('./ui/Wysiwyg'),
    loading: Loading
});

export default {
    BasicForm,
    BasicTable,
    AdvancedTable,
    AsynchronousTable,
    Echarts,
    News,
    Recharts,
    Icons,
    Buttons,
    Spins,
    Modals,
    Notifications,
    Tabs,
    Banners,
    Drags,
    Dashboard,
    Gallery,
    BasicAnimations,
    ExampleAnimations,
    AuthBasic,
    RouterEnter,
    WysiwygBundle,
    Cssmodule,
    MapUi,
    QueryParams,
    Actions,
    Main,
    DataOverView,


    allData,
    course,
    historyData,
    realData,
    historyLine,
    realLine,
    alertSet,
    alertRecord,
    open,
    XcAlertRecord,
    XcalertSet,

    AlumniUser,
    AlumniOrg,
    RealNameAuthentication,
    ClassOrg,
    Notice
};
