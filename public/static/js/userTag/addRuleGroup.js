/**
 * Created by user on 16/6/20.
 */

require(['jquery','jquery.bootstrap','jquery.datetimepicker','common','quickSearch','app'],function($){
    var addRuleGroup = {

        id:null,//如果不为空则表示修改

        isModifyFirstFlag:true,

        oginData:null,

        _EXPR: "G",

        obj:null,

        init:function(){
            this.initEvent();
            this.getTagList();
            this.id = $.getQueryString("id");
            if(this.id != null){
                this.getInfo();
            }
        },

        initEvent:function(){
            var _this = this;

            $(".addNewGroup").click(function(){
                $(".addGroupInfo").show();
                $(".deleteNewGroup").show();
                $(".addNewGroup").hide();
            });
            $(".deleteNewGroup").click(function(){
                $(".addGroupInfo").hide();
                $(".deleteNewGroup").hide();
                $(".addNewGroup").show();
            });

            $("#addone").click(function(){
                _this.saveImport();
            });

            $("input:radio[name=uuid]").click(function(){
                _this.setDataList(_this.oginData);
                $("#firstDraggable").html("");
                $("#secondDraggable").html("");
                $("#firstGroup").val("");
                $("#secondGroup").val("");
            });

            $("#add_1").click(function(){
                var value = $("#firstGroup").val();
                if(value != ""){
                    var id = $("#firstGroup").attr("data-value");
                    if($(".luojiDiv a[data-id="+id+"]").length>0){
                        showTip("该群组已经存在于列表中.");
                    }else{
                        $("#firstDraggable").append('<a class="groupA" data-id="'+id+'">'+value+'<i class="fa fa-fw fa-times"></i></a>');
                        $("#secondGroup").val("");
                    }
                }
            });
            $("#add_2").click(function(){
                var value = $("#secondGroup").val();
                if(value != ""){
                    var id = $("#secondGroup").attr("data-value");
                    if($(".luojiDiv a[data-id="+id+"]").length>0){
                        showTip("该群组已经存在于列表中.");
                    }else{
                        $("#secondDraggable").append('<a class="groupA" data-id="'+id+'">'+value+'<i class="fa fa-fw fa-times"></i></a>');
                        $("#secondGroup").val("");
                    }
                }
            });

            $(".luojiDiv").delegate(".groupA .fa-times","click",function(){
                $(this).parent().remove();
            });
        },

        getTagList:function(){
            var _this = this;
            //var type = $("#type").val();
            //var joinColumnName = $("#joinColumnName").val();
            //var createDate = $("#createDate").val();
            //var desc = $("#desc").val();
            showloading(true);
            $.ajax({
                type: "post",
                url: "/venus/usergroup/group/list",
                data: {
                    pageNo:1,
                    pageSize:999999
                },
                success: function (result) {
                    showloading(false);
                    if(result && result.success){
                        var dat = result.pairs.dat.results;
                        _this.oginData = dat;
                        _this.setDataList(dat);
                    }else{
                        $.showModal({content:"查询失败:"+result.message});
                    }
                },
                error:function(a,b,c){
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },

        setDataList:function(dat){
            $(".tagValues").html("");
            var uuid = $("input:radio[name=uuid]:checked").val(),groupNames=[];
            for(var i=0;i<dat.length;i++){
                var newObj = {};
                var data = dat[i],group = data.obj;
                if(uuid == group.uuid){
                    newObj.id = data.id;
                    newObj.name = group.name;
                    groupNames.push(newObj);
                }
            }
            $("#firstGroup").quickSearch({
                data: groupNames,
                text: "name",
                value: "id",
                width: "400px"
            });
            $("#secondGroup").quickSearch({
                data: groupNames,
                text: "name",
                value: "id",
                width: "400px"
            });

        },


        saveImport:function(){
            var _this = this;
            var verifyFlag = verifyEmpty(
                [
                    {name:"name",label:"群组名称"},
                    {name:"desc",label:"描述"}
                ]
            );
            if(verifyFlag){
                var rule = {};

                rule.name = $("#name").val();
                var uuid = $('input:radio[name="uuid"]:checked').val();
                rule.uuid = uuid;
                rule.type = "DERIVED";
                rule.desc = $("#desc").val();

                var groups = $("#firstDraggable a"),type = $("#firstTagSelect").val();
                if(groups.length<=0){
                    showTip("请选择最少一个群组.")
                    return;
                }
                if(groups.length>2 && type=="MINUS"){
                    showTip("MINUS 最多选择两个群组.")
                    return;
                }
                var expr = "";
                for(var i=0;i<groups.length;i++){
                    var a = groups.eq(i),id = a.attr("data-id"),name = a.text();
                    var obj = {
                        id:id,
                        name:name
                    };
                    rule[_this._EXPR+(i+1)] = obj;
                    expr = expr + " " + _this._EXPR+(i+1) + " ";
                    if(i != groups.length-1){
                        expr = expr + " " + type + " ";
                    }
                }
                rule.expr = expr;

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
            $("input[type=radio][name=uuid][value="+obj.uuid+"]").attr("checked",'checked');

            var expr = obj.expr,type;
            if(expr.indexOf(" OR ")>-1){
                type = "OR";
            }else if(expr.indexOf(" AND ")>-1){
                type = "AND";
            }else if(expr.indexOf(" MINUS ")>-1){
                type = "MINUS";
            }

            $("#firstTagSelect").val(type);
            var groups = expr.split(type);
            for(var i=0;i<groups.length;i++){
                var gr = $.trim(groups[i]),group = obj[gr];
                $("#firstDraggable").append('<a class="groupA" data-id="'+group.id+'">'+group.name+'<i class="fa fa-fw fa-times"></i></a>');
            }
        }

    };
    addRuleGroup.init();
});
