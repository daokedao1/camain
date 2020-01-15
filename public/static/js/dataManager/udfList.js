/**
 * Created by user on 16/6/20.
 */
require(['jquery','jquery.bootstrap','jquery.datetimepicker','common','quickSearch','app'],function($){
    var udfList = {

        pageNo:1,

        pageSize:10,

        totalPage:0,

        totalRecords:0,

        init:function(){
            this.initEvent();
            this.getUdfList();
        },

        initEvent:function(){
            var _this = this;

            $('#createTime,#updateTime').datetimepicker({
                format: "yyyy-mm-dd",
                autoclose: true,
                todayBtn: true,
                todayHighlight: true,
                showMeridian: true,
                minView:2,
                pickerPosition: "bottom-right",
                language: "zh-CN"
            });


            $("#addUdf").click(function(){
                location.href = 'udfAdd.html';
            });

            $("#prevPage").click(function(){
                if(_this.pageNo <= 1){
                    return;
                }else{
                    _this.pageNo = _this.pageNo - 1;
                    _this.getUdfList();
                }
            });

            $("#nextPage").click(function(){
                if(_this.pageNo >= _this.totalPage){
                    return;
                }
                _this.pageNo = _this.pageNo + 1;
                _this.getUdfList();
            });

            $(".searchTh input").keydown(function(e){
                var e = e || window.event;
                if(e.keyCode == "13"){
                    _this.pageNo = 1;
                    _this.getUdfList();
                }
            });
            $(".searchTh select").change(function(e){
                _this.pageNo = 1;
                _this.getUdfList();
            });

            $("#taskTableList").delegate(".modify","click",function(){
                location.href = "udfAdd.html?id="+$(this).parent().attr("data-id");
            });
            $("#taskTableList").delegate(".delete","click",function(){
                if(confirm("是否要删除该节点?")){
                    _this.deleteTask($(this).parent().attr("data-id"));
                }
            });
        },

        deleteTask:function(id){
            var _this = this;

            showloading(true);
            $.ajax({
                type: "post",
                url: "/venus/transform/udf/deleteUDF",
                data: {
                    id:id
                },
                success: function (result) {
                    showloading(false);
                    if(result && result.success){
                        _this.getUdfList();
                    }else{
                        $.showModal({content:"删除失败:"+result.message});
                    }
                },
                error:function(a,b,c){
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },

        getUdfList:function(firstMenuId){
            var _this = this;
            var script ={
                udfName:$("#name").val(),
                className:$("#className").val(),
                administrator:$("#fuzeren").val(),
                createTime:$("#createTime").val(),
                timestamp:$("#updateTime").val()
            };
            showloading(true);
            $.ajax({
                type: "post",
                url: "/venus/transform/udf/listUDF/"+_this.pageSize + "/"+this.pageNo,
                dataType:"json",
                contentType: 'application/json',
                data: JSON.stringify(script),
                success: function (result) {
                    showloading(false);
                    if(result && result.success){
                        var dat = result.pairs.pageModel;
                        _this.setDataList(dat);
                    }else{
                        $.showModal({content:"查询失败"});
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
                var sHtml = '<tr>'
                    +'<td>'+data[i].udfName+'</td>'
                    +'<td>'+data[i].className+'</td>'
                    +'<td>'+data[i].describe+'</td>'
                    +'<td>'+data[i].administrator+'</td>'
                    +'<td>'+data[i].jarPath+'</td>'
                    +'<td>'+new Date(data[i].createTime).Format('yyyy-MM-dd hh:mm:ss')+'</td>'
                    +'<td>'+new Date(data[i].timestamp).Format('yyyy-MM-dd hh:mm:ss')+'</td>'
                    +'<td data-id="'+data[i].id+'">'
                    +'<i class="fa fa-fw fa-cog pull-left modify"></i>'
                    +'<i class="fa fa-fw fa-times pull-left delete"></i>'
                    +'</td>'
                    +'</tr>';
                strHtml = strHtml  + sHtml;
            }
            $("#taskTableList").html(strHtml);
        }

    }
    udfList.init();
});
