/**
 * Created by user on 16/6/20.
 */
require(['jquery','jquery.bootstrap','jquery.datetimepicker','common','quickSearch','app'],function($,d3){
    var ruleList = {

        pageNo:1,

        pageSize:10,

        totalPage:0,

        totalRecords:0,

        init:function(){
            this.initEvent();
            this.getTagList();
        },

        initEvent:function() {
            var _this = this;
            $("#addTag").click(function(){
                $("#chooseTypeModal").modal("toggle");
            });
            $("#sureAddDB").click(function(){
                var selectRadio = $("input[name='dbtype']:checked").val();
                if(selectRadio == 1){
                    location.href = 'addRule.html';
                }else if(selectRadio == 2){
                    location.href = 'addRuleDefined.html';
                }else if(selectRadio == 3){
                    location.href = 'addRuleGroup.html';
                }else if(selectRadio == 4){
                    location.href = 'addRuleServer.html';
                }
            });

            $('#createDate,#modifyDate').datetimepicker({
                format: "yyyy-mm-dd",
                autoclose: true,
                todayBtn: true,
                todayHighlight: true,
                showMeridian: true,
                minView:2,
                pickerPosition: "bottom-right",
                language: "zh-CN"
            });

            $("#prevPage").click(function(){
                if(_this.pageNo <= 1){
                    return;
                }else{
                    _this.pageNo = _this.pageNo - 1;
                    _this.getTagList();
                }
            });

            $("#nextPage").click(function(){
                if(_this.pageNo >= _this.totalPage){
                    return;
                }
                _this.pageNo = _this.pageNo + 1;
                _this.getTagList();
            });
            $(".searchTh input").keydown(function(e){
                var e = e || window.event;
                if(e.keyCode == "13"){
                    _this.pageNo = 1;
                    _this.getTagList();
                }
            });
            $(".searchTh select").change(function(e){
                _this.pageNo = 1;
                _this.getTagList();
            });

            $("#taglistTable").delegate(".modify","click",function(){
                if($(this).hasClass("faDisabled")){
                    return;
                }
                var type = $(this).parent().attr("data-type");
                if(type == "SELECT"){
                    location.href = "addRule.html?id="+$(this).parent().attr("data-id");
                }else if(type=="DERIVED"){
                    location.href = "addRuleGroup.html?id="+$(this).parent().attr("data-id");
                }else if(type=="LLOAD"){
                    location.href = "addRuleServer.html?id="+$(this).parent().attr("data-id");
                }else{
                    location.href = "addRuleDefined.html?id="+$(this).parent().attr("data-id");
                }

            });
            $("#taglistTable").delegate(".delete","click",function(){
                if(confirm("是否要删除该组?")){
                    _this.deleteTask($(this).parent().attr("data-id"));
                }
            });
            $("#taglistTable").delegate(".fa-refresh","click",function(){
                if($(this).hasClass("faDisabled")){
                    return;
                }
                var id = $(this).parent().attr("data-id");
                $.showModal({
                    content:"是否要刷新该组,刷新后15分钟后查询数据,请勿重复刷新.",
                    closeCallBack:null,
                    sureCallBack:function(){
                        _this.refreshTask(id);
                    },
                    title:"提示信息",
                    closeName:"关闭",
                    sureName:"确定"
                });
            });
            $("#taglistTable").delegate(".fa-download","click",function(){
                window.open ("/venus/usergroup/group/download/"+$(this).parent().attr("data-id"));
            });

            $("#taglistTable").delegate(".fa-file-text-o","click",function(){
                _this.yulantable($(this).parent().attr("data-id"));
            });

            $("#taglistTable").delegate(".fa-arrow-circle-up","click",function(){
                if($(this).hasClass("faDisabled")){
                    return;
                }
                _this.upRule($(this).parent().attr("data-id"));
            });

            $("#taglistTable").delegate(".fa-arrow-circle-down","click",function(){
                if($(this).hasClass("faDisabled")){
                    return;
                }
                _this.downRule($(this).parent().attr("data-id"));
            });

            $("#taglistTable").delegate(".fa-plane","click",function(){
                var id = $(this).parent().attr("data-id");
                $.showModal({
                    content:"目前只支持全量推送，所以点此按钮会将所有已经上线的群组数据推送给业务平台.",
                    closeCallBack:null,
                    sureCallBack:function(){
                        _this.fastFlushRule(id);
                    },
                    title:"提示信息",
                    closeName:"关闭",
                    sureName:"确定"
                });
            });
            //$("#taglistTable").delegate(".fa-eye","click",function(){
            //    window.open ('uploadInfo.html?id='+$(this).parent().attr("data-id"));
            //});
        },

        upRule:function(id){
            var _this = this;
            showloading(true);
            $.ajax({
                type: "post",
                url: "/venus/usergroup/group/release/"+id,
                data: {},
                success: function (result) {
                    showloading(false);
                    if(result && result.success){
                        showTip("上线成功");
                        _this.getTagList();
                    }else{
                        $.showModal({content:"上线失败"+result.message});
                    }
                },
                error:function(a,b,c){
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },

        downRule:function(id){
            var _this = this;
            showloading(true);
            $.ajax({
                type: "post",
                url: "/venus/usergroup/group/pending/"+id,
                data: {},
                success: function (result) {
                    showloading(false);
                    if(result && result.success){
                        showTip("下线成功");
                        _this.getTagList();
                    }else{
                        $.showModal({content:"下线失败"+result.message});
                    }
                },
                error:function(a,b,c){
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },

        fastFlushRule:function(id){
            var _this = this;
            showloading(true);
            $.ajax({
                type: "post",
                url: "/venus/usergroup/group/fastpush/"+id,
                data: {},
                success: function (result) {
                    showloading(false);
                    if(result && result.success){
                        showTip("异步手动推送成功");
                        _this.getTagList();
                    }else{
                        $.showModal({content:"异步手动推送失败"+result.message});
                    }
                },
                error:function(a,b,c){
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },

        yulantable:function(id){
            var _this = this;
            showloading(true);
            $.ajax({
                type: "get",
                url: "/venus/usergroup/group/get_group_data/"+id,
                data: {},
                success: function (result) {
                    showloading(false);
                    if(result && result.success){
                        _this.setyulantable(result.pairs.dat);
                    }else{
                        $.showModal({content:"刷新失败"+result.message});
                    }
                },
                error:function(a,b,c){
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },

        setyulantable:function(data){
            $("#yulantable").html("");
            var strhtml = '';
            for(var i=0;i<data.length;i++){
                strhtml = strhtml +  '<td><div class="ylnum">'+data[i]+'</div></td>';
                if((i+1)%5==0 || i == data.length-1){
                    strhtml = '<tr>'+strhtml+'</tr>';
                    $("#yulantable").append(strhtml);
                    strhtml = "";
                }
            }
            $("#yulanmodal").modal("toggle");
        },


        downTask:function(id){
            showloading(true);
            $.ajax({
                type: "post",
                url: "/venus/usergroup/group/fastbuild/"+id,
                data: {},
                success: function (result) {
                    showloading(false);
                    if(result && result.success){
                        showTip("刷新成功");
                    }else{
                        $.showModal({content:"刷新失败"+result.message});
                    }
                },
                error:function(a,b,c){
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },

        refreshTask:function(id){
            var _this = this;
            showloading(true);
            $.ajax({
                type: "post",
                url: "/venus/usergroup/group/fastbuild/"+id,
                data: {},
                success: function (result) {
                    showloading(false);
                    if(result && result.success){
                        showTip("刷新成功");
                    }else{
                        $.showModal({content:"刷新失败"+result.message});
                    }
                },
                error:function(a,b,c){
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },

        deleteTask:function(id){
            var _this = this;
            showloading(true);
            $.ajax({
                type: "post",
                url: "/venus/usergroup/group/del/"+id,
                data: {},
                success: function (result) {
                    showloading(false);
                    if(result && result.success){
                        showTip("删除成功");
                        _this.getTagList();
                    }else{
                        $.showModal({content:"删除失败"+result.message});
                    }
                },
                error:function(a,b,c){
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },

        getTagList:function(){
            var _this = this;
            var name = $("#name").val();
            //var type = $("#type").val();
            //var joinColumnName = $("#joinColumnName").val();
            //var createDate = $("#createDate").val();
            //var desc = $("#desc").val();
            showloading(true);
            $.ajax({
                type: "post",
                url: "/venus/usergroup/group/list",
                data: {
                    pageNo:_this.pageNo,
                    pageSize:_this.pageSize,
                    name:name
                },
                success: function (result) {
                    showloading(false);
                    if(result && result.success){
                        var dat = result.pairs.dat;
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
            this.totalPage = dat.totalPage;
            this.totalRecords = dat.totalRecords;
            $("#currentPageNum").html(this.pageNo);
            $("#totalPageNum").html(this.totalPage);
            $("#totalNum").html(this.totalRecords);
            var data = dat.results;
            var strHtml = "";
            for(var i=0;i<data.length;i++){
                var id = data[i].id,obj = data[i].obj;
                var sHtml = '<tr>'
                    +'<td>'+obj.id+'</td>'
                    +'<td>'+obj.name+'</td>'
                    +'<td>'+obj.uuid+'</td>'
                    +'<td>'+this.getTypeHtml(obj.type)+'</td>'
                    //+'<td>'+obj.owner+'</td>'
                    +'<td>'+obj.last_modifier+'</td>'
                    +'<td>'+obj.last_build_time+'</td>'
                    +'<td>'+obj.total_num+'</td>'
                    +'<td>'+this.getStatus(obj.status)+'</td>'
                    +'<td>'+obj.last_modify_time+'</td>'
                    +'<td data-id='+data[i].id+' data-type="'+obj.type+'">'
                    +'<i class="fa fa-fw fa-cog pull-left modify '+(obj.type=="UPLOAD"?"faDisabled":"")+'" title="修改"></i>'
                    +'<i class="fa fa-fw fa-times pull-left delete" title="删除"></i>'
                    +'<i class="fa fa-fw fa-refresh pull-left" title="刷新数据"></i>'
                    +'<i class="fa fa-fw fa-download pull-left" title="下载"></i>'
                    +'<i class="fa fa-fw fa-file-text-o pull-left" title="查看"></i>'
                    +'<i class="fa fa-fw fa-arrow-circle-up pull-left '+ (obj.status=="RL"?"faDisabled":"")+' " title="上线"></i>'
                    +'<i class="fa fa-fw fa-arrow-circle-down pull-left '+ (obj.status!="RL"?"faDisabled":"")+'" title="下线"></i>'
                    +'<i class="fa fa-fw fa-plane pull-left" title="推送"></i>'
                    +'</td>'
                    +'</tr>';
                strHtml = strHtml  + sHtml;
            }
            $("#taglistTable").html(strHtml);
        },

        getStatus:function(status){
            if(status=="NEW"){
                return '未上线';
            }else if(status=="RL"){
                return '<a style="color:#24b971;">已上线</a>';
            }else if(status=="PENDING"){
                return '<a style="color:#ad4927;">已下线</a>';
            }
            return "";
        },

        getTypeHtml:function(type){
            if(type=="SELECT"){
                return '筛选群组';
            }else if(type=="DERIVED"){
                return '复合群组';
            }else if(type=="LLOAD"){
                return '服务器上传';
            }else{
                return '自定义上传';
            }
        },

        getType:function(id){
            if(id == 1){
                return "维度";
            }else if(id == 2){
                return "静态指标";
            }else if(id == 3){
                return "动态指标";
            }
            return "";
        }


    };
    ruleList.init();
});
