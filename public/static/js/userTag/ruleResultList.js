/**
 * Created by user on 16/6/20.
 */
require(['jquery','jquery.bootstrap','jquery.datetimepicker','common','quickSearch','app'],function($,d3){
    var ruleResultList = {

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

        },

        getTagList:function(){
            var _this = this;
            showloading(true);
            $.ajax({
                type: "post",
                url: "/venus/usergroup/group/list_job_his",
                data: {
                    pageNo:_this.pageNo,
                    pageSize:_this.pageSize
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
                var id = data[i].id,obj = data[i];
                var sHtml = '<tr>'
                    //+'<td>'+obj.jobid+'</td>'
                    +'<td>'+obj.item_id+'</td>'
                    +'<td>'+this.getType(obj.item_type)+'</td>'
                    +'<td>'+obj.item_name+'</td>'
                    +'<td>'+this.getStatus(obj.status)+'</td>'
                    +'<td>'+obj.start_time+'</td>'
                    +'<td>'+obj.end_time+'</td>'
                    +'</tr>';
                strHtml = strHtml  + sHtml;
            }
            $("#taglistTable").html(strHtml);
        },

        getType:function(type){
            if(type=="UG-BUILD"){
                return '群组刷新任务';
            }else if(type=="UG-PUSH"){
                return '群组推送任务';
            }else if(type=="LB-BUILD"){
                return '标签刷新任务';
            }
            return "";
        },

        getStatus:function(status){
            if(status=="RUNNING"){
                return '运行中';
            }else if(status=="SUCC"){
                return '<a style="color:#24b971;">成功</a>';
            }else if(status=="FAILED"){
                return '<a style="color:#ad4927;">失败</a>';
            }
            return "";
        }


    };
    ruleResultList.init();
});
