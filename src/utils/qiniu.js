import * as qiniu from 'qiniu-js'

// qiniu.conf.ACCESS_KEY = 'QCD7SK9ep1JmmGDFQm2cr4PddkKVHVodtMFa9P9A';
// qiniu.conf.SECRET_KEY = 'EdOOpUTsU9TXKw3GNGQX3NCBjrP6H_WYB_OZhdM5';
const bucket = 'caoos';

class QiniuService {
    static token = '';
    static config = {};
    static oss = 'http://qiniuoos.betterdao.com/';
    constructor() {
    }

    getUploadUrl = (token) => {
        return qiniu.getUploadUrl({}, token);
    }
}

export default QiniuService;