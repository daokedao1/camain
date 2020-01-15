/**
 * Created by user on 16/6/20.
 */
require(['jquery', 'jquery.bootstrap', 'jquery.datetimepicker', 'common', 'quickSearch', 'app'], function ($) {
    var roleAllocationAdd = {

        users:null,

        id:null,

        init: function () {
            this.initEvent();
            this.id = $.getQueryString("id");
            this.type = $.getQueryString("type");
            this.name = decodeURI(decodeURI($.getQueryString("name")));
            if(this.id != null){
                $("#userGroup").attr("disabled","disabled");
                $("#users").attr("disabled","disabled");
                $("#chooseDiv").hide();
                if(this.type == 0){
                    $("#userDiv").hide();
                    $("#groupDiv").show();
                    $("#userGroup").val(this.name);
                    this.getGroupInfo();
                }else{
                    $("#userDiv").show();
                    $("#groupDiv").hide();
                    $("#users").val(this.name);
                    this.getUserInfo();
                }
                //this.getGroupList();

                //this.getGroupInfo();
            }
            //else{
            //    this.getUsers();
            //    this.getGroups();
            //    this.getGroupList();
            //}
        },

        initEvent: function () {
            var _this = this;

            $("input[name=dbtype]").click(function(){
                var value = $("input[name=dbtype]:checked").val();
                if(value == "0"){
                    $("#userDiv").hide();
                    $("#groupDiv").show();
                }else{
                    $("#userDiv").show();
                    $("#groupDiv").hide();
                }
            });

            $("#userTable").delegate(".fa-square-o","click",function(){
                var _t = $(this);
                _t.removeClass("fa-square-o");
                _t.addClass("fa-check-square-o");
                _t.parent().parent().parent().attr("data-checked","true");
            });
            $("#userTable").delegate(".fa-check-square-o","click",function(){
                var _t = $(this);
                _t.removeClass("fa-check-square-o");
                _t.addClass("fa-square-o");
                _t.parent().parent().parent().attr("data-checked","false");
            });

            $("#addGroup").click(function(){
                if(_this.type == 0){
                    _this.saveGroupConfig();
                }else{
                    _this.saveUserConfig();
                }
            });
        },

        saveGroupConfig:function(){
            var userGroup = {
                id:"",
                userGroupRoles:[]
            };

            userGroup.id = $("#userGroup").attr("data-value");

            var trs  = $("#userTable tr[data-checked=true]");
            //if(trs.length<=0){
            //    showTip("请最少选择一个角色");
            //    return;
            //}
            for(var i=0;i<trs.length;i++){
                userGroup.userGroupRoles.push({
                    roleId:trs.eq(i).attr("data-id")
                });
            }

            var url = "/venus/authUserGroup/addRoleToUserGroup";
            if(this.id != null){
                url = "/venus/authUserGroup/updateRoleToUserGroup";
                userGroup.id = this.id;
            }
            showloading(true);
            $.ajax({
                type: "post",
                url: url,
                dataType: "json",
                contentType: 'application/json',
                data: JSON.stringify(userGroup),
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        location.href="roleAllocationList.html?type=0";
                    } else {
                        $.showModal({content: "保存失败: "+result.message});
                    }
                },
                error: function (a, b, c) {
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },

        saveUserConfig:function(){
            var user = {
                id:this.id,
                userRoles:[]
            };
            var trs  = $("#userTable tr[data-checked=true]");
            //if(trs.length<=0){
            //    showTip("请最少选择一个角色");
            //    return;
            //}
            for(var i=0;i<trs.length;i++){
                user.userRoles.push({
                    roleId:trs.eq(i).attr("data-id")
                });
            }

            var url = "/venus/users/addRoleToUser";
            if(this.id != null){
                url = "/venus/users/updateRoleToUser";
            }
            showloading(true);
            $.ajax({
                type: "post",
                url: url,
                dataType: "json",
                contentType: 'application/json',
                data: JSON.stringify(user),
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        location.href="roleAllocationList.html?type=1";
                    } else {
                        $.showModal({content: "保存失败: "+result.message});
                    }
                },
                error: function (a, b, c) {
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },



        getGroupInfo:function(){
            var _this = this;
            showloading(true);
            $.ajax({
                type: "post",
                url: "/venus/authUserGroup/getUserGroup",
                data: {
                    id:_this.id
                },
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        var dat = result.pairs.userGroup,_users = dat.users,roles = dat.roles;
                        _this.getGroupList(roles);
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


        getGroupList: function (roles) {
            var _this = this;
            var role = {
            };
            showloading(true);
            $.ajax({
                type: "post",
                url: "/venus/auth/role/listRole/999999/1",
                dataType: "json",
                contentType: 'application/json',
                data: JSON.stringify(role),
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        var dat = result.pairs.pageModel;
                        _this.setDataList(dat,roles);
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

        setDataList: function (dat,roles) {
            var data = dat.results;
            var strHtml = "";
            for (var i = 0; i < data.length; i++) {
                var opeFa = "",checed = false;
                if( roles && roles!= null && this.checkIn(data[i].id,roles)){
                    opeFa = '<i class="fa fa-fw fa-check-square-o pull-left myfabut"></i>';
                    checed = true;
                }else{
                    opeFa = '<i class="fa fa-fw fa-square-o pull-left myfabut"></i>';
                    checed = false;
                }

                var sHtml = '<tr data-id="'+data[i].id+'" data-checked="'+checed+'">'
                    +'<td><span class="spanBreak" style="width:50px;">'+(i+1)+'</span></td>'
                    +'<td><span class="spanBreak" style="width:900px;">'+data[i].name+'</span></td>'
                    +'<td><span class="spanBreak deleteUserSpan" style="width:50px;cursor: pointer;">'+opeFa+'</span></td>'
                    +'</tr>';
                strHtml = strHtml + sHtml;
            }
            $("#userTable").html(strHtml);
        },

        checkIn:function(id,roles){
            for(var i=0;i<roles.length;i++){
                if(roles[i].id == id){
                    return true;
                }
            }
            return false;
        },

        getUserInfo:function(){
            var _this = this;
            showloading(true);
            $.ajax({
                type: "post",
                url: "/venus/users/getUser",
                data: {
                    id:_this.id
                },
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        var dat = result.pairs.user,roles = dat.roles;
                        _this.getGroupList(roles);
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

        getGroups: function () {
            showloading(true);
            $.ajax({
                type: "post",
                url: "/venus/authUserGroup/listUserGroup/999999/1",
                dataType: "json",
                contentType: 'application/json',
                data: JSON.stringify({}),
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        var dat = result.pairs.pageModel;
                        $("#userGroup").quickSearch({
                            data: dat.results,
                            text: "name",
                            value: "id",
                            width: "400px"
                        });
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

        getUsers: function () {
            var _this = this;
            showloading(true);
            $.ajax({
                type: "post",
                url: "/venus/users/listUser",
                data: {},
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        var dat = result.pairs.users;
                        _this.users = dat;
                        $("#users").quickSearch({
                            data: dat,
                            text: "loginName",
                            value: "id",
                            width: "400px"
                        });
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
    roleAllocationAdd.init();
});
