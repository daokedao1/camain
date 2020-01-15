/**
 * Created by hao.cheng on 2017/4/16.
 */
import axios from 'axios';
import {  post,GET, POST,POST1 } from './tools';
import * as config from './config';


export const npmDependencies = () =>
    axios
        .get('./npm.json')
        .then(res => res.data)
        .catch(err => console.log(err));

export const weibo = () =>
    axios
        .get('./weibo.json')
        .then(res => res.data)
        .catch(err => console.log(err));

export const gitOauthToken = (code: string) =>
    post({
        url: `https://cors-anywhere.herokuapp.com/${config.GIT_OAUTH}/access_token`,
        data: {
            client_id: '792cdcd244e98dcd2dee',
            client_secret: '81c4ff9df390d482b7c8b214a55cf24bf1f53059',
            redirect_uri: 'http://localhost:3006/',
            state: 'reactAdmin',
            code
        }
    });
// {headers: {Accept: 'application/json'}}
// easy-mock数据交互
// 管理员权限获取
// export const admin = () => GET({ url: config.MOCK_AUTH_ADMIN });
// 访问权限获取
// export const guest = () => GET({ url: config.MOCK_AUTH_VISITOR });
//登录


export const loginUrl = (param={}) => POST1(config.LOGIN,param ).then(res=>{
    return res;
}).catch(err=>err);
// 数据知识_指标管理
export const metricsTable = (param = {page:1000}) => POST(config.GET_METRICSLIST_DATA+param.page,param ).then(res=>{
    return res;
}).catch(err=>err);
export const modifyTableMetrics = (param = {}) => POST(config.MODIFY_TABLE_DATA,param ).then(res=>{
    return res;
}).catch(err=>err);
export const modifySearch = (param = {}) => POST1(config.MODIFY_SEARCH_DATA,param ).then(res=>{
    return res;
}).catch(err=>err);
export const modifyCreate = (param = {}) => POST(config.CREATE_TABLE_DATA,param ).then(res=>{
    return res;
}).catch(err=>err);

export const abTestList = (param = {}) => POST(config.ABTEST_LIST_DATA,param ).then(res=>{
    return res;
}).catch(err=>err);
export const abTestAddData = (param = {}) => POST(config.ABTEST_ADD_DATA,param ).then(res=>{
    return res;
}).catch(err=>err);
export const abTestStatisticData = (param = {}) => POST(config.ABTEST_STATISTIC_DATA,param ).then(res=>{
    return res;
}).catch(err=>err);
export const abTestCurrentData = (param = {}) => POST(config.ABTEST_GETLISTCURRENT_DATA,param ).then(res=>{
    return res;
}).catch(err=>err);
export const abTestUpdataData = (param = {}) => POST(config.ABTEST_UPDATA_DATA,param ).then(res=>{
    return res;
}).catch(err=>err);
//监控配置
export const monitorList = (param = {}) => GET(config.MONITOR_LIST_DATA,param ).then(res=>{
    return res;
}).catch(err=>err);
export const monitorUpdata = (param = {}) => POST(config.MONITOR_UPDATA_DATA,param ).then(res=>{
    return res;
}).catch(err=>err);
export const monitorCreate = (param = {}) => POST(config.MONITOR_CREATE_DATA,param ).then(res=>{
    return res;
}).catch(err=>err);
//风控
export const windControlListListName = (param = {}) => POST(config.WINDCONTROLLIST_LISTNAME_DATA,param ).then(res=>{
    return res;
}).catch(err=>err);
export const windControlQueryList= (param = {}) => POST(config.WINDCONTROLLIST_QUERYLIST_DATA,param ).then(res=>{
    return res;
}).catch(err=>err);
export const windControlAddNameList= (param = {}) => POST(config.WINDCONTROLLIST_ADDNAMELIST_DATA,param ).then(res=>{
    return res;
}).catch(err=>err);
export const windControlDeleteNameList= (param = {}) => POST(config.WINDCONTROLLIST_DELETENAMELIST_DATA,param ).then(res=>{
    return res;
}).catch(err=>err);