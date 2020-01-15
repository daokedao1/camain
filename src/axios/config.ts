/**
 * Created by 刘旭 on 2019/11/19.
 * 接口地址配置文件
 */

//easy-mock模拟数据接口地址
import {getFullDomain} from '../utils';

const EASY_MOCK = 'https://www.easy-mock.com/mock';
const MOCK_AUTH = EASY_MOCK + '/597b5ed9a1d30433d8411456/auth'; // 权限接口地址
export const MOCK_AUTH_ADMIN = MOCK_AUTH + '/admin'; // 管理员权限接口
export const MOCK_AUTH_VISITOR = MOCK_AUTH + '/visitor'; // 访问权限接口

// github授权
export const GIT_OAUTH = 'https://github.com/login/oauth';
// github用户
export const GIT_USER = 'https://api.github.com/user';

// bbc top news
export const NEWS_BBC =
    'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=429904aa01f54a39a278a406acf50070';

const URL = getFullDomain();
let domain = 'http://bidev.mryitao.cn';
let ABdomain='http://ab-dev.mryitao.cn';
if(URL.indexOf('biman-dev.mryitao.cn ') > -1){//测试
    // ABdomain = 'http://ab-dev.mryitao.cn';
    ABdomain = 'http://ab.mryitao.cn';

}else if(URL.indexOf('ab.mryitao.cn ') > -1){//正式
    ABdomain = 'http://ab.mryitao.cn';
}else{
    ABdomain = 'http://ab.mryitao.cn';
    // ABdomain = 'http://ab-dev.mryitao.cn';
}
// let monitor='http://localhost:10000';

// ABdomain='http://172.16.242.218:58858';
// let domain = '';
// let WindControlList='http://172.16.140.29:10002';//风控
let WindControlList='http://riskman.mryitao.cn';//风控

// 数据知识
export const GET_METRICSLIST_DATA = '/venus/datamanager/fuzzyListTableMetrics';
export const LOGIN ='/venus/signup';
export const MODIFY_TABLE_DATA ='/venus/datamanager/modifyTableMetrics';
export const MODIFY_SEARCH_DATA ='/venus/datamanager/search';
export const CREATE_TABLE_DATA ='/venus/datamanager/createTableMetrics';
//AB测试
export const ABTEST_LIST_DATA =ABdomain+'/config/list';
export const ABTEST_ADD_DATA =ABdomain+'/config/bucket/add';
export const ABTEST_STATISTIC_DATA =ABdomain+'/statistic/statisticByExperimentId';
export const ABTEST_GETLISTCURRENT_DATA =ABdomain+'/config/getExperimentById';
export const ABTEST_UPDATA_DATA =ABdomain+'/config/bucket/update';

//监控配置
export const MONITOR_LIST_DATA =domain+'/venus/monitor/list';
export const MONITOR_UPDATA_DATA =domain+'/venus/monitor/updateMonitor';
export const MONITOR_CREATE_DATA =domain+'/venus/monitor/createMonitor';
//风控
export const WINDCONTROLLIST_LISTNAME_DATA =WindControlList+'/risk/manage/getMenu';
export const WINDCONTROLLIST_QUERYLIST_DATA =WindControlList+'/risk/manage/queryNameList';
export const WINDCONTROLLIST_ADDNAMELIST_DATA =WindControlList+'/risk/manage/addNameList';
export const WINDCONTROLLIST_DELETENAMELIST_DATA =WindControlList+'/risk/manage/deleteNameList';


