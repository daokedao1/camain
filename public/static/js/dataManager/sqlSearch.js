/**
 * Created by user on 16/6/20.
 */
require(['jquery','codemirror','jquery.bootstrap','jquery.datetimepicker','common','quickSearch','app','sql','show-hint','sql-hint'],function($,CodeMirror){
    var sqlSearch = {

        placeholder: '',

        data: null,

        setInterval: null,

        quickTimeOut:null,

        _tables:null,

        pageNo:1,

        pageSize:10,

        totalPage:0,

        resultData:"",

        liveCursor:null,

        controlFirstTip:true,

        init: function () {
            var _this = this;
            this.initEvent();
            this.getCangkuKU();
            this.getMarket();

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
                matchBrackets : true,
                extraKeys: {"Ctrl-Space": "autocomplete"}
            });
            editor.setValue("-- 由于我们的表文件类型较多，如果你要执行 Insert overwrite 或者 Insert into 语句，请根据目标表的文件类型，选择使用以下的参数\n"
            +"-- .lzo文件类型\n"
            +"-- set mapred.output.compress=true;\n"
            +"-- set hive.exec.compress.output=true;\n"
            +"-- set mapred.output.compression.codec=com.hadoop.compression.lzo.LzopCodec;\n"
            +"-- .parquet文件类型\n"
            +"-- set mapred.output.compress=true;\n"
            +"-- set hive.exec.compress.output=true;\n"
            +"-- set mapred.output.compression.codec=org.apache.hadoop.hive.ql.io.parquet.MapredParquetOutputFormat\n\n\n\n\n");//暂时解决样式问题
            editor.on("blur",function(){
                _this.liveCursor = editor.getCursor();
            });
        },

        initEvent: function () {
            var _this = this;

            $("#startSql").click(function () {
                var sql = editor.getValue();
                if ($.trim(sql) == "") {
                    showTip("请填写sql");
                    return;
                }
                $("#sqlMadel").modal("toggle");
            });

            $('#times').datetimepicker({
                format: "yyyy-mm-dd hh:ii:ss",
                autoclose: true,
                todayBtn: true,
                todayHighlight: true,
                showMeridian: true,
                pickerPosition: "bottom-right",
                language: "zh-CN"
            });

            $("#sureTimes").click(function () {
                var times = $("#times").val();
                if ($.trim(times) == "") {
                    showTip("请选择时间参数");
                    return;
                }

                $("#sqlMadel").modal("hide");
                _this.startSql(times);
            });

            $("#tiaoguo").click(function () {
                _this.startSql("");
            });

            $("#cangku").change(function(){
                var value = $(this).val();
                if(value == '-100'){
                    _this.getCangkuKU();
                }else{
                    _this.getMarketKU(value);
                }
            });
            $("#kulist").change(function(){
                var value = $(this).val();
                if(value != "-100"){
                    _this.getTables(value);
                }
            });

            $(".tables").delegate(".btn-box-tool","click",function(){
                var _t = $(this);

                if(_t.attr("data-flag")=="false"){
                    _this.getCulnms(_t.attr("data-id"),_t);
                }
            });

            $(".tables").delegate(".box-title","click",function(){
                var _t = $(this),text = _t.text();
                //_t.next().find(".btn-box-tool").trigger("click");
                _this.setValueCursor(text);
            });

            $(".tables").delegate(".box-body div","click",function(){
                var _t = $(this),text = _t.text();
                _this.setValueCursor(text);
            });

            $("#tableNameQuick").keyup(function (e) {
                var e = e || window.event;
                var value = $(this).val(),dbValue = $("#kulist").val();
                if(dbValue != "-100"){
                    if (e.keyCode != 38 && e.keyCode != 40) {
                        _this.quickTimeOut = setTimeout(function () {
                            _this.quicktables(value);
                        }, 500)
                    }
                }

            });
            $("#tableNameQuick").keydown(function (e) {
                var e = e || window.event;
                clearTimeout(_this.quickTimeOut);
            });


            $("#prevPage").click(function(){
                if(_this.pageNo <= 1){
                    return;
                }else{
                    _this.pageNo = _this.pageNo - 1;
                    _this.setTableMessage();
                }
            });

            $("#nextPage").click(function(){
                if(_this.pageNo >= _this.totalPage){
                    return;
                }
                _this.pageNo = _this.pageNo + 1;
                _this.setTableMessage();
            });

            $("#exportbut").click(function(){
                if(_this.data != null){
                    window.open("/venus/transform/dataQuery/exportResult?id="+_this.data.id);
                }

            });

            $("#stopSql").click(function(){
                _this.stopSql();
            });

        },

        stopSql:function(){
            var _this = this;
            showloading(true);
            $.ajax({
                type: "post",
                url: "/venus/transform/dataQuery/killQuery",
                data: {
                    id: _this.data.id
                },
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        showTip("终止任务成功.");
                        clearInterval(_this.setInterval);
                        _this.data = null;
                        $("#stopSql").hide();
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

        quicktables:function(value){
            var tables = $("#tables");
            tables.html("");
            var data = this._tables;
            for(var i=0;i<data.length;i++){
                if(data[i].name.toUpperCase().indexOf(value.toUpperCase())>-1){
                    var str = '<div class="box box-default collapsed-box">'
                        +'<div class="box-header with-border">'
                        +'<h3 class="box-title" title="'+data[i].name+'">'+data[i].name+'</h3>'
                        +'<div class="box-tools pull-right">'
                        +' <button class="btn btn-box-tool" data-widget="collapse" data-flag="false" data-id="'+data[i].id+'"><i class="fa plus fa-plus"></i></button>'
                        +'</div>'
                        +'</div>'
                        +'<div class="box-body" style="display: none;">'
                        +'</div>'
                        +'</div>';
                    tables.append(str);
                }
            }
        },

        startSql: function (times) {
            $("#stopSql").show();
            $("#logs").html("");
            $("#tableMessage").html("");
            var _this = this;
            showloading(true);
            $.ajax({
                type: "post",
                url: "/venus/transform/dataQuery/executeQuerySql",
                data: {
                    sql: editor.getValue(),
                    param: times
                },
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        _this.data = result.pairs.dataQuery;
                        _this.controlFirstTip = true;
                        _this.searchSqlLog();
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

        searchSqlLog: function () {
            var _this = this;
            _this.setInterval = setInterval(function () {
                $.ajax({
                    type: "post",
                    url: "/venus/transform/dataQuery/realTimeQueryLog",
                    sync: true,
                    data: {
                        id: _this.data.id,
                        lastTimeFileSize: _this.data.lastTimeFileSize,
                        path: _this.data.logPath
                    },
                    success: function (result) {
                        if (result && result.success) {
                            if (result.pairs.dataQuery.status == 1) {
                                if(_this.controlFirstTip){
                                    _this.controlFirstTip = false;
                                    showTip("执行完成");
                                    $("#stopSql").hide();
                                    $("#logs").html('<small>' + result.pairs.log + '</small></br>');
                                    clearInterval(_this.setInterval);
                                    _this.getTableMessage();
                                }
                            } else {
                                _this.data = result.pairs.dataQuery;
                                $("#logs").html('<small>' + result.pairs.log + '</small></br>');
                                $(".mytable").scrollTop($(".mytable")[0].scrollHeight);
                            }
                        } else {
                            clearInterval(_this.setInterval);
                            $("#stopSql").hide();
                            $.showModal({content: result.message});
                        }
                    },
                    error: function (a, b, c) {
                        alert(a.responseText);
                    }
                });
            }, 2000);
        },

        getTableMessage:function(){
            var _this = this;
            showloading(true);
            $.ajax({
                type: "post",
                url: "/venus/transform/dataQuery/queryResult",
                data: {
                    id: _this.data.id
                },
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        _this.resultData = result.pairs.queryResult;
                        _this.setTableMessage();
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

        setTableMessage:function(){
            var data = this.resultData;
            if(!data || data.length==0){
                return;
            }
            var tableMessage = $("#tableMessage"),titles = data[0].split("\t"),thead = "<tr>",elmLength = titles.length;
            for(var k=0;k<elmLength;k++){
                thead = thead + '<td>'+titles[k]+'</td>';
            }
            thead = thead + '</tr>';
            tableMessage.html(thead);

            this.totalPage = parseInt((data.length-1)/this.pageSize);
            if((data.length-1)%this.pageSize>0){
                this.totalPage = this.totalPage + 1;
            }

            var length = data.length>(this.pageSize*this.pageNo)?this.pageSize*this.pageNo:data.length;
            for(var i=1+this.pageSize*(this.pageNo-1);i<=length;i++){
                if(data[i] || data[i]==""){
                    var tds = data[i].split("\t"),tr="<tr>";
                    for(var j=0;j<elmLength;j++){
                        tr = tr + '<td>'+(tds[j]==""?"(空)":tds[j])+'</td>';
                    }
                    tr = tr + '</tr>';
                    tableMessage.append(tr);
                }
            }

            $("#currentPageNum").html(this.pageNo);
            $("#totalPageNum").html(this.totalPage);
            $("#totalNum").html(data.length-1);
        },

        getCulnms:function(id,_t){
            var _this = this;
            $.ajax({
                type: "get",
                url: "/venus/metadata/table/column/list",
                data: {
                    tableId: id
                },
                success: function (result) {
                    if (result && result.success) {
                        _this.setCulnms(result.pairs.dat,_t);
                        _t.attr("data-flag","true");
                    } else {
                        $.showModal({content: result.message});
                    }
                },
                error: function (a, b, c) {
                    alert(a.responseText);
                }
            });
        },
        setCulnms:function(data,_t){
            var tbody = _t.parent().parent().next();
            for(var i=0;i<data.length;i++){
                var str = '<div><i class="fa fa-fw  fa-columns"></i>'+data[i].name+'</div>';
                tbody.append(str);
            }
        },

        getTables:function(id){
            var _this = this;
            $.ajax({
                type: "get",
                url: "/venus/metadata/db/table/list",
                data: {
                    dbId:id
                },
                success: function (result) {
                    showloading(false);
                    if(result && result.success){
                        _this.setTableInfo(result.pairs.dat);
                    }else{
                        $.showModal({content:"查询失败"+result.message});
                    }
                },
                error:function(a,b,c){
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },

        setTableInfo:function(data){
            this._tables = data;
            var tables = $("#tables");
            tables.html("");
            for(var i=0;i<data.length;i++){
                var str = '<div class="box box-default collapsed-box">'
                    +'<div class="box-header with-border">'
                    +'<h3 class="box-title" title="'+data[i].name+'">'+data[i].name+'</h3>'
                    +'<div class="box-tools pull-right">'
                    +' <button class="btn btn-box-tool" data-widget="collapse" data-flag="false" data-id="'+data[i].id+'"><i class="fa plus fa-plus"></i></button>'
                    +'</div>'
                    +'</div>'
                    +'<div class="box-body" style="display: none;">'
                    +'</div>'
                    +'</div>';
                tables.append(str);
            }
        },

        getMarket:function(){
            var _this = this;
            $.ajax({
                type: "get",
                url: "/venus/market/list",
                data: {
                    name:"",
                    note:"",
                    pageNo:1,
                    pageSize:1000
                },
                success: function (result) {
                    showloading(false);
                    if(result && result.success){
                        var data = result.pairs.dat.results,cangku = $("#cangku");
                        for(var i=0;i<data.length;i++){
                            cangku.append('<option value="'+data[i].id+'">'+data[i].name+'</option>');
                        }
                    }else{
                        $.showModal({content:"查询失败"+result.message});
                    }
                },
                error:function(a,b,c){
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },

        getMarketKU:function(id){
            var _this = this;
            $.ajax({
                type: "get",
                url: "/venus/market/db/list",
                data: {
                    marketId:id
                },
                success: function (result) {
                    showloading(false);
                    if(result && result.success){
                        _this.setCangkuKU(result.pairs.dat);
                    }else{
                        $.showModal({content:"查询失败"+result.message});
                    }
                },
                error:function(a,b,c){
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },

        getCangkuKU: function () {
            var _this = this;
            $.ajax({
                type: "get",
                url: "/venus/metadata/db/inner/hives",
                data: {},
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        _this.setCangkuKU(result.pairs.innerHiveDBs);
                    } else {
                        $.showModal({content: "查询失败" + result.message});
                    }
                },
                error: function (a, b, c) {
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },

        setCangkuKU: function (data) {
            $("#kulist").val("");
            $("#kulist").html("");
            var kulist = $("#kulist");
            kulist.append('<option value="-100">-请选择-</option>');
            for (var i = 0; i < data.length; i++) {
                kulist.append('<option value="' + data[i].id + '">' + data[i].name + '</option>');
            }
        },

        setValueCursor:function(text){
            if(this.liveCursor){
                editor.replaceRange(text,this.liveCursor,this.liveCursor);
            }
        },

        insertText:function (obj,str) {
            if (document.selection) {
                var sel = document.selection.createRange();
                sel.text = str;
            } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
                var startPos = obj.selectionStart,
                    endPos = obj.selectionEnd,
                    cursorPos = startPos,
                    tmpStr = obj.value;
                obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
                cursorPos += str.length;
                obj.selectionStart = obj.selectionEnd = cursorPos;
            } else {
                obj.value += str;
            }
        }

    };
    sqlSearch.init();
});
