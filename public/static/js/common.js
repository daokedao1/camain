var showloading = function(flag,content){
    var wrapper =  $('#overlay-wrapper');
    if(wrapper.length > 0){
    }else{
        var strHtml = '<div class="overlay-wrapper" id="overlay-wrapper" style="display: none;">'
            +'<div class="overlay">'
            +'<i class="fa fa-refresh fa-spin"></i>'
            +'<span class="tip"></span>'
            +'</div>'
            +'</div>';
        $('body').append(strHtml);
    }
    if(flag){
        $('#overlay-wrapper').find('.tip').html(content?content:'');
        $('#overlay-wrapper').show();
    }else{
        $('#overlay-wrapper').hide();
    }


};
window.showloading = showloading;
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt)
{
    var o = {
        'M+' : this.getMonth()+1,                 //月份
        'd+' : this.getDate(),                    //日
        'h+' : this.getHours(),                   //小时
        'm+' : this.getMinutes(),                 //分
        's+' : this.getSeconds(),                 //秒
        'q+' : Math.floor((this.getMonth()+3)/3), //季度
        'S'  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+'').substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp('('+ k +')').test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (('00'+ o[k]).substr((''+ o[k]).length)));
    return fmt;
};

/*
 *
 * 输入框 只能输入数字
 * */
$.fn.numeral = function() {
    $(this).css('ime-mode', 'disabled');
    this.bind('keypress',function(e) {
        var browser = {}, ua = navigator.userAgent.toLowerCase();
        browser.firefox = /firefox/.test(ua);
        browser.chrome = /chrome/.test(ua);
        browser.opera = /opera/.test(ua);
        browser.ie = /msie/.test(ua);
        //IE 11的userAgent版本为Trident 7.0
        if(!browser.ie) browser.ie = /trident 7.0/.test(ua);

        var code = (e.keyCode ? e.keyCode : e.which);  //兼容火狐 IE
        if(browser.firefox&&(e.keyCode==0x8))  //火狐下不能使用退格键
        {
            return;
        }
        return code >= 48 && code<= 57;
    });
    this.bind('blur', function() {
        if (this.value.lastIndexOf('.') == (this.value.length - 1)) {
            this.value = this.value.substr(0, this.value.length - 1);
        } else if (isNaN(this.value)) {
            this.value = '';
        }
    });
    this.bind('paste', function() {
        //if(typeof(clipboardData)!="undefined"){
        //    var s =clipboardData.getData('text');
        //    if (!/\D/.test(s));
        //    value = s.replace(/^0*/, '');
        //    return false;
        //}
        return false;//限制粘贴
    });
    this.bind('dragenter', function() {
        return false;
    });
    this.bind('keyup', function() {
        if (/(^0+)/.test(this.value)) {
            this.value = this.value.replace(/^0*/, '');
        }
    });
};
/*
 *
 * 输入框 只能输入小数
 * */
$.fn.float = function() {
    $(this).css('ime-mode', 'disabled');
    this.bind('keypress',function() {

        if (event.keyCode == 46) {
            if (this.value.indexOf('.') != -1) {
                return false;
            }
        } else {
            return event.keyCode >= 46 && event.keyCode <= 57;
        }
    });
    this.bind('blur', function() {
        if (this.value.lastIndexOf('.') == (this.value.length - 1)) {
            this.value = this.value.substr(0, this.value.length - 1);
        } else if (isNaN(this.value)) {
            this.value = '';
        }
        if(this.value != ''){
            this.value = parseFloat(this.value);
        }
    });
    this.bind('paste', function() {
        var s = clipboardData.getData('text');

        if (/^\d*$/.test(s)){
            value=s;
            return true;
        }
        //value = s.replace(/^0*/, '');
        return false;
    });
    this.bind('dragenter', function() {
        return false;
    });
    this.bind('keyup', function() {
        //if (/(^0+)/.test(this.value)) {
        //    this.value = this.value.replace(/^0*/, '');
        //}
    });
};

