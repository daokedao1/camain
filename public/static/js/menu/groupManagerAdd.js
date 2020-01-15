/**
 * Created by user on 16/6/24.
 */
/**
 * Created by user on 16/6/20.
 */
require(['jquery', 'jquery.bootstrap', 'jquery.datetimepicker', 'common', 'quickSearch', 'app'], function ($) {
    var groupManagerAdd = {

        users:null,

        id:null,

        init: function () {
            this.initEvent();
            this.getUsers();
            this.id = $.getQueryString("id");
            if(this.id != null){
                this.getGroupInfo();
            }
        },

        initEvent: function () {
            var _this = this;

            $("#addUser").click(function(){
                var value = $("#users").val();
                _this.addUserToList(value);
            });

            $("#userTable").delegate(".deleteUserSpan","click",function(){
                $(this).parent().parent().remove();
                _this.sortTableNum();
            })

            $("#addGroup").click(function(){
                _this.saveGroup();
            });
        },

        saveGroup:function(){
            var name = $("#name").val();
            if($.trim(name) == '') {
                showTip("用户组名称不能为空.")
                return;
            }
            var userGroupUsers = [],trs = $("#userTable tr");
            for(var i=0;i<trs.length;i++){
                var obj = {};
                obj.userId = trs.eq(i).attr("data-id");
                userGroupUsers.push(obj);
            }
            var url = "/venus/authUserGroup/saveUserGroup";
            var data = {
                name:name,
                userGroupUsers:userGroupUsers
            };
            data.type = "url";
            if(this.id != null){
                url = "/venus/authUserGroup/updateUserGroup";
                data.id = this.id;
            }


            showloading(true);
            $.ajax({
                type: "post",
                url: url,
                dataType: "json",
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        location.href="groupManagerList.html";
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

        addUserToList:function(value){
            if(value==""){
                return;
            }
            if($("#userTable tr[data-loginName='"+value+"']").length>0){
                showTip("用户 "+value+" 已经存在于列表中,请勿重复添加.");
                return;
            }
            for(var i=0;i<this.users.length;i++){
                var user = this.users[i];
                if(user.loginName == value){
                    var strHtml = '<tr data-id="'+user.id+'" data-loginName="'+user.loginName+'">'
                        +'<td><span class="spanBreak" style="width:50px;">1</span></td>'
                        +'<td><span class="spanBreak" style="width:150px;">'+user.loginName+'</span></td>'
                        +'<td><span class="spanBreak" style="width:150px;">'+user.department+'</span></td>'
                        +'<td><span class="spanBreak" style="width:150px;">'+user.jobType+'</span></td>'
                        +'<td><span class="spanBreak" style="width:150px;">'+user.mail+'</span></td>'
                        +'<td><span class="spanBreak" style="width:150px;">'+user.phone+'</span></td>'
                        +'<td><span class="spanBreak" style="width:150px;">'+user.roleNamesStr+'</span></td>'
                        +'<td><span class="spanBreak deleteUserSpan" style="width:50px;cursor: pointer;">删除</span></td>'
                        +'</tr>';
                    if($("#userTable tr").length>0){
                        $("#userTable tr:first").before(strHtml);
                    }else{
                        $("#userTable").append(strHtml);
                    }

                    break;
                }
            }
            this.sortTableNum();
        },

        sortTableNum:function(){
            var userTableTrs = $("#userTable tr");
            for(var i=0;i<userTableTrs.length;i++){
                userTableTrs.eq(i).find("td:first").find("span").html(i+1);
            }
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
                        var dat = result.pairs.userGroup,_users = dat.users;
                        $("#name").val(dat.name);
                        _this.setInfo(_users);
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

        setInfo:function(_users){
            for(var i=0;i<_users.length;i++){
                var user = _users[i];
                var strHtml = '<tr data-id="'+user.id+'" data-loginName="'+user.loginName+'">'
                    +'<td><span class="spanBreak" style="width:50px;">'+(i+1)+'</span></td>'
                    +'<td><span class="spanBreak" style="width:150px;">'+user.loginName+'</span></td>'
                    +'<td><span class="spanBreak" style="width:150px;">'+user.department+'</span></td>'
                    +'<td><span class="spanBreak" style="width:150px;">'+user.jobType+'</span></td>'
                    +'<td><span class="spanBreak" style="width:150px;">'+user.mail+'</span></td>'
                    +'<td><span class="spanBreak" style="width:150px;">'+user.phone+'</span></td>'
                    +'<td><span class="spanBreak" style="width:150px;">'+user.roleNamesStr+'</span></td>'
                    +'<td><span class="spanBreak deleteUserSpan" style="width:50px;cursor: pointer;">删除</span></td>'
                    +'</tr>';
                $("#userTable").append(strHtml);
            }

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
    groupManagerAdd.init();
});
