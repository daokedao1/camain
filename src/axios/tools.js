

import axios from 'axios';
let query  = {}

const domain = 'http://39.98.215.185:8088';
// const domain = 'http://127.0.0.1:8088';
const env = process.env.NODE_ENV || 'development'
/**
 * 公用get请求
 * @param url       接口地址
 * @param params       接口异常提示
 */
 export const GET = (url, params = {}) => {
     // console.log(store)
     if (!params) {
         params = {}
     }
     let headers = {
         "content-type": "application/json",
     }
     let fullurl = domain+url
     return new Promise((resolve, reject) => {
         axios({
             url,
             headers,
             params: params,
             method: 'get',
             timeout: 30000
         }).then(res => {
            if(res.status === 200){
              if (res.data.code === 200 || res.data.status == "0" ||res.data.success == true) {
                resolve(res.data)

              } else {
                reject(res.data)

              }
            }else if(res.status === 403){

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
             let isTimeout = JSON.stringify(error).includes('timeout') || ''
             if (isTimeout) {
                 resolve({msg: '请求超时'})
             } else {
                  console.error('[请求异常]:', error);
                 resolve(error)
             }
         })
     })
 }


/**
 * 公用post请求
 * @param url       接口地址
 * @param data      接口参数
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
 export const POST = (url, data = {},header,flag) => {

    let ruquest;
     if (!data) {
         data = {}
     }
     let headers = {
        "Content-Type": "application/json",
         "Authorization":header
     };


     return new Promise((resolve, reject) => {
        ruquest=axios.post( domain+url, data, {
            headers
          });
          ruquest.then(function(res) {

            if (res.data.code === 200 || res.data.status == "0" ||res.data.success !== true) {
              resolve(res.data);
            } else {
              reject(res.data);
            }
                 if (env === 'development') {
                     console.group('调用网络接口成功');
                     console.log('[请求的Url]:', url);
                     console.log('[请求的Data]:', data);
                     console.log('[请求的Result]:', res.data);
                     console.groupEnd();
                 }
          })
          .catch(function(error) {
            // handle error
            console.log(error);
          })
          .then(function() {
            // always executed
          });

     })
 }

 export default {
     GET,
     POST
 }