/*textarea插入文字*/
$.fn.extend({
    insertContent : function(myValue, t) {
        var $t = $(this)[0];
        if (document.selection) { // ie
            this.focus();
            var sel = document.selection.createRange();
            sel.text = myValue;
            this.focus();
            sel.moveStart('character', -l);
            var wee = sel.text.length;
            if (arguments.length == 2) {
                var l = $t.value.length;
                sel.moveEnd('character', wee + t);
                t <= 0 ? sel.moveStart('character', wee - 2 * t - myValue.length) : sel.moveStart( 'character', wee - t - myValue.length);
                sel.select();
            }
        } else if ($t.selectionStart
            || $t.selectionStart == '0') {
            var startPos = $t.selectionStart;
            var endPos = $t.selectionEnd;
            var {scrollTop} = $t;
            $t.value = $t.value.substring(0, startPos)
                + myValue
                + $t.value.substring(endPos,$t.value.length);
            this.focus();
            $t.selectionStart = startPos + myValue.length;
            $t.selectionEnd = startPos + myValue.length;
            $t.scrollTop = scrollTop;
            if (arguments.length == 2) {
                $t.setSelectionRange(startPos - t,
                    $t.selectionEnd + t);
                this.focus();
            }
        } else {
            this.value += myValue;
            this.focus();
        }
    }
});

$.getQueryString = function(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2]; return null;
};

$.showModal = function(obj){
    var data = {
        content:'提示信息',
        closeCallBack:null,
        sureCallBack:null,
        title:'提示信息',
        closeName:'关闭',
        sureName:'确定'
    };
    data = $.extend({},data,obj);
    var mymodalcontent = $('#mymodalcontent');
    if(mymodalcontent.length > 0){
        mymodalcontent.find('.modal-title').html(data.title);
        mymodalcontent.find('.modal-body p').html(data.content);
        mymodalcontent.find('.modal-footer .myclose').html(data.closeName);
        mymodalcontent.find('.modal-footer .mysure').html(data.sureName);

    }else{
        var htmlStr =   '<div class="modal" id="mymodalcontent">'
            +'<div class="modal-dialog">'
            +'<div class="modal-content">'
            +'<div class="modal-header">'
            +'<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>'
            +'<h4 class="modal-title">'+data.title+'</h4>'
            +'</div>'
            +'<div class="modal-body">'
            +'<p>'+data.content+'</p>'
            +'</div>'
            +'<div class="modal-footer">'
            +'<button type="button" class="btn btn-default myclose" >'+data.closeName+'</button>'
            +'<button type="button" class="btn btn-primary mysure">'+data.sureName+'</button>'
            +'</div>'
            +'</div>'
            +'</div>'
            +'</div>';
        $('body').append(htmlStr);
    }
    $('#mymodalcontent').modal('toggle');

    $('#mymodalcontent').find('.myclose').unbind('click').click(function(){
        data.closeCallBack && data.closeCallBack();
        $('#mymodalcontent').modal('hide');
    });

    $('#mymodalcontent').find('.mysure').unbind('click').click(function(){
        data.sureCallBack && data.sureCallBack();
        $('#mymodalcontent').modal('hide');
    });

};

var verifyEmpty = function(values,texts){
    if(values && values.length > 0){
        for(var i=0; i<values.length; i++){
            var $obj = $('#'+values[i].name);
            var value = $obj.val();
            if($.trim(value) == ''){
                $obj.focus();
                showTip(values[i].label +' 不能为空.');
                return false;
            }
        }
    }

    if(texts && texts.length > 0){
        for(var i=0; i<texts.length; i++){
            var $obj = $('#'+texts[i].name);
            var value = $obj.text();
            if($.trim(value) == ''){
                $obj.focus();
                showTip(texts[i].label +' 不能为空.');
                return false;
            }
        }
    }
    return true;
};
window.verifyEmpty = verifyEmpty;

var showTip = function(content,callback){
    var calloutInfo = $('#calloutInfo');
    if(calloutInfo.length > 0){
        calloutInfo.find('p').html(content);
        calloutInfo.slideDown(500,function(){
            setTimeout(function(){
                $('#calloutInfo').slideUp(500);
                callback&&callback();
            },2000);
        });
    }else{
        $('body').append('<div class="callout callout-info" id="calloutInfo">'
            +'<h4>提示信息</h4>'
            +'<p></p>'
            +'</div>');
        $('#calloutInfo').find('p').html(content);
        $('#calloutInfo').slideDown(500,function(){
            setTimeout(function(){
                $('#calloutInfo').slideUp(500);
                callback&&callback();
            },2000);
        });
    }
};
window.showTip = showTip;

