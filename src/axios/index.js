/**
 * Created by hao.cheng on 2017/4/16.
 */
import axios from 'axios';
import { GET, POST,DEL,PUT } from './tools';
import * as config from './config';

export const getBbcNews = () => GET(config.NEWS_BBC).then(res=>res);

// 管理员权限获取
export const getHistoryList = (param = {}) => GET(config.GEE_HISTORY_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);

//登录
export const login = (param = {}) => POST(config.LOGIN_URL,param ).then(res=>{
    return res;
}).catch(err=>err);
//获取组织
export const getAlumniOrg = (param = {}) => POST(config.GET_ALUMNI_ORG,param ).then(res=>{
    return res;
}).catch(err=>err);
//获取组织by id
export const getAlumniById = (param = {}) => GET(config.GET_ALUMNIBYID+param.id,{} ).then(res=>{
    return res;
}).catch(err=>err);
//新增组织
export const addAlumni = (param = {}) => POST(config.ADD_ALUMNI,param ).then(res=>{
    return res;
}).catch(err=>err);
//更新组织by id
export const updateAlumniById = (param = {}) => POST(config.UPDATE_ALUMNIBYID,param ).then(res=>{
    return res;
}).catch(err=>err);
//删除组织by id
export const delAlumniById = (param = {}) => POST(config.DEL_ALUMNIBYID+param.id,{} ).then(res=>{
    return res;
}).catch(err=>err);
//查询全部协会待审核信息
export const getAlumniAuditList = (param = {}) => POST(config.GET_ALUMNI_AUDIT_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);
////审核通过加入协会（id为待审核记录ID）
export const AlumniAuditPass = (param = {}) => GET(config.OPT_ALUMNI_AUDIT_PASS+param,{} ).then(res=>{
    return res;
}).catch(err=>err);
//驳回加入协会申请（id为待审核记录ID）
export const AlumniAuditRefuse = (param = {}) => GET(config.OPT_ALUMNI_AUDIT_PASS+param,{} ).then(res=>{
    return res;
}).catch(err=>err);

//获取学校list
export const getSchoolList = (param = {}) => POST(config.GET_SCHOOL_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);

// 用户模块
//获取用户list
export const getCaUserList = (param = {}) => POST(config.GET_CAUSER_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);
// 获取用户的菜单
export const getUserMenus = (param = {}) => GET(config.GET_USER_MENUS,param ).then(res=>{
    return res;
}).catch(err=>err);
// 更新用户
export const putUser = (param = {}) =>PUT(config.USER, param ).then(res=>{
    return res;
}).catch(err=>err);


//获取文章list
export const getArticleList = (param = {}) => POST(config.GET_ARTICLE_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);
//新建文章list
export const addArticleList = (param = {}) => POST(config.ADD_ARTICLE_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);
//编辑文章
export const editArticleList = (param = {}) => PUT(config.ADD_ARTICLE_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);
//删除文章list
export const delArticleList = (param = {}) => DEL(config.DEL_ARTICLE_LIST+''+param.id ).then(res=>{
    return res;
}).catch(err=>err);
//发布文章
export const pubArticleByid = (param = {}) => PUT(config.PUBLISH_ARTICLE_BYID+param.id ).then(res=>{
    return res;
}).catch(err=>err);
//撤回文章
export const retArticleByid = (param = {}) => PUT(config.RETRACT_ARTICLE_BYID+param.id ).then(res=>{
    return res;
}).catch(err=>err);
//查询置顶文章
export const getTopArticleList = (param = {}) => POST(config.TOPLIST_ARTICLE_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);

//置顶活动
export const topArticlesList = (param = {}) => PUT(config.LISTTOP_ARTICLE_LIST+'/'+param.id+'/top' ).then(res=>{
    return res;
}).catch(err=>err);
export const unpinArticlesList = (param = {}) => PUT(config.LISTTOP_ARTICLE_LIST+'/'+param.id+'/unpin' ).then(res=>{
    return res;
}).catch(err=>err);
//活动列表
export const activityList = (param = {}) => POST(config.LIST_ACTIVITY_LIST ).then(res=>{
    return res;
}).catch(err=>err);

export const topListActivityList = (param = {}) => POST(config.TOPLIST_ARTICLE_LIST ).then(res=>{
    return res;
}).catch(err=>err);

