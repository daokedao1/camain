/**
 * Created by 叶子 on 2017/7/30.
 * http通用工具函数
 */
import axios from 'axios';
import { message } from 'antd';
import { Url } from 'url';

interface IFRequestParam {
    url: string;
    msg?: string;
    config?: any;
    data?: any;
    success?:any;
    headers?:any;
    params?:any;
    method?: 'post',
    withCredentials?:any,
    timeout?: Number
}
/**
 * 公用get请求
 * @param url       接口地址
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */

/**
 * 公用post请求
 * @param url       接口地址
 * @param data      接口参数
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const post = ({ url, data, msg = '接口异常', config }: IFRequestParam) =>
    axios
        .post(url, data, config)
        .then(res => res.data)
        .catch(err => {
            console.log(err);
            message.warn(msg);
        });
let query = {};
const env = process.env.NODE_ENV || 'development';
const qs = require('qs');

// axios.defaults.crossDomain = true;
// axios.defaults.withCredentials  = true;
/**
         * 公用get请求
         * @param url       接口地址
         * @param params       接口异常提示
         */

export const GET = (url='', params = {}) => {
    // console.log(store)
    if (!params) {
        params = {};
    }
    let headers = {
        'content-type': 'application/json'
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

export const POST1 = (url :string, data :Object ) => {
    // query.tk = sessionStorage.getItem("accessToken") || decodeURIComponent(cookieGet('accessToken')) || ''
    // query.code = sessionStorage.getItem("accessToken") || decodeURIComponent(cookieGet('accessToken')) || ''
    // query.p = sessionStorage.getItem("source") || cookieGet('source') || ''
    // query.v = sessionStorage.getItem("version") || cookieGet('version') || ''

    if (!data) {
        data = {};
    }
    let headers = {
        'content-type': 'application/x-www-form-urlencoded'
        // 'content-type': 'application/json'
    };
    let handle=qs.stringify(data);
    return new Promise((resolve, reject) => {
        axios({
            url,
            data:handle,
            headers,
            params: query,
            method: 'post',
            withCredentials:true,
            timeout: 30000
        }).then(res=> {
            if (res.data.code !== 0) {
                reject(res.data);
            } else {

                message.error('This is an error message');

                resolve(res.data);
            }

            if (env === 'development') {
                // console.group('调用网络接口成功');
                // console.log('[请求的status]:', res.status);
                // console.log('[请求的Url]:', url);
                // console.log('[请求的Data]:', data);
                // console.log('[请求的Result]:', res.data);
                // console.groupEnd();
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
export const POST = (url='', data = {}) => {
    // query.tk = sessionStorage.getItem("accessToken") || decodeURIComponent(cookieGet('accessToken')) || ''
    // query.code = sessionStorage.getItem("accessToken") || decodeURIComponent(cookieGet('accessToken')) || ''
    // query.p = sessionStorage.getItem("source") || cookieGet('source') || ''
    // query.v = sessionStorage.getItem("version") || cookieGet('version') || ''

    if (!data) {
        data = {};
    }
    let headers = {
        'content-type': 'application/json'
    };
    return new Promise((resolve, reject) => {
        axios({
            url,
            data,
            headers,
            // withCredentials:true,
            // params: query,
            method: 'post',
            timeout: 30000
        }).then(res => {
            if (res.data.code === 0||res.data.success) {
                resolve(res.data);
            } else {
                message.error(res.data.msg);
                reject(false);
                // message.success(res.data.msg);
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