function getCookie(c_name){
    if (document.cookie.length>0){　　//先查询cookie是否为空，为空就return ""
        c_start=document.cookie.indexOf(c_name + '=');　　//通过String对象的indexOf()来检查这个cookie是否存在，不存在就为 -1
        if (c_start!=-1){
            c_start=c_start + c_name.length+1;　　//最后这个+1其实就是表示"="号啦，这样就获取到了cookie值的开始位置
            c_end=document.cookie.indexOf(';',c_start);　　//其实我刚看见indexOf()第二个参数的时候猛然有点晕，后来想起来表示指定的开始索引的位置...这句是为了得到值的结束位置。因为需要考虑是否是最后一项，所以通过";"号是否存在来判断
            if (c_end==-1) c_end=document.cookie.length;
            return decodeURIComponent(document.cookie.substring(c_start,c_end));　　//通过substring()得到了值。想了解unescape()得先知道escape()是做什么的，都是很重要的基础，想了解的可以搜索下，在文章结尾处也会进行讲解cookie编码细节
        }
    }
    return '';
}
window.getCookie = getCookie;

String.prototype.endWith=function(endStr){
    var d=this.length-endStr.length;
    return (d>=0&&this.lastIndexOf(endStr)==d);
};
/*
* 判断浏览器类型
* */
var {userAgent} = navigator; //取得浏览器的userAgent字符串
if(userAgent.indexOf('Opera') > -1||userAgent.indexOf('Firefox') > -1||userAgent.indexOf('Chrome') > -1||userAgent.indexOf('Safari') > -1){
}else{
    $('.compy').after('<span style=\'color:#00ff00;position:absolute;top:15px;left:237px;\'>注意:请使用谷歌/火狐/safari浏览器</span>');
}

/*
 * 获取用户信息,如果获得的user为空,则跳转到登录页面
 *
 * */
var s=Math.random()*10;
var localUsers = localStorage.getItem('users');
// if(!localUsers || localUsers == '' || localUsers == null){
//     location.href = '/venus/login';
// }
var users = JSON.parse(localStorage.getItem('users'));
var staff = [];
window.staff = staff;
for(var key in users){
    staff.push(users[key]);
}
var user = getCookie('user')||localStorage.getItem('user');
// if(!user){
//     location.href = '/venus/login?_t='+s;
// }
user = JSON.parse(user);

window.staff = staff;
console.log(staff);
if(user && user.loginName){
    $('.hidden-xs').html(user.loginName);
    $('.hidden-xs').after('<span class="hidden-xs exitSysBut" style="cursor:pointer;margin-left:10px;">退出</span>');
    $('.exitSysBut').click(function(){
        localStorage.setItem('users','');
        localStorage.setItem('menus','');
        // location.href = '/venus/login?_t='+s;
    });
}else{
    // location.href = '/venus/login?_t='+s;
}