export const addActivityList = (param = {}) => POST(config.ADD_ACTIVITY_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);
export const editActivityList = (param = {}) => PUT(config.ADD_ACTIVITY_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);
export const listTopActivityList = (param = {}) => POST(config.LISTTOP_PROJECT_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);
//删除文章list
export const delActivityList = (param = {}) => DEL(config.DEL_ACTIVITY_LIST+''+param.id ).then(res=>{
    return res;
}).catch(err=>err);
//发布活动
export const publishActivityList = (param = {}) => PUT(config.PUBLISTH_ACTIVITY_LIST+param.id ).then(res=>{
    return res;
}).catch(err=>err);
//撤回活动
export const retractActivityList = (param = {}) => PUT(config.RETRACT_ACTIVITY_LIST+param.id ).then(res=>{
    return res;
}).catch(err=>err);
//置顶活动
export const topActivityList = (param = {}) => PUT(config.TOP_ACTIVITY_LIST+'/'+param.id+'/top' ).then(res=>{
    return res;
}).catch(err=>err);
export const unpinActivityList = (param = {}) => PUT(config.TOP_ACTIVITY_LIST+'/'+param.id+'/unpin' ).then(res=>{
    return res;
}).catch(err=>err);
//发布项目
export const publishProjectList = (param = {}) => PUT(config.PUBLISH_PROJECT_LIST+param.id ).then(res=>{
    return res;
}).catch(err=>err);
//撤回项目
export const retractProjectList = (param = {}) => PUT(config.RETRACT_PROJECT_LIST+param.id ).then(res=>{
    return res;
}).catch(err=>err);
//轮播图
export const bannerList = (param = {}) => POST(config.BANNER_ACTIVITY_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);
export const addBannerList = (param = {}) => POST(config.ADD_BANNER_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);
//删除
export const delBannerList = (param = {}) => DEL(config.DEL_BANNER_LIST+param.id,param ).then(res=>{
    return res;
}).catch(err=>err);
export const editBannerList = (param = {}) => PUT(config.ADD_BANNER_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);
//主页导航
export const navBannerList = (param = {}) => POST(config.NAV_ACTIVITY_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);
export const addNavList = (param = {}) => POST(config.ADD_NAV_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);
export const editNavList = (param = {}) => PUT(config.ADD_NAV_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);
export const delNavList = (param = {}) => DEL(config.DEL_NAV_LIST+param.id ).then(res=>{
    return res;
}).catch(err=>err);
//角色模块
export const listRoleList = (param = {}) => GET(config.LIST_ROLE_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);
export const addtRoleList = (param = {}) => POST(config.ADD_ROLE_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);
export const delRoleList = (param = {}) => DEL(config.DEL_ROLE_LIST+param.id ).then(res=>{
    return res;
}).catch(err=>err);
export const editRoleList = (param = {}) => PUT(config.ADD_ROLE_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);
    // 权限关联用户
    export const roleAssociateUsers = (id, param = {}) => POST(`${config.ADD_ROLE_LIST}/${id}/users`, param).then(res=>{
        return res;
    }).catch(err=>err);
    // 获取角色关联的用户
    export const getRoleAssociateUsers = (id, param = {}) => GET(`${config.ADD_ROLE_LIST}/${id}/users`, param).then(res=>{
        return res;
    }).catch(err=>err);

    export const roleAssociateMenus = (id, param = {}) => POST(`${config.MENU_ROLE_LIST.replace(':id', id)}`, param).then(res=>{
        return res;
    }).catch(err=>err);

    export const getRoleAssociateMenus = (id, param = {}) => GET(`${config.MENU_ROLE_LIST.replace(':id', id)}`, param).then(res=>{
        return res;
    }).catch(err=>err);
//菜单
export const addMenuList = (param = {}) => POST(config.ADD_MENU_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);
export const listMenuList = (param = {}) => POST(config.LIST_MENU_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);
export const editMenuList = (param = {}) => PUT(config.ADD_MENU_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);
export const delMenuList = (param = {}) => PUT(config.DEL_MENU_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);
export const treeMenuList = (param = {}) => GET(config.TREE_MENU_ALL, param).then(res=>{
    return res;
}).catch(err=>err);
//系统配置
export const updateConfigBykey = (param = {}) => PUT(config.UPDATE_configBYID,param ).then(res=>{
    return res;
}).catch(err=>err);
export const getConfigBykey = (param = {}) => GET(config.GET_CONFIGBYKEY+param,{} ).then(res=>{
    return res;
}).catch(err=>err);
//用户反馈
export const getFeedBackList = (param = {}) => POST(config.GET_FEEDBACK_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);
//处理用户反馈
export const setFeedBackOk = (param = {}) => PUT(config.SET_FEEDBACK_OK+param.id ).then(res=>{
    return res;
}).catch(err=>err);
//项目列表
export const projectyList = (param = {}) => POST(config.LIST_PROJECT_LIST ).then(res=>{
    return res;
}).catch(err=>err);
export const addProjectList = (param = {}) => POST(config.ADD_PROJECT_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);
export const editProjectList = (param = {}) => PUT(config.ADD_PROJECT_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);
export const delProjectList = (param = {}) => DEL(config.DEL_PROJECT_LIST+param.id,param ).then(res=>{
    return res;
}).catch(err=>err);
//配置管理
export const delConfigList = (param = {}) => DEL(config.DEL_CONFIG_LIST+param.id,param ).then(res=>{
    return res;
}).catch(err=>err);
export const addCongifList = (param = {}) => POST(config.ADD_CONFIG_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);
export const CongifListData = (param = {}) => GET(config.LIST_CONFIG_LIST ).then(res=>{
    return res;
}).catch(err=>err);
export const editConfigList = (param = {}) => PUT(config.ADD_CONFIG_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);