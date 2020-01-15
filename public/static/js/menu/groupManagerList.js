/**
 * Created by user on 16/6/24.
 */
/**
 * Created by user on 16/6/20.
 */
require(['jquery', 'jquery.bootstrap', 'jquery.datetimepicker', 'common', 'quickSearch', 'app'], function ($) {
    var groupManagerList = {

        pageNo: 1,

        pageSize: 10,

        totalPage: 0,

        totalRecords: 0,

        init: function () {
            this.initEvent();
            this.getGroupList();
        },

        initEvent: function () {
            var _this = this;

            $("#addGroup").click(function(){
                location.href = "groupManagerAdd.html";
            });

            $("#prevPage").click(function(){
                if(_this.pageNo <= 1){
                    return;
                }else{
                    _this.pageNo = _this.pageNo - 1;
                    _this.getGroupList();
                }
            });

            $("#nextPage").click(function(){
                if(_this.pageNo >= _this.totalPage){
                    return;
                }
                _this.pageNo = _this.pageNo + 1;
                _this.getGroupList();
            });
            $(".searchTh input").keydown(function(e){
                var e = e || window.event;
                if(e.keyCode == "13"){
                    _this.pageNo = 1;
                    _this.getGroupList();
                }
            });
            $(".searchTh select").change(function(e){
                _this.pageNo = 1;
                _this.getGroupList();
            });

            $("#DBlistTable").delegate(".fa", "click", function () {
                var $this = $(this);
                if ($this.hasClass("faDisabled")) {
                    return;
                } else {
                    if ($this.hasClass("fa-times")) {
                        $.showModal({
                            content: "确认删除该用户组.",
                            sureCallBack: function () {
                                _this.deleteGroup($this.parent().attr("data-id"));
                            }
                        })
                    } else if ($this.hasClass("fa-cog")) {
                        location.href = "groupManagerAdd.html?id=" + $this.parent().attr("data-id");
                    }
                }
            });

        },

        deleteGroup:function(id){
            var _this = this;
            showloading(true);
            $.ajax({
                type: "post",
                url: "/venus/authUserGroup/deleteUserGroup",
                data: {
                    id:id
                },
                success: function (result) {
                    showloading(false);
                    if(result && result.success){
                        showTip("删除成功");
                        _this.getGroupList();
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

        getGroupList: function () {
            var _this = this;
            var userGroup = {
                type: "url",
                name:$("#name").val(),
                userCount:$("#userCount").val(),
                departments:$("#departments").val(),
                rank:$("#rank").val(),
                roleNamesStr:$("#roleNamesStr").val()
            };

            showloading(true);
            $.ajax({
                type: "post",
                url: "/venus/authUserGroup/listUserGroup/"+_this.pageSize+"/"+_this.pageNo,
                dataType: "json",
                contentType: 'application/json',
                data: JSON.stringify(userGroup),
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        var dat = result.pairs.pageModel;
                        _this.setDataList(dat);
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

        setDataList: function (dat) {
            this.totalPage = dat.totalPage;
            this.totalRecords = dat.totalRecords;
            $("#currentPageNum").html(this.pageNo);
            $("#totalPageNum").html(this.totalPage);
            $("#totalNum").html(this.totalRecords);
            var data = dat.results;

            var strHtml = "";
            for (var i = 0; i < data.length; i++) {
                var opeFa = "";
                    opeFa = '<i class="fa fa-fw fa-cog pull-left myfabut"></i>'
                        + '<i class="fa fa-fw fa-times pull-left myfabut"></i>';

                var sHtml = '<tr>'
                    + '<td title="' + data[i].name + '">' + data[i].name + '</td>'
                    + '<td title="' + data[i].userCount + '">' + data[i].userCount + '</td>'
                    + '<td title="' + data[i].departments + '">' + data[i].departments + '</td>'
                    + '<td title="' + data[i].roleNamesStr + '">' + data[i].roleNamesStr + '</td>'
                    + '<td title="' + data[i].rank + '">' + data[i].rank + '</td>'
                    + '<td title="' + (new Date(data[i].createTime)).Format("yyyy-MM-dd hh:mm:ss") + '">' + (new Date(data[i].createTime)).Format("yyyy-MM-dd hh:mm:ss") + '</td>'
                    + '<td title="' + (new Date(data[i].timestamp)).Format("yyyy-MM-dd hh:mm:ss") + '">' + (new Date(data[i].timestamp)).Format("yyyy-MM-dd hh:mm:ss") + '</td>'
                    + '<td data-id="' + data[i].id + '">'
                    + opeFa
                    + '</td>'
                    + '</tr>';
                strHtml = strHtml + sHtml;
            }
            $("#DBlistTable").html(strHtml);
        }

    };
    groupManagerList.init();
});