var menus = JSON.parse(localStorage.getItem('menus')),menusHtml = '',activeCount = 0;
let addMenus={
    createTime: '2019-06-13T07:00:30.000+0000',
    id: 146,
    leaf: 1,
    name: 'AB测试',
    parentId: 169,
    timestamp: '2019-09-10T21:45:33.000+0000',
    url: '',
    children:[
        {
            children: [],
            createTime: '2019-06-13T07:01:03.000+0000',
            id: 147,
            leaf: 0,
            name: 'AB测试',
            parentId: 164,
            timestamp: '2019-06-13T20:01:03.000+0000',
            url: '/page/newFloader/index.html'
        },
        {
            children: [],
            createTime: '2019-06-13T07:01:03.000+0000',
            id: 157,
            leaf: 0,
            name: '指标管理',
            parentId: 164,
            timestamp: '2019-06-13T20:01:03.000+0000',
            url: '/page/dataManager/newMetricsList.html'
        }
    ]
};
menus[2].children[1]={
    children: [],
    createTime: '2019-06-13T07:01:03.000+0000',
    id: 157,
    leaf: 0,
    name: 'LightHouse',
    parentId: 164,
    timestamp: '2019-06-13T20:01:03.000+0000',
    url: '/page/dataManager/LightHouse.html'
};
for(var m=0; m<menus.length; m++){
    var mchild = menus[m].children,mchildHtml = '',active = '';

    for(var mc=0; mc<mchild.length; mc++){
        var mmchild = mchild[mc].children;
        if(mmchild.length>0 && mchild[mc].url == ''){//如果该菜单的url的为空,切存在子菜单,就判断是导入导出菜单
            mchildHtml = mchildHtml + '<li><a href="javascript:void(0);" class="parentMenu"><i class="fa fa-sitemap"></i>'+mchild[mc].name+'</a></li>';
            for(var threei in mmchild){
                mchildHtml = mchildHtml + '<li><a href="'+mmchild[threei].url+'?_t='+s+'" class="lastMenu"><i class="fa fa-cog"></i>'+mmchild[threei].name+'</a></li>';
                if(mmchild[threei].url == getUrlRelativePath()){
                    active = 'active';
                }
            }
        }else{
            mchildHtml = mchildHtml + '<li><a href="'+mchild[mc].url+'?_t='+s+'"><i class="fa fa-cog"></i>'+mchild[mc].name+'</a></li>';
            if(mchild[mc].url == getUrlRelativePath()){
                active = 'active';
            }
        }
    }
    if(active == '' && activeCount == 0){
        active = getActive(menus[m]);
    }else{
        activeCount = 1;
    }

    menusHtml = menusHtml + '<li class="treeview '+active+'">'
        +'<a>'
        +'<i class="fa fa-table"></i> <span>'+menus[m].name+'</span>'
        +'<i class="fa fa-angle-left pull-right"></i>'
        +'</a>'
        +'<ul class="treeview-menu">';
    menusHtml = menusHtml + mchildHtml + '</ul>';
}
console.log(123);
$('.sidebar-menu').html(menusHtml);
function getActive(obj){//1级不遍历,从2级开始,深层遍历,看是否在改1级别里面
    var {children} = obj,active = '';
    if(children.length>0){
        for(var i=0; i<children.length; i++){
            if(children[i].url == getUrlRelativePath()){
                active = 'active';
                break;
            }
            active = getActive(children[i]);
            if(active == 'active'){
                break;
            }
        }
    }
    return active;
}
function getUrlRelativePath(){
    var url = document.location.toString();
    var arrUrl = url.split('//');

    var start = arrUrl[1].indexOf('/');
    var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

    if(relUrl.indexOf('?') != -1){
        relUrl = relUrl.split('?')[0];
    }
    return relUrl;
}

