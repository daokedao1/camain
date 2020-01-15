/**
 * Created by user on 16/6/20.
 */

require(['jquery','jquery.bootstrap','jquery.datetimepicker','common','quickSearch','app'],function($){
    var udfAdd = {

        id:null,//如果不为空则表示修改

        isModifyFirstFlag:true,

        init:function(){
            this.initEvent();
            this.getUser();
            this.id = $.getQueryString("id");
            if(this.id != null){
                this.getInfo();
                $("#id").val(this.id);
                $("#form").attr("action","/venus/transform/udf/updateUDF");
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


            $("#file").change(function(){
                var path = $(this).val();
                if(path.endWith(".jar")){
                    var arr = path.split("\\");
                    var fileName = arr[arr.length-1];
                    $("#jarTip").html("add jar "+fileName);
                }else{
                    showTip("请上传正确的jar文件.");
                    //$(this).val("");
                }

            });

            $("#className").keyup(function(){
                var value = $(this).val();
                $("#classNameTip").html("create temporary function xxx as '"+value+"'");
            });

            $("#addOne").click(function(){
                $("#example").val($("#jarTip").html()+'\r\n'+$("#classNameTip").html()+'\r\n\r\n'+$("#exampleOpre").val());
                _this.saveImport();
            });

        },

        saveImport:function(){
            var _this = this;
            var verifyFlag = verifyEmpty(
                [
                    {name:"udfName",label:"udf名称"},
                    {name:"administrator",label:"负责人"},
                    {name:"className",label:"class name"},
                    {name:"exampleOpre",label:"用例"},
                    {name:"describe",label:"描述"}
                ]
            );
            if(verifyFlag){
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
                        location.href = "udfList.html";
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
                url: "/venus/transform/udf/getUDF",
                data: {
                    id:_this.id
                },
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        var dat = result.pairs.hiveUDF;
                        $("#udfName").val(dat.udfName);
                        $("#administrator").val(dat.administrator);
                        $("#className").val(dat.className);
                        var example = dat.example;
                        var exampleArr = example.split("\n");
                        $("#jarTip").html(exampleArr[0]);
                        $("#classNameTip").html(exampleArr[1]);
                        $("#example").val(example);
                        $("#exampleOpre").val($.trim(example.replace(exampleArr[0],"").replace(exampleArr[1],"")));
                        $("#describe").val(dat.describe);
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
    udfAdd.init();
});
