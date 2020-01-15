/**
 * 路由组件出口文件
 * yezi 2018年6月24日
 */
import React, { Component } from 'react';
import Loadable from 'react-loadable';
import Loading from '../components/widget/Loading';
import ABtest from '@/pages/ABtest';
import ABtestDetile from '@/pages/ABtest/Detile';
import MetricsList from '@/pages/dataManager/MetricsList';
import WindControlList from '@/pages/WindControlList';
import Monitor from '@/pages/Monitor';
//菜单权限
import GroupManagerList from '@/pages/static/MenuPermissions/GroupManagerList';
import MenuManager from '@/pages/static/MenuPermissions/MenuManager';
import RoleAllocationList from '@/pages/static/MenuPermissions/RoleAllocationList';
import RoleManagerList from '@/pages/static/MenuPermissions/RoleManagerList';
import UserManagerList from '@/pages/static/MenuPermissions/UserManagerList';
//数据知识
import DataSearch from '@/pages/static/DataKnowledge/DataSearch';
import MarketList from '@/pages/static/DataKnowledge/MarketList';
import TagManage from '@/pages/static/DataKnowledge/TagManage';
import TagMapping from '@/pages/static/DataKnowledge/TagMapping';
import HiveTableList from '@/pages/static/DataKnowledge/HiveTableList';
//数据工具

import CHManager from '@/pages/static/DataTool/CHManager';

import LightHouse from '@/pages/static/DataTool/LightHouse';
let allAssembl: any={
    MetricsList,
    ABtest,
    WindControlList,
    Monitor,
    GroupManagerList,
    MenuManager,
    RoleAllocationList,
    RoleManagerList,
    UserManagerList,
    DataSearch,
    MarketList,
    TagManage,
    TagMapping,
    HiveTableList,
    LightHouse,
    CHManager,
    ABtestDetile
};

export default allAssembl;
