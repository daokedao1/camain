/**
 * Created by user on 16/6/20.
 */

require(['jquery','jquery.bootstrap','jquery.datetimepicker','common','quickSearch','app'],function($){
    var addRuleDefined = {

        id:null,//如果不为空则表示修改

        isModifyFirstFlag:true,

        init:function(){
            this.initEvent();
            //this.id = $.getQueryString("id");
            //if(this.id != null){
            //    this.getInfo();
            //    $("#id").val(this.id);
            //}
        },

        initEvent:function(){
            var _this = this;

            $("#addone").click(function(){
                _this.saveImport();
            });

        },

        saveImport:function(){
            var _this = this;
            var verifyFlag = verifyEmpty(
                [
                    {name:"name",label:"任务名称"}
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
                var fileSize = $("#file")[0].files[0].size;
                if(fileSize>50*1024*1024){
                    showTip("文件不能大于50M。");
                    return;
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
                        location.href = "ruleList.html";
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
                type: "get",
                url: "/venus/usergroup/group/get/"+_this.id,
                data: {
                },
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        var dat = result.pairs.fileUpload;

                    } else {
                        $.showModal({content: "查询失败"});
                    }
                },
                error: function (a, b, c) {
                    showloading(false);
                    alert(a.responseText);
                }
            });
        }

    };
    addRuleDefined.init();
});
