import cookie from 'js-cookie'


export const queryString = () => {
    let _queryString = {};
    const _query = window.location.search.substr(1);
    const _vars = _query.split('&');
    _vars.forEach((v, i) => {
        const _pair = v.split('=');
        if (!_queryString.hasOwnProperty(_pair[0])) {
            _queryString[_pair[0]] = decodeURIComponent(_pair[1]);
        } else if (typeof _queryString[_pair[0]] === 'string') {
            const _arr = [ _queryString[_pair[0]], decodeURIComponent(_pair[1])];
            _queryString[_pair[0]] = _arr;
        } else {
            _queryString[_pair[0]].push(decodeURIComponent(_pair[1]));
        }
    });
    return _queryString;
};
export const type=(e)=> {
  return Object.prototype.toString.call(e).slice(8, -1);
}
export const clone=(target)=> {
  //判断拷贝的数据类型
  //初始化变量result 成为最终克隆的数据
  let result,
    targetType = type(target);
  if (targetType === "Object") {
    result = {};
  } else if (targetType === "Array") {
    result = [];
  } else {
    return target;
  }
  //遍历目标数据
  for (let i in target) {
    //获取遍历数据结构的每一项值。
    let value = target[i];
    //判断目标结构里的每一值是否存在对象/数组
    if (type(value) === "Object" || type(value) === "Array") {
      //对象/数组里嵌套了对象/数组
      //继续遍历获取到value值
      result[i] = clone(value);
    } else {
      //获取到value值是基本的数据类型或者是函数。
      result[i] = value;
    }
  }
  return result;
}

export function getCookie(c_name) {
    if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(c_name + "=")
        if (c_start !== -1) {
            c_start = c_start + c_name.length + 1
            let c_end = document.cookie.indexOf(";", c_start)
            if (c_end === -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

export function setCookie(name, value, time = 'd30') {
    var strsec = getsec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

export function delCookie(c_name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(c_name);
    if (cval != null)
        document.cookie = c_name + "=" + cval + ";expires=" + exp.toGMTString();
}
export function getsec(str) {
    var str1 = str.substring(1, str.length) * 1;
    var str2 = str.substring(0, 1);
    if (str2 === "s") {
        return str1 * 1000;
    } else if (str2 === "h") {
        return str1 * 60 * 60 * 1000;
    } else if (str2 === "d") {
        return str1 * 24 * 60 * 60 * 1000;
    }
}
export const cookieSet = (key, value) => {
    if (key) {
        cookie.set(`mryt-h5-${key}`, value, {
            domain: getDomain(),
            expires: 30
        })
    }
}

export const cookieGet = (key) => {
    let t = ''
    if (key) {
        t = cookie.get(`mryt-h5-${key}`)
    }
    return t
}
export const getDomain = () => {
    let href = window.location.href
    try {
      href = href.replace('http://', '').replace('https://', '')
      href = href.split('/')[0]
      let res = isIpPort(href)
      if (res.is) {
        return res.ip
      }
      let splited = href.split('.')
      href = splited.splice(1, splited.length - 1).join('.')
      return href
    } catch (error) {
      console.error(error)
      return href
    }
}
const isIpPort =(str) => {
    if (typeof str === 'string') {
      let arr1 = str.split(':')
      if (arr1.length === 2) {
        let ip = arr1[0]
        let arr = ip.split('.')
        if (arr.length === 4) {
          for (let i in arr) {
            if (isNaN(parseInt(arr[i], 10))) {
              return {
                is: false,
                ip: ''
              }
            }
          }
          return {
            is: true,
            ip: ip
          }
        }
      }
    }
    return {
      is: false,
      ip: ''
    }
  }
export const getThousandNum = (num)=>{
  return num.toString().replace(/\d+/, function (n) { // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) { // 对整数部分添加分隔符
        return $1 + ",";
    });
  });
}

export const numSorter =function(a, b, key) {
    return a[key] - b[key];
}

export const strSorter = function(a, b, key) {

    return a[key].charCodeAt() - b[key].charCodeAt();
}

export const numFormat = function(v) {
    return (v || 0) > 1000 ? ((v || 0) / 10000).toFixed(2) + 'w' : (v || 0)
}
