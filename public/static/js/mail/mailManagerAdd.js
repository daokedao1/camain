/**
 * Created by user on 16/6/20.
 */
require(['jquery', 'jquery.bootstrap', 'jquery.datetimepicker', 'common', 'quickSearch', 'app'], function ($) {
    var userManagerAdd = {

        init: function () {
            this.initEvent();
            this.id = $.getQueryString("id");
            if (this.id != null) {
                this.getGroupInfo();
            }
        },

        initEvent: function () {
            var _this = this;

            $("#addGroup").click(function () {
                _this.saveGroup();
            });
        },

        saveGroup: function () {
            var real_name = $("#real_name").val();
            var login_name = $("#login_name").val();
            var department = $("#department").val();
            var mail = $("#mail").val();
            var phone = $("#phone").val();
            var description = $("#description").val();

            if ($.trim(real_name) == '') {
                showTip("姓名不能为空.");
                return;
            }

            var data = {
                realName: real_name,
                loginName: login_name,
                department: department,
                mail: mail,
                phone: phone,
                description: description
            };

            var url = "/venus/mails/createMail";

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
                        location.href = "mailManagerList.html";
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
                url: "/venus/mails/search",
                data: {
                    id: _this.id
                },
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        var mail = result.pairs.dat;

                        _this.setInfo(mail);
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

        }
    };
    mailManagerAdd.init();
});
