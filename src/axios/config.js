/**
 * Created by 叶子 on 2017/7/30.
 * 接口地址配置文件
 */

//easy-mock模拟数据接口地址
const EASY_MOCK = 'https://www.easy-mock.com/mock';
const MOCK_AUTH = EASY_MOCK + '/597b5ed9a1d30433d8411456/auth'; // 权限接口地址
export const MOCK_AUTH_ADMIN = MOCK_AUTH + '/admin'; // 管理员权限接口
export const MOCK_AUTH_VISITOR = MOCK_AUTH + '/visitor'; // 访问权限接口

// github授权
export const GIT_OAUTH = 'https://github.com/login/oauth';
// github用户
export const GIT_USER = 'https://api.github.com/user';

// bbc top news
export const NEWS_BBC ='https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=429904aa01f54a39a278a406acf50070';

const domain = 'http://47.105.149.158:8090';


export const GEE_HISTORY_LIST = domain+'/api/alarmlog/list';
//登录
export const LOGIN_URL = domain+'/auth/login';
//系统配置
export const UPDATE_configBYID = domain+'/api/config';
export const GET_CONFIGBYKEY = domain+'/api/config/key/';
//组织
export const GET_ALUMNI_ORG = domain+'/api/alumni/page';//校友组织
export const GET_ALUMNIBYID = domain+'/api/alumni/detail/';//校友组织by id /api/alumni/detail/{id}
export const UPDATE_ALUMNIBYID = domain+'/api/alumni/update';//校友组织by id
export const DEL_ALUMNIBYID = domain+'/api/alumni/delete/';//删除组织by id /api/alumni/delete/{alumniId}
export const ADD_ALUMNI = domain+'/api/alumni/create';// 新增校友组织  /api/alumni/create
export const GET_ALUMNI_AUDIT_LIST = domain+'/api/alumni/query/audit/all';//查询全部协会待审核信息
export const OPT_ALUMNI_AUDIT_PASS = domain+'/api/alumni/audit/pass/';//审核通过加入协会（id为待审核记录ID）
export const OPT_ALUMNI_AUDIT_REFUSE = domain+'/api/alumni/audit/exit/';//驳回加入协会申请（id为待审核记录ID）
//学校
export const GET_SCHOOL_LIST = domain+'/api/school/page';//学校list
//用户

export const GET_CAUSER_LIST = domain+'/api/user/page';//用户list

//文章
export const GET_ARTICLE_LIST = domain+'/api/article/page';//文章articlelist
export const ADD_ARTICLE_LIST = domain+'/api/article';//新建文章
export const DEL_ARTICLE_LIST = domain+'/api/article/';//删除文章
export const PUBLISH_ARTICLE_BYID = domain+'/api/article/publish/';//发布文章
export const RETRACT_ARTICLE_BYID = domain+'/api/article/retract/';//撤回文章
//活动
export const LIST_ACTIVITY_LIST = domain+'/api/activity/page';//活动列表
export const ADD_ACTIVITY_LIST = domain+'/api/activity';//新建活动
export const DEL_ACTIVITY_LIST = domain+'/api/activity/';//删除活动
export const PUBLISTH_ACTIVITY_LIST = domain+'/api/activity/publish/';//发布活动
export const RETRACT_ACTIVITY_LIST = domain+'/api/activity/retract/';//撤回活动
//banner图
export const BANNER_ACTIVITY_LIST = domain+'/api/home/banner/page';//轮播图列表
export const ADD_BANNER_LIST = domain+'/api/home/banner';//新建
export const DEL_BANNER_LIST = domain+'/api/home/banner/';//新建
//主页导航
export const NAV_ACTIVITY_LIST = domain+'/api/home/guide/page';//列表
export const ADD_NAV_LIST = domain+'/api/home/guide';//新建
export const DEL_NAV_LIST = domain+'/api/home/guide/';//新建
//角色
export const ADD_ROLE_LIST = domain+'/api/role';//新建
export const LIST_ROLE_LIST = domain+'/api/role/all';//新建
export const DEL_ROLE_LIST = domain+'/api/role/';//新建
//菜单
export const ADD_MENU_LIST = domain+'/api/menu';//新建
export const LIST_MENU_LIST = domain+'/api/menu/list';//新建
export const DEL_MENU_LIST = domain+'/api/menu/';//新建
//用户反馈
export const GET_FEEDBACK_LIST = domain+'/api/feedback/page';//list
export const SET_FEEDBACK_OK = domain+'/api/feedback/';//处理反馈意见









