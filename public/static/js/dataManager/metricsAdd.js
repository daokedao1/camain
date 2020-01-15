/**
 * Created by user on 16/6/24.
 */
require(['jquery', 'jquery.bootstrap', 'jquery.datetimepicker', 'common', 'quickSearch', 'app'], function ($) {
    var userManagerAdd = {
        isModify: false,
        id: null,
        init: function () {
            this.initEvent();
            this.id = $.getQueryString("id");
            if (this.id != null) {
                this.getGroupInfo();
                this.isModify = true;
            } else {
                this.isModify = false;
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
            const dbTable = $("#dbTable").val();
            const alias = $("#alias").val();
            const field = $("#field").val();
            const name = $("#name").val();
            const note = $("#note").val();
            const type = $("#type").val();

            if ($.trim(dbTable) === '') {
                showTip("表名不能为空.");
                return;
            }

            var data = {
                id: _this.id,
                dbTable: dbTable,
                alias: alias,
                field: field,
                name: name,
                note: note,
                type: type,
            };

            let addUrl = "/venus/datamanager/createTableMetrics";

            let modifyUrl = "/venus/datamanager/modifyTableMetrics";

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
                        location.href = "metricsList.html";
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
                url: "/venus/datamanager/search",
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

            $("#code").val(u.code);
            $("#dbTable").val(u.dbTable);
            $("#alias").val(u.alias);
            $("#field").val(u.field);
            $("#name").val(u.name);
            $("#note").val(u.note);
            $("#type").val(u.type);

        }
    };
    userManagerAdd.init();
});
