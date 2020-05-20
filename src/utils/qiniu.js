import * as qiniu from 'qiniu-js'

qiniu.conf.ACCESS_KEY = 'QCD7SK9ep1JmmGDFQm2cr4PddkKVHVodtMFa9P9A';
qiniu.conf.SECRET_KEY = 'EdOOpUTsU9TXKw3GNGQX3NCBjrP6H_WYB_OZhdM5';
const bucket = 'caoos';

export const getToken = () => {
    const putPolicy = new qiniu.rs.PutPolicy({
        scope: bucket
    });
    return putPolicy.uploadToken();
}