var Sys = (function(ua){
    var s = {};
    s.IE = ua.match(/msie ([\d.]+)/)?true:false;
    s.Firefox = ua.match(/firefox\/([\d.]+)/)?true:false;
    s.Chrome = ua.match(/chrome\/([\d.]+)/)?true:false;
    s.IE6 = (s.IE&&([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 6))?true:false;
    s.IE7 = (s.IE&&([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 7))?true:false;
    s.IE8 = (s.IE&&([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 8))?true:false;
    return s;
})(navigator.userAgent.toLowerCase());

var Css = function(e,o){
    for(var i in o)
        e.style[i] = o[i];
};

var Extend = function(destination, source) {
    for (var property in source) {
        destination[property] = source[property];
    }
};

var Bind = function(object, fun) {
    var args = Array.prototype.slice.call(arguments).slice(2);
    return function() {
        return fun.apply(object, args);
    };
};

var BindAsEventListener = function(object, fun) {
    var args = Array.prototype.slice.call(arguments).slice(2);
    return function(event) {
        return fun.apply(object, [event || window.event].concat(args));
    };
};

var CurrentStyle = function(element){
    return element.currentStyle || document.defaultView.getComputedStyle(element, null);
};

function addListener(element,e,fn){
    element.addEventListener?element.addEventListener(e,fn,false):element.attachEvent('on' + e,fn);
};
function removeListener(element,e,fn){
    element.removeEventListener?element.removeEventListener(e,fn,false):element.detachEvent('on' + e,fn);
};

var Class = function(properties){
    var _class = function(){return (arguments[0] !== null && this.initialize && typeof(this.initialize) === 'function') ? this.initialize.apply(this, arguments) : this;};
    _class.prototype = properties;
    return _class;
};

var Resize =new Class({
    initialize : function(obj,contentId){
        this.obj = obj;
        this.contentId = contentId,
        this.resizeelm = null;
        this.fun = null; //记录触发什么事件的索引
        this.original = []; //记录开始状态的数组
        this.width = null;
        this.height = null;
        this.fR = BindAsEventListener(this,this.resize);
        this.fS = Bind(this,this.stop);
    },
    set : function(elm,direction){
        if(!elm)return;
        this.resizeelm = elm;
        addListener(this.resizeelm,'mousedown',BindAsEventListener(this, this.start, this[direction]));
        return this;
    },
    start : function(e,fun){
        this.fun = fun;
        this.original = [parseInt(CurrentStyle(this.obj).width),parseInt(CurrentStyle(this.obj).height),parseInt(CurrentStyle(this.obj).left),parseInt(CurrentStyle(this.obj).top)];
        this.width = (this.original[2]||0) + this.original[0];
        this.height = (this.original[3]||0) + this.original[1];
        addListener(document,'mousemove',this.fR);
        addListener(document,'mouseup',this.fS);
    },
    resize : function(e){
        this.fun(e);
        Sys.IE?(this.resizeelm.onlosecapture=function(){this.fS();}):(this.resizeelm.onblur=function(){this.fS();});
    },
    stop : function(){
        removeListener(document, 'mousemove', this.fR);
        removeListener(document, 'mousemove', this.fS);
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    },
    getX:function(e,id){
        var left=e.offsetX,{target} = e;
        while(target.id != id){
            left = left + target.offsetLeft;
            target = target.parentNode;
            if(!target || target.nodeName == 'BODY' || target.className.indexOf('cont ')>-1){
                return null;
            }
        }
        return left;
    },

    getY:function(e,id){
        var top=e.offsetY,{target} = e;
        while(target.id != id){
            top = top + target.offsetTop;
            target = target.parentNode;
            if(!target|| target.nodeName == 'BODY' || target.className.indexOf('cont ')>-1){
                return null;
            }
        }
        return top;
    },
    up : function(e){
        var y = this.getY(e,this.contentId);
        if(!y) return;
        this.height>y?Css(this.obj,{top:y + 'px',height:this.height-y + 'px'}):this.turnDown(e);
    },
    down : function(e){
        var y = this.getY(e,this.contentId);
        if(!y) return;
        y>this.original[3]?Css(this.obj,{top:this.original[3]+'px',height:y-this.original[3]+'px'}):this.turnUp(e);
    },
    left : function(e){
        var x = this.getX(e,this.contentId);
        if(!x) return;
        x<this.width?Css(this.obj,{left:x +'px',width:this.width-x + 'px'}):this.turnRight(e);
    },
    right : function(e){
        var x = this.getX(e,this.contentId);
        if(!x) return;
        x>this.original[2]?Css(this.obj,{left:this.original[2]+'px',width:x-this.original[2]+'px'}):this.turnLeft(e);
    },
    leftUp:function(e){
        this.up(e); this.left(e);
    },
    leftDown:function(e){
        this.left(e); this.down(e);
    },
    rightUp:function(e){
        this.up(e); this.right(e);
    },
    rightDown:function(e){
        this.right(e); this.down(e);
    },
    turnDown : function(e){
        Css(this.obj,{top:this.height+'px',height:e.clientY - this.height + 'px'});
    },
    turnUp : function(e){
        Css(this.obj,{top : e.clientY +'px',height : this.original[3] - e.clientY +'px'});
    },
    turnRight : function(e){
        Css(this.obj,{left:this.width+'px',width:e.clientX- this.width +'px'});
    },
    turnLeft : function(e){
        Css(this.obj,{left:e.clientX +'px',width:this.original[2]-e.clientX+'px'});
    }
});
