/**
 * Created by user on 16/6/24.
 */
/**
 * Created by user on 16/6/20.
 */
require(['jquery', 'jquery.bootstrap', 'jquery.datetimepicker', 'common', 'quickSearch', 'app'], function ($) {
    var userManagerAdd = {
        isModify:false,
        id:null,
        init: function () {
            this.initEvent();
            this.id = $.getQueryString("id");
            if (this.id != null) {
                this.getGroupInfo();
                this.isModify=true;
            }else{
                this.isModify=false;
            }
        },

        initEvent: function () {
            var _this = this;

            $("#addGroup").click(function () {
                _this.saveGroup();
            });
        },

        saveGroup: function () {
            const _this = this;
            const real_name = $("#real_name").val();
            const login_name = $("#login_name").val();
            const department = $("#department").val();
            const mail = $("#mail").val();
            const phone = $("#phone").val();
            const description = $("#description").val();

            if ($.trim(real_name) === '') {
                showTip("姓名不能为空.");
                return;
            }

            var data = {
                id:_this.id,
                realName: real_name,
                loginName: login_name,
                department: department,
                mail: mail,
                phone: phone,
                description: description
            };

            let addUrl = "/venus/users/createUser";
            let modifyUrl = "/venus/users/modifyUser";

            let url = this.isModify ? modifyUrl : addUrl;

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
                        location.href = "userManagerList.html";
                    } else {
                        $.showModal({content: "保存失败: " + result.message});
                    }
                },
                error: function (a, b, c) {
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },
        getGroupInfo: function () {
            var _this = this;
            showloading(true);
            $.ajax({
                type: "post",
                url: "/venus/users/search",
                data: {
                    id: _this.id
                },
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        var user = result.pairs.dat;

                        _this.setInfo(user);
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
        setInfo: function (u) {

            $("#real_name").val(u.realName);
            $("#login_name").val(u.loginName);
            $("#department").val(u.department);
            $("#mail").val(u.mail);
            $("#phone").val(u.phone);
            $("#description").val(u.description);

        },
        // 设置 用户的所属组,角色和菜单
        getRouleInfo: function () {
            var _this = this;
            showloading(true);
            $.ajax({
                type: "post",
                url: "/venus/users/getUserRole",
                data: {
                    id: _this.id
                },
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        var user = result.pairs.dat;

                        _this.setRoleInfo(user);
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
        setRoleInfo: function (u) {

            $("#userGroups").val(u.userGroups);
            $("#userRoles").val(u.userRoles);
            $("#userMenus").val(u.userMenus);

        }
    };
    userManagerAdd.init();
});
