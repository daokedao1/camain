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