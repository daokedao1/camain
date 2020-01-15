/**
 * Created by user on 16/6/20.
 */

require(['jquery','jquery.bootstrap','jquery.datetimepicker','common','quickSearch','app'],function($){
    var MRAdd = {

        id:null,//如果不为空则表示修改

        isModifyFirstFlag:true,

        init:function(){
            this.initEvent();
            this.getUser();
            this.id = $.getQueryString("id");
            if(this.id != null){
                this.getInfo();
                $("#id").val(this.id);
                $("#form").attr("action","/venus/transform/mapred/updateMapRed");
            }
        },

        initEvent:function(){
            var _this = this;

            //添加联系人
            $(".myuserUl").delegate("li a", "click", function () {
                $(".myuserUl li a").removeClass("active");
                $(this).addClass("active");
                var loginName = $(this).attr("data-loginName");
                var id = $(this).attr("data-id");
                if ($(".selectUsers").find("a[data-id=" + id + "]").length <= 0) {
                    $(".selectUsers").append('<a class="btn btn-app" data-id="' + id + '" data-loginName="' + loginName + '">'
                        + '<span class="badge bg-yellow"><i class="fa fa-fw fa-times"></i></span>'
                        + loginName
                        + '</a>');
                }
            });

            $("#addUserBut").click(function () {
                if(_this.id != null && _this.isModifyFirstFlag){
                    _this.isModifyFirstFlag = false;
                    var fuzeren = $("#administrator").val().split(",");
                    for(var  i=0;i<fuzeren.length;i++){
                        $(".selectUsers").append('<a class="btn btn-app"  data-loginName="' + $.trim(fuzeren[i]) + '">'
                            + '<span class="badge bg-yellow"><i class="fa fa-fw fa-times"></i></span>'
                            + $.trim(fuzeren[i])
                            + '</a>');
                    }
                }
                $("#userModal").modal("toggle");

            });

            $("#quickSearchName").keyup(function (e) {
                var e = e || window.event;
                var value = $(this).val();
                if (e.keyCode != 38 && e.keyCode != 40) {
                    _this.quickTimeOut = setTimeout(function () {
                        _this.getUser(value);
                    }, 500)
                }
            });
            $("#quickSearchName").keydown(function (e) {
                var e = e || window.event;
                clearTimeout(_this.quickTimeOut);
            });
            $("#addFuzeren").click(function () {
                var selectUsers = $(".selectUsers a");
                var userIds = [], userLoginNames = [];
                for (var i = 0; i < selectUsers.length; i++) {
                    userIds.push(selectUsers.eq(i).attr("data-id"));
                    userLoginNames.push(selectUsers.eq(i).attr("data-loginName"));
                }
                $("#administrator").val(userLoginNames.join(", ")).attr("data-id", userIds.join(","));
                $("#userModal").modal("hide");
            });

            $(".selectUsers").delegate('.badge', "click", function () {
                $(this).parent().remove();
            });


            $("#boxBody").delegate(".addInputPath","click",function(){
                var group = $(this).parent().parent();
                group.after(group.clone());
            });

            $("#boxBody").delegate(".deleteInputPath","click",function(){
                var group = $(this).parent().parent();
                if($(".inputPath").length <= 1){
                    showTip("最少输入一个input path.");
                    return;
                }
                group.remove();
            });

            $("#addOne").click(function(){
                _this.saveImport();
            });

        },

        saveImport:function(){
            var _this = this;
            var verifyFlag = verifyEmpty(
                [
                    {name:"enName",label:"任务名称(英)"},
                    {name:"cnName",label:"任务名称(中)"},
                    {name:"administrator",label:"负责人"},
                    {name:"className",label:"class name"},
                    {name:"outputPath",label:"output path"},
                    {name:"describe",label:"描述"}
                ]
            );
            if(verifyFlag){
                var inputPath = $(".inputPath"),inputPathValue = [];
                for(var i=0;i<inputPath.length;i++){
                    var pvalue = $.trim(inputPath.eq(i).val());
                    if(pvalue == ""){
                        showTip("第"+(i+1)+"个input path不能为空.");
                        return;
                    }
                    inputPathValue.push(pvalue);
                }
                $("#inputPath").val(inputPathValue.join(","));
                if(this.id == null){
                    var file = $("#file").val();
                    if(file == ""){
                        showTip("文件不能不能为空");
                        return;
                    }
                }else{
                    var file = $("#file").val();
                    if(file != ""){
                        $.showModal({
                            content:"该文件内容会覆盖原有的内容,不可恢复,请确认",
                            closeCallBack:null,
                            sureCallBack:function(){
                                _this.formSublimt();
                            },
                            title:"提示信息",
                            closeName:"关闭",
                            sureName:"确定"
                        });
                        return;
                    }
                }
                _this.formSublimt();

            }

        },

        formSublimt:function(){
            $("#form").submit();
            window._inter = setInterval(function(){
                var pre = $("#callbackIframe")[0].contentWindow.document.getElementsByTagName('pre')[0];
                if(pre){
                    var callBack = pre.innerHTML,result = JSON.parse(callBack);
                    if(result && result.success){
                        showTip("保存成功");
                        location.href = "MRList.html";
                    }else{
                        $.showModal({content: "保存失败:"+result.message});
                    }
                    clearInterval(window._inter);
                }
            },500);
        },

        getInfo:function(){
            var _this = this;
            showloading(true);
            $.ajax({
                type: "post",
                url: "/venus/transform/mapred/getMapRed",
                data: {
                    id:_this.id
                },
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        var dat = result.pairs.mapRed;
                        $("#enName").val(dat.enName);
                        $("#cnName").val(dat.cnName);
                        $("#administrator").val(dat.administrator);
                        $("#className").val(dat.className);
                        $("#inputPath").val(dat.inputPath);
                        $("#outputPath").val(dat.outputPath);
                        $("#describe").val(dat.describe);

                        $(".inputpathgroup").remove();
                        var inputPathArr = dat.inputPath.split(",");
                        for(var i=0;i<inputPathArr.length;i++){
                            $(".outPathDiv").before('<div class="form-group inputpathgroup">'
                                +'<label class="col-sm-2 control-label">input path</label>'
                                +'<div class="col-sm-3 input-group-sm">'
                                +'<input type="text" class="form-control inputPath" placeholder="" value="'+inputPathArr[i]+'">'
                                +'</div>'
                                +'<div class="col-sm-7">'
                                +'<a class="btn btn-default pull-left addInputPath" style="margin-right:10px;">新增</a>'
                                +'<a class="btn btn-default pull-left deleteInputPath">删除</a>'
                                +'</div>'
                                +'</div>');
                        }
                    } else {
                        $.showModal({content: "查询失败"});
                    }
                },
                error: function (a, b, c) {
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },

        getUser: function (loginName) {
            var _this = this;
            showloading(true);
            $.ajax({
                type: "get",
                url: "/venus/users/search",
                global: false,
                data: {
                    loginName: $.trim(loginName)
                },
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        _this.setUserDig(result.pairs.dat);
                    } else {
                        $.showModal({conent: "查询联系人失败"});
                    }
                },
                error: function (a, b, c) {
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },

        setUserDig: function (dat) {
            $(".myuserUl").empty();
            for (var i = 0; i < dat.length; i++) {
                $(".myuserUl").append('<li><a data-id="' + dat[i].id + '" data-loginName="' + dat[i].loginName + '" data-realName="' + dat[i].realName + '" href="javascript:void(0);">' + dat[i].realName + '  ' + dat[i].mail + ' ' + dat[i].groupName + '</a></li>');
            }
        }

    };
    String.prototype.endWith=function(endStr){
        var d=this.length-endStr.length;
        return (d>=0&&this.lastIndexOf(endStr)==d)
    };
    MRAdd.init();
});
