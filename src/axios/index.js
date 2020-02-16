/**
 * Created by hao.cheng on 2017/4/16.
 */
import axios from 'axios';
import { GET, POST } from './tools';
import * as config from './config';

export const getBbcNews = () => GET(config.NEWS_BBC).then(res=>res);

// export const npmDependencies = () =>
//     axios
//         .get('./npm.json')
//         .then(res => res.data)
//         .catch(err => console.log(err));
//
// export const weibo = () =>
//     axios
//         .get('./weibo.json')
//         .then(res => res.data)
//         .catch(err => console.log(err));
//
// export const gitOauthLogin = () =>
//     GET({
//         url: `${
//             config.GIT_OAUTH
//         }/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin`,
//     }).then(res=>res)
// export const gitOauthToken = code =>
//     POST(
//         `https://cors-anywhere.herokuapp.com/${config.GIT_OAUTH}/access_token`,
//         {
//             client_id: '792cdcd244e98dcd2dee',
//             client_secret: '81c4ff9df390d482b7c8b214a55cf24bf1f53059',
//             redirect_uri: 'http://localhost:3006/',
//             state: 'reactAdmin',
//             code,
//         }).then(res=>res)
// // {headers: {Accept: 'application/json'}}
// export const gitOauthInfo = access_token =>
//     GET(`${config.GIT_USER}access_token=${access_token}`).then(res=>res)

// easy-mock数据交互
// 管理员权限获取
export const getHistoryList = (param = {}) => GET(config.GEE_HISTORY_LIST,param ).then(res=>{
  
  return res
}).catch(err=>err)
