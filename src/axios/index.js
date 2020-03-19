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

//获取用户list
export const getCaUserList = (param = {}) => POST(config.GET_CAUSER_LIST,param ).then(res=>{
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
//新建文章list
export const editArticleList = (param = {}) => PUT(config.ADD_ARTICLE_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);
//删除文章list
export const delArticleList = (param = {}) => DEL(config.DEL_ARTICLE_LIST+''+param.id ).then(res=>{
    return res;
}).catch(err=>err);
//活动列表
export const activityList = (param = {}) => POST(config.LIST_ACTIVITY_LIST ).then(res=>{
    return res;
}).catch(err=>err);
export const addActivityList = (param = {}) => POST(config.ADD_ACTIVITY_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);
export const editActivityList = (param = {}) => PUT(config.ADD_ACTIVITY_LIST,param ).then(res=>{
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
