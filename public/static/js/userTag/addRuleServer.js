/**
 * Created by user on 16/6/20.
 */

require(['jquery','jquery.bootstrap','jquery.datetimepicker','common','quickSearch','app'],function($){
    var addRuleServer = {

        id:null,//如果不为空则表示修改

        obj:null,

        init:function(){
            this.initEvent();
            this.id = $.getQueryString("id");
            if(this.id != null){
                this.getInfo();
            }
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
                    {name:"name",label:"任务名称"},
                    {name:"fileUrl",label:"服务器文件路径"},
                    {name:"desc",label:"描述"}
                ]
            );
            if(verifyFlag){
                var rule = {};

                rule.name = $("#name").val();
                rule.file = $("#fileUrl").val();
                rule.desc = $("#desc").val();
                rule.type = "LLOAD";

                var uuid = $('input:radio[name="uuid"]:checked').val();
                rule.uuid = uuid;

                var url = "/venus/usergroup/group/add";
                if(this.id != null){
                    url = "/venus/usergroup/group/update";
                    rule.id = this.id;
                    rule.create_time = this.obj.create_time;
                    rule.last_build_time = this.obj.last_build_time;
                    rule.last_modify_time = this.obj.last_modify_time;
                    rule.total_num = this.obj.total_num;
                }
                showloading(true);

                $.ajax({
                    type: "post",
                    url: url,
                    dataType: "json",
                    contentType: 'application/json',
                    data: JSON.stringify(rule),
                    success: function (result) {
                        showloading(false);
                        if (result && result.success) {
                            showTip("保存成功!");
                            location.href = "ruleList.html";
                        } else {
                            $.showModal({content: result.message});
                        }
                    },
                    error: function (a, b, c) {
                        showloading(false);
                        alert(a.responseText);
                    }
                });
            }

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
                        var dat = result.pairs.dat;
                        _this.setInfo(dat);
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

        setInfo:function(dat){
            var obj = dat.obj;
            this.obj = obj;
            $("#name").val(obj.name);
            $("#desc").val(obj.desc);
            $("#fileUrl").val(obj.file);
            $("input[type=radio][name=uuid][value="+obj.uuid+"]").attr("checked",'checked');

        }


    };
    addRuleServer.init();
});
