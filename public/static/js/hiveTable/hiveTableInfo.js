/**
 * Created by user on 16/6/20.
 */

require(['jquery', 'codemirror', '/other/bootstrap-table/bootstrap-table.js', 'jquery.bootstrap', 'jquery.datetimepicker', 'common', 'quickSearch', 'app', 'sql', 'show-hint', 'sql-hint'], function ($, CodeMirror) {
    var hiveTableInfo = {

        hdb: "",

        tableId: "",

        tableName: "",

        _jm: null,

        dbNames: [],

        init: function () {

            var _this = this;

            _this.initEvent();
            _this.hdb = $.getQueryString("hdb");
            _this.tableId = $.getQueryString("tableId");
            _this.tableName = $.getQueryString("name");
            _this.getInfo();
            _this.getJsmindInfo();
            _this.getPreview();

            var mime = 'text/x-mariadb';
            // get mime type
            if (window.location.href.indexOf('mime=') > -1) {
                mime = window.location.href.substr(window.location.href.indexOf('mime=') + 5);
            }
            window.editor = CodeMirror.fromTextArea(document.getElementById('sql'), {
                mode: mime,
                indentWithTabs: true,
                smartIndent: true,
                lineNumbers: true,
                matchBrackets: true,
                extraKeys: {"Ctrl-Space": "autocomplete"}
            });

            editor.setValue("\n\n\n\n\n\n\n\n\n\n");//暂时解决样式问题

            editor.on("blur", function () {
                _this.liveCursor = editor.getCursor();
            });


            if ($(".content-wrapper").height() > document.body.clientHeight) {
                $(".main-sidebar").css("height", $(".content-wrapper").height() + 60)
            }

        },

        initEvent: function () {
            var _this = this;

            $("#startSql").click(function () {
                // alert("aaaa");
                _this.startSql();
            });

        },

        startSql: function () {

            let _this = this;

            var sql = editor.getValue();
            if ($.trim(sql) === "") {
                showTip("请填写sql");
                return;
            }
            $.ajax({
                type: "get",
                url: "/venus/clickhouse/manager/query",
                data: {
                    names: _this.hdb,
                    sql: sql
                },
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        var dat = result.pairs.retVal;
                        _this.createQueryTable(dat);
                    } else {
                        $.showModal({content: result.message});
                    }
                },
                error: function (a, b, c) {
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },

        getPreview: function () {
            var _this = this;
            $.ajax({
                type: "get",
                url: "/venus/clickhouse/manager/preview",
                data: {
                    tableId: _this.tableId
                },
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        var dat = result.pairs.dat;
                        _this.createQueryTable(dat);
                    } else {
                        $.showModal({content: result.message});
                    }
                },
                error: function (a, b, c) {
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },
        createQueryTable: function createQueryTable(data) {
            var heads = [];
            for (key in data[0]) {
                heads.push({"title": key, "field": key});
            }
            var queryTable = $("#queryTableId");
            queryTable.bootstrapTable(
                "refreshOptions",
                {
                    striped: true,
                    locale: "zh-CN",
                    columns: heads
                }
            );
            queryTable.bootstrapTable('load', data)
        },

        getJsmindInfo: function () {
            var _this = this;
            showloading(true);
            $.ajax({
                type: "get",
                url: "/venus/metadata/consanguinity/table",
                data: {
                    tableId: _this.tableId
                },
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        var dat = result.pairs.dat;
                        _this.hdb = dat.dbName;
                        _this.tableName = dat.tableName;

                        _this.initJsmind(dat);
                    } else {
                        $.showModal({content: result.message});
                    }
                },
                error: function (a, b, c) {
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },

        initJsmind: function (dat) {
            var _this = this;
            var options = {
                container: 'jsmind_container',
                theme: 'clouds',
                editable: false
            };
            var mind = {
                "meta": {
                    "name": "jsMind venus",
                    "author": "zebing.wu",
                    "version": "0.1"
                },
                "format": "node_tree",
                "data": {
                    "id": "root",
                    "topic": "当前节点",
                    "background-color": "#ffec00",
                    "font-size": "10px",
                    "children": []
                }
            };
            mind.data.topic = dat.tableName;
            mind.data.id = dat.tableId;
            var downstreamTasks = dat.downstreamTasks, upstreamTasks = dat.upstreamTasks;
            for (var u = 0; u < upstreamTasks.length; u++) {
                var up = upstreamTasks[u], uobj = {}, uchildren = up.upstreamTables;
                //uobj.id=up.taskId;
                uobj.id = "u" + u;
                uobj.topic = up.taskName;
                uobj.direction = "left";
                uobj["background-color"] = "#fff";
                uobj.children = [];
                for (var uu = 0; uu < uchildren.length; uu++) {
                    this.dbNames["u" + u + "uu" + uu] = uchildren[uu].dbName;
                    uobj.children.push({
                        "id": "u" + u + "uu" + uu,
                        "topic": uchildren[uu].tableName,
                        "dbName": uchildren[uu].dbName,
                        "background-color": "#ffec00",
                        "font-size": "10px"
                    });
                }
                mind.data.children.push(uobj);

            }
            for (var u = 0; u < downstreamTasks.length; u++) {
                var down = downstreamTasks[u], uobj = {}, uchildren = down.downstreamTables;
                //uobj.id=down.taskId;
                uobj.id = "d" + u;
                uobj.topic = down.taskName;
                uobj.direction = "right";
                uobj["background-color"] = "#fff";
                uobj.children = [];
                for (var uu = 0; uu < uchildren.length; uu++) {
                    this.dbNames["d" + u + "duu" + uu] = uchildren[uu].dbName;
                    uobj.children.push({
                        "id": "d" + u + "duu" + uu,
                        "topic": uchildren[uu].tableName,
                        "dbName": uchildren[uu].dbName,
                        "background-color": "#ffec00",
                        "font-size": "10px"
                    });
                }
                mind.data.children.push(uobj);
            }

            this._jm = jsMind.show(options, mind);
        },

        getInfo: function () {
            var _this = this;
            showloading(true);
            $.ajax({
                type: "get",
                url: "/venus/metadata/table/get",
                data: {
                    tableId: _this.tableId,
                    cascade: true
                },
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        var dat = result.pairs.dat;
                        _this.setInfo(dat);
                    } else {
                        $.showModal({content: result.message});
                    }
                },
                error: function (a, b, c) {
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },

        setInfo: function (dat) {
            this.orginDate = dat;
            $("#biaoming").val(dat.name);
            $("#desc").val(dat.chineseName);
            $("#jishi").val(dat.dbName);
            $("#miaoshu").val(dat.note);
            $("#fuzeren").val(dat.creator);
            $("#jiqun").val(dat.location);
            $("#atime").val((new Date(dat.createTime)).Format("yyyy-MM-dd"));
            $("#ctime").val((new Date(dat.timestamp)).Format("yyyy-MM-dd"));


            var hiveType = dat.hiveType;
            if (hiveType == "MANAGED_TABLE") {
                $("#biaoguanxi").val("内部表");
            } else {
                $("#biaoguanxi").val("外部表");
            }

            this.setTableElm(dat.columnList);
        },

        setTableElm: function (data) {
            for (var i = 0; i < data.length; i++) {
                var isPartitionClass = "";
                if (data[i].isPartition == 1) {
                    isPartitionClass = "isPartitionClass";
                }
                var shtml = '<tr class="' + isPartitionClass + '">'
                    + '<th>' + data[i].name + '</th>'
                    + '<th>' + data[i].type + '</th>'
                    + '<th>' + data[i].note + '</th>'
                    + '</tr>';
                $("#tableStr").append(shtml);
            }

        },

        showDBName: function (id) {
            var dbname = this.dbNames[id];
            if (dbname) {
                $(".dbnameInfo").slideUp(500, function () {
                    $(".dbnameInfo").html("该表所在库是:" + dbname);
                    $(".dbnameInfo").slideDown();
                });
            } else {
                $(".dbnameInfo").slideUp();
            }
        }

    };
    hiveTableInfo.init();
    jsMind.hiveTableInfo = hiveTableInfo;
});
