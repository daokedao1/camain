/**
 * Created by hao.cheng on 2017/4/16.
 */
import axios from 'axios';
import { GET, POST } from './tools';
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
//获取学校list
export const getSchoolList = (param = {}) => POST(config.GET_SCHOOL_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);

//获取用户list
export const getCaUserList = (param = {}) => POST(config.GET_CAUSER_LIST,param ).then(res=>{
    return res;
}).catch(err=>err);
