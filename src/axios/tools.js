
import axios from 'axios';
import Cookie from 'js-cookie';
import store from './../redux/store';
let query = {};
const env = process.env.NODE_ENV || 'development';
const token = 'Bearer '+Cookie.get('token');
console.log(token);

// axios.defaults.crossDomain = true;
// axios.defaults.withCredentials  = true;
/**
 * 公用get请求
 * @param url       接口地址
 * @param params       接口异常提示
 */
export const GET = (url, params = {}) => {
    if (!params) {
        params = {};
    }
    let headers = {
        'content-type': 'application/json',
        'Authorization':token
    };
    return new Promise((resolve, reject) => {
        axios({
            url,
            headers,
            params: {...params, ...query},
            method: 'get',
            withCredentials:true,
            timeout: 30000
        }).then(res => {

            if(res.status === 200){
                if (res.data.success !== true) {
                    reject(res.data);
                } else {
                    resolve(res.data);
                }
            }

            if (env === 'development') {
                console.group('调用网络接口成功');
                console.log('[请求的status]:', res.status);
                console.log('[请求的Url]:', url);
                console.log('[请求的Data]:', params);
                console.log('[请求的Result]:', res.data);
                console.groupEnd();
            }
        }).catch(error => {
            let isTimeout = JSON.stringify(error).includes('timeout') || '';
            if (isTimeout) {
                resolve({msg: '请求超时'});
            } else {
                console.error('[请求异常]:', error);
                resolve(error);
            }
        });
    });
};

/**
 * 公用post请求
 * @param url       接口地址
 * @param data      接口参数
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const POST = (url, data = {}) => {
    // query.tk = sessionStorage.getItem("accessToken") || decodeURIComponent(cookieGet('accessToken')) || ''
    // query.code = sessionStorage.getItem("accessToken") || decodeURIComponent(cookieGet('accessToken')) || ''
    // query.p = sessionStorage.getItem("source") || cookieGet('source') || ''
    // query.v = sessionStorage.getItem("version") || cookieGet('version') || ''


    if (!data) {
        data = {};
    }
    let headers = {
        'content-type': 'application/json',
        'Authorization':token
    };
    return new Promise((resolve, reject) => {
        axios({
            url,
            data,
            headers,
            params: query,
            method: 'post',
            timeout: 30000
        }).then(res => {
            if (res.data.code !== 0) {
                reject(res.data);
            } else {
                resolve(res.data);
            }

            if (env === 'development') {
                console.group('调用网络接口成功');
                console.log('[请求的status]:', res.status);
                console.log('[请求的Url]:', url);
                console.log('[请求的Data]:', data);
                console.log('[请求的Result]:', res.data);
                console.groupEnd();
            }
        }).catch(error => {
            let isTimeout = JSON.stringify(error).includes('timeout') || '';
            if (isTimeout) {
                resolve({msg: '请求超时'});
            } else {
                resolve(error);
            }
        });
    });
};

export default {
    GET,
    POST
};
