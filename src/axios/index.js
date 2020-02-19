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