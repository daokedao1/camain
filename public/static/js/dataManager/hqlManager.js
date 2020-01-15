
/**
 * Created by user on 16/6/20.
 */
require(['jquery','codemirror','jquery.bootstrap','jquery.datetimepicker','common','quickSearch','app','jquery.ztree.core','sql','show-hint','sql-hint'],function($,CodeMirror){
    var hqlManager = {

        placeholder: "-- 由于我们的表文件类型较多，如果你要执行 Insert overwrite 或者 Insert into 语句，请根据目标表的文件类型，选择使用以下的参数\n"
                    +"-- .lzo文件类型\n"
        +"-- set mapred.output.compress=true;\n"
        +"-- set hive.exec.compress.output=true;\n"
        +"-- set mapred.output.compression.codec=com.hadoop.compression.lzo.LzopCodec;\n"
        +"-- .parquet文件类型\n"
        +"-- set mapred.output.compress=true;\n"
        +"-- set hive.exec.compress.output=true;\n"
        +"-- set mapred.output.compression.codec=org.apache.hadoop.hive.ql.io.parquet.MapredParquetOutputFormat\n\n\n\n\n",

        zTreeObj:null,

        newCount:1,

        init:function(){
            var _this = this;
            this.initEvent();
            this.getRootTree();
            this.getUser();

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
                readOnly:true,
                matchBrackets : true,
                extraKeys: {"Ctrl-Space": "autocomplete"}
            });
            editor.setValue(_this.placeholder);//暂时解决样式问题
            $('.fa-question-circle').tooltip({html : true });
            $('.fa-question-circle').tooltip("show");
            $('.fa-question-circle').tooltip("hide");//小bug 要不自己不会出来

        },

        initEvent:function(){
            var _this = this;

            $("#saveJiaoben").click(function(){
                if($(this).hasClass("butDisabled")){
                    return;
                }
                _this.saveJiaoben();
            });

            $("#showSqlTask").click(function(){
                if($(this).hasClass("butDisabled")){
                    return;
                }
                _this.showSqlTask();
            });

            $(".myuserUl").delegate("li a", "click", function () {
                $(".myuserUl li a").removeClass("active");
                $(this).addClass("active");
                var loginName = $(this).attr("data-loginName");
                var id = $(this).attr("data-id");
                if ($(".selectUsers").find("a[data-id=" + id + "]").length <= 0) {
                    $(".selectUsers").append('<a class="btn btn-app" data-id="' + id + '" data-loginName="' + loginName + '">'
                        + '<span class="badge bg-yellow"><i class="fa fa-fw fa-times"></i></span>'
                        + loginName
                        + '</a>');
                }
            });

            //添加联系人
            $("#addUserBut").click(function () {
                $("#userModal").modal("toggle");
            });

            $("#quickSearchName").keyup(function (e) {
                var e = e || window.event;
                var value = $(this).val();
                if (e.keyCode != 38 && e.keyCode != 40) {
                    _this.quickTimeOut = setTimeout(function () {
                        _this.getUser(value);
                    }, 500)
                }
            });
            $("#quickSearchName").keydown(function (e) {
                var e = e || window.event;
                clearTimeout(_this.quickTimeOut);
            });
            $("#addFuzeren").click(function () {
                var selectUsers = $(".selectUsers a");
                var userIds = [], userLoginNames = [];
                for (var i = 0; i < selectUsers.length; i++) {
                    userIds.push(selectUsers.eq(i).attr("data-id"));
                    userLoginNames.push(selectUsers.eq(i).attr("data-loginName"));
                }
                $("#userNames").val(userLoginNames.join(", ")).attr("data-id", userIds.join(","));
                $("#userModal").modal("hide");
            });

            $(".selectUsers").delegate('.badge', "click", function () {
                $(this).parent().remove();
            });


            $("#tShare").click(function(){
                $.showModal({
                    content:"确认将该节点共享吗?",
                    closeCallBack:null,
                    sureCallBack:function(){
                        var selectNode = _this.zTreeObj.getSelectedNodes();
                        var id = selectNode[0].treeId;
                        var type = selectNode[0].type;
                        _this.oprShare(id,1,type);
                    },
                    title:"提示信息",
                    closeName:"关闭",
                    sureName:"确定"
                });
            });

            $("#qShare").click(function(){
                $.showModal({
                    content:"确认取消将该节点的共享吗?",
                    closeCallBack:null,
                    sureCallBack:function(){
                        var selectNode = _this.zTreeObj.getSelectedNodes();
                        var id = selectNode[0].treeId;
                        var type = selectNode[0].type;
                        _this.oprShare(id,0,type);
                    },
                    title:"提示信息",
                    closeName:"关闭",
                    sureName:"确定"
                });
            });

            $("#addFileNode").click(function(){
                $("#addFileModal").modal("toggle");
            });

            $("#addHqlNode").click(function(){
                $("#addHqlModal").modal("toggle");
            });

            $("#saveFileNode").click(function(){
                var fileName = $("#fileName").val();
                if($.trim(fileName) == ""){
                    showTip("请输入文件夹名称.");
                    return;
                }
                _this.saveFileNode(fileName,true);
            });

            $("#saveHqlNode").click(function(){
                var HqlName = $("#HqlName").val();
                if($.trim(HqlName) == ""){
                    showTip("请输入脚本名称.");
                    return;
                }
                _this.saveFileNode(HqlName,false);
            });

            $("#modifyNode").click(function(){
                var selectNode = _this.zTreeObj.getSelectedNodes()[0];
                $("#modiName").val(selectNode.treeName);
                $("#modifyNameModal").modal("toggle");
            });

            $("#modifyNameNode").click(function(){
                var selectNode = _this.zTreeObj.getSelectedNodes()[0];
                var modiName = $("#modiName").val();
                if($.trim(modiName) == ""){
                    showTip("请输入名称.");
                    return;
                }
                _this.doUpdateNode(selectNode.treeId,modiName,selectNode.scriptId,selectNode.context);
            });

            $("#deleteNode").click(function(){
                var selectNode = _this.zTreeObj.getSelectedNodes()[0];
                if(confirm("确认删除 节点 -- " + selectNode.treeName + " 吗？")){
                    _this.deleteNode(selectNode.treeId,selectNode.getParentNode());
                };
            });

            $("#saveHqlTask").click(function(){
                _this.saveHqlTask();
            });

            $("#rMenu ul li").click(function(){
                $("#rMenu ul").hide();
            });
        },

        saveFileNode:function(treeName,isParent){
            $("#addFileModal").modal("hide");
            $("#addHqlModal").modal("hide");

            var selectNode = this.zTreeObj.getSelectedNodes()[0];
            this.doSaveFileNode(selectNode.treeId,treeName,isParent,'');
        },

        doUpdateNode:function(treeId,treeName,scriptId,context){
            $("#modifyNameModal").modal("hide");
            var _this = this;
            showloading(true);
            $.ajax({
                type: "post",
                url: "/venus/transform/scriptTree/updateScriptTree",
                data: {
                    treeId:treeId,
                    treeName:treeName,
                    scriptId:scriptId,
                    context:context
                },
                success: function (result) {
                    showloading(false);
                    if(result && result.success){
                        showTip("修改成功");
                        var selectNode = _this.zTreeObj.getSelectedNodes()[0];
                        _this.zTreeObj.reAsyncChildNodes(selectNode.getParentNode(), "refresh");
                    }else{
                        $.showModal({content: result.message});
                    }
                },
                error:function(a,b,c){
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },

        doSaveFileNode:function(pid,treeName,isParent,context){
            var _this = this;
            showloading(true);
            $.ajax({
                type: "post",
                url: "/venus/transform/scriptTree/saveScriptTree",
                data: {
                    parentId:pid,
                    treeName:treeName,
                    type:isParent?0:1,
                    context:context
                },
                success: function (result) {
                    showloading(false);
                    if(result && result.success){
                        showTip("新增成功");
                        var selectNode = _this.zTreeObj.getSelectedNodes()[0];
                        _this.zTreeObj.reAsyncChildNodes(selectNode, "refresh");
                    }else{
                        $.showModal({content:result.message});
                    }
                },
                error:function(a,b,c){
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },

        saveHqlTask:function(){
            var _this = this;
            var verifyFlag = verifyEmpty(
                [
                    {name:"name",label:"任务名称"},
                    {name:"userNames",label:"负责人"},
                    {name:"hql",label:"hql脚本内容"},
                    {name:"desc",label:"描述"}
                ]
            );

            var selectNode = this.zTreeObj.getSelectedNodes()[0];

            if(verifyFlag) {
                var script ={
                    name:$("#name").val(),
                    administrator:$("#userNames").val(),
                    context:$("#hql").val(),
                    describe:$("#desc").val(),
                    treeId:selectNode.treeId,
                };
                showloading(true);
                $.ajax({
                    type: "post",
                    url: "/venus/transform/script/saveScript",
                    dataType: "json",
                    contentType: 'application/json',
                    data: JSON.stringify(script),
                    success: function (result) {
                        showloading(false);
                        if(result && result.success){
                            location.href = "hqlTaskList.html";
                        }else{
                            $.showModal({content:result.message});
                        }
                    },
                    error:function(a,b,c){
                        showloading(false);
                        alert(a.responseText);
                    }
                });
            }
        },

        oprShare:function(id,share,type){
            var _this = this;
            showloading(true);
            $.ajax({
                type: "post",
                url: "/venus/transform/scriptTree/setShare",
                data: {
                    treeId:id,
                    share:share,
                    type:type
                },
                success: function (result) {
                    showloading(false);
                    if(result && result.success){
                        _this.getRootTree();

                    }else{
                        $.showModal({content:result.message});
                    }
                },
                error:function(a,b,c){
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },

        showSqlTask:function(){
            var _this = this;
            var selectNode = _this.zTreeObj.getSelectedNodes();
            if(selectNode.length <= 0){
                showTip("请在左侧树中选中一个脚本");
                return;
            }

            if($.trim(editor.getValue()) == ""){
                showTip("请先给该脚本配置sql");
                return;
            }

            if(selectNode[0].context == ""){
                showTip("请先保存脚本,再点击生成sql任务.");
                return;
            }

            $("#hql").val(editor.getValue());
            $("#taskInfoMadel").modal("toggle");
        },

        saveJiaoben:function(){
            var _this = this;

            var selectNode = _this.zTreeObj.getSelectedNodes()[0];
            var sql = editor.getValue();
            if($.trim(sql) == ""){
                showTip("请填写sql");
                return;
            }
            _this.doUpdateNode(selectNode.treeId,selectNode.treeName,selectNode.scriptId,sql);
        },

        getRootTree:function(){
            var _this = this;
            showloading(true);
            $.ajax({
                type: "post",
                url: "/venus/transform/scriptTree/queryRootNode",
                data: {
                },
                success: function (result) {
                    showloading(false);
                    if(result && result.success){
                        var scriptTree = result.pairs.roots;
                        _this.initTree(scriptTree);
                    }else{
                        $.showModal({content:result.message});
                    }
                },
                error:function(a,b,c){
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },

        initTree:function(scriptTree){
            var self = scriptTree[0],share = scriptTree[1];
            self.isParent = true,self.isShare = 0,share.isParent = true,share.isShare = true;
            for(var i=0;i<share.children.length;i++){
                share.children[i].isParent = true;
                share.children[i].isShare = 1;
            }
            var _this = this;
            var setting = {
                async: {
                    enable: true,
                    url: "/venus/transform/scriptTree/queryScriptTree",
                    autoParam: ["treeId","isShare=share"],
                    type: "post",
                    dataFilter:this.dataFilter
                },
                view: {
                    expandSpeed:"",
                    addHoverDom: addHoverDom,
                    removeHoverDom: removeHoverDom,
                    selectedMulti: false
                },
                data: {
                    simpleData: {
                        enable: true
                    },
                    key:{
                        name:"treeName"
                    }
                },
                callback: {
                    onRightClick: onRightClick,
                    beforeRemove: beforeRemove,
                    beforeRename: beforeRename,
                    onRename:zTreeOnRename,
                    beforeClick:beforeClick,
                    onClick: zTreeOnClick,
                    onAsyncSuccess: zTreeOnAsyncSuccess,
                    onRemove:onRemove
                }


            };
            this.zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, [self,share]);

            function beforeClick(treeId, treeNode, clickFlag){
                //if(treeNode.type == 0){
                //    return false;
                //}
                return true;
            }
            function zTreeOnClick(event, treeId, treeNode){
                if(treeNode.isShare == 1){
                    $("#showSqlTask").addClass("butDisabled");
                    $("#saveJiaoben").addClass("butDisabled");
                    editor.setOption("readOnly",true);
                    editor.setValue(treeNode.context);
                    return false;
                }
                if(treeNode.isParent == true){
                    $("#showSqlTask").addClass("butDisabled");
                    $("#saveJiaoben").addClass("butDisabled");
                    editor.setOption("readOnly",true);
                    editor.setValue(_this.placeholder);
                    return false;
                }
                if(treeNode.treeId){
                    if(treeNode.scriptId == -100){
                        $("#showSqlTask").removeClass("butDisabled");
                    }else{
                        $("#showSqlTask").addClass("butDisabled");
                    }
                    if(treeNode.status == 1){
                        $("#saveJiaoben").addClass("butDisabled");
                    }else{
                        $("#saveJiaoben").removeClass("butDisabled");
                    }
                    editor.setValue(treeNode.context==""?_this.placeholder:treeNode.context);
                    editor.setOption("readOnly",false);
                    return true;
                }else{
                    $("#showSqlTask").addClass("butDisabled");
                    $("#saveJiaoben").addClass("butDisabled");
                    editor.setValue(_this.placeholder);
                    return false;
                }
            }

            function zTreeOnAsyncSuccess(event, treeId, treeNode, msg){
                $("#showSqlTask").addClass("butDisabled");
                $("#saveJiaoben").addClass("butDisabled");
                editor.setValue(_this.placeholder);
                var childs = treeNode.children;
                for(var i=0;i<childs.length;i++){
                    if(childs[i].scriptId != -100){
                        $("#"+childs[i].tId).find("a").addClass("scriptId");
                    }
                }
            }

            function showRemoveBtn(treeId, treeNode) {
                if(treeNode.level==0 || (treeNode.children && treeNode.children.length>0) || treeNode.status || treeNode.isShare == 1 || treeNode.isShare){
                    return false;
                }
                return true;
            }

            function showRenameBtn(treeId, treeNode) {
                if(treeNode.level==0  || treeNode.isShare == 1 || treeNode.isShare){
                    return false;
                }
                return true;
            }

            function beforeRemove(treeId, treeNode) {
                //_this.renameNode(treeNode);
                var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                zTree.selectNode(treeNode);
                if(!treeNode.treeId){
                    return true;
                }
                if(confirm("确认删除 节点 -- " + treeNode.treeName + " 吗？")){
                    _this.deleteNode(treeNode.treeId,treeNode.getParentNode());
                    return false;
                };
            }
            function onRemove(event, treeId, treeNode){
                //_this.zTreeObj.reAsyncChildNodes(treeNode.getParentNode(), "refresh");
            }
            function beforeRename(treeId, treeNode, newName) {
                if (newName.length == 0 || $.trim(newName) == "") {
                    alert("节点名称不能为空.");
                    return false;
                }
                return true;
            }
            function zTreeOnRename(event, treeId, treeNode, isCancel) {
                _this.renameNode(treeNode);
            }

            function addHoverDom(treeId, treeNode) {
                if(!treeNode.isParent || !treeNode.treeId  || treeNode.isShare == 1 || treeNode.isShare){
                    return;
                }
                var sObj = $("#" + treeNode.tId + "_span");
                if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
                var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
                    + "' title='add node' onfocus='this.blur();'></span>";
                sObj.after(addStr);
                var btn = $("#addBtn_"+treeNode.tId);
                if (btn) btn.bind("click", function(){
                    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                    //if(treeNode.children && treeNode.children.length>0){
                    //    var type = treeNode.children[0].isParent;
                    //    zTree.addNodes(treeNode, {id:(100 + _this.newCount), isParent:type, pId:treeNode.id, treeName:"new node" + (_this.newCount++)});
                    //}else{
                    $.showModal({
                        content:"请选择建文件夹还是脚本?",
                        closeCallBack:function(){
                            zTree.addNodes(treeNode, {id:(100 + _this.newCount), pId:treeNode.id, isParent:true, treeName:"请先命名" + (_this.newCount++)});
                        },
                        sureCallBack:function(){
                            zTree.addNodes(treeNode, {id:(100 + _this.newCount), pId:treeNode.id, treeName:"请先命名" + (_this.newCount++)});
                        },
                        title:"提示信息",
                        closeName:"建文件夹",
                        sureName:"建脚本"
                    });
                    //}
                    return false;
                });
            }
            function removeHoverDom(treeId, treeNode) {
                $("#addBtn_"+treeNode.tId).unbind().remove();
            }

            function onRightClick(event, treeId, treeNode){
                var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                zTree.selectNode(treeNode);
                if(!treeNode.isShare && treeNode.isShare != 0 ) return;
                if(treeNode.parentId == -100){
                    $("#tShare").hide();
                    $("#qShare").hide();
                    $("#modifyNode").hide();
                    $("#deleteNode").hide();
                    showRMenu(event.clientX, event.clientY);
                }else{
                    $("#tShare").show();
                    $("#qShare").show();
                    $("#modifyNode").show();
                    $("#deleteNode").show();
                }
                if (treeNode.isShare == 0 && treeNode.parentId != -100) {
                    if(treeNode.share == 1){
                        $("#qShare").show();
                        $("#tShare").hide();
                    }else{
                        $("#qShare").hide();
                        $("#tShare").show();
                    }
                    if(treeNode.isParent == true){
                        $("#addFileNode").show();
                        $("#addHqlNode").show();
                    }else{
                        $("#addFileNode").hide();
                        $("#addHqlNode").hide();
                    }
                    showRMenu(event.clientX, event.clientY);
                }

            }
            function showRMenu(x, y) {
                $("#rMenu ul").show();
                $("#rMenu").css({"top":y+"px", "left":x+"px", "visibility":"visible"});
                $("body").bind("mousedown", onBodyMouseDown);
            }

            function onBodyMouseDown(event){
                if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length>0)) {
                    $("#rMenu").css({"visibility" : "hidden"});
                }
            }

        },

        dataFilter:function(treeId, parentNode, childNodes){
            var scriptTrees = childNodes.pairs.scriptTrees;
            for(var i=0;i<scriptTrees.length;i++){
                if(scriptTrees[i].type == 0){
                    scriptTrees[i].isParent = true;
                }else{
                    scriptTrees[i].isParent = false;
                }
                scriptTrees[i].isShare = parentNode.isShare;
            }
            return scriptTrees;
        },
        deleteNode:function(treeId,parentNode){
            var _this = this;
            showloading(true);
            $.ajax({
                type: "post",
                url: "/venus/transform/scriptTree/deleteScriptTree",
                data: {
                    treeId:treeId
                },
                success: function (result) {
                    showloading(false);
                    if(result && result.success){
                        showTip("删除成功.");
                        _this.zTreeObj.reAsyncChildNodes(parentNode, "refresh");
                    }else{
                        $.showModal({content:result.message});
                    }
                },
                error:function(a,b,c){
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },
        renameNode:function(treeNode,context){

        },

        getUser: function (loginName) {
            var _this = this;
            showloading(true);
            $.ajax({
                type: "get",
                url: "/venus/users/search",
                global: false,
                data: {
                    loginName: $.trim(loginName)
                },
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        _this.setUserDig(result.pairs.dat);
                    } else {
                        $.showModal({conent: result.message});
                    }
                },
                error: function (a, b, c) {
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },

        setUserDig: function (dat) {
            $(".myuserUl").empty();
            for (var i = 0; i < dat.length; i++) {
                $(".myuserUl").append('<li><a data-id="' + dat[i].id + '" data-loginName="' + dat[i].loginName + '" data-realName="' + dat[i].realName + '" href="javascript:void(0);">' + dat[i].realName + '  ' + dat[i].mail + ' ' + dat[i].groupName + '</a></li>');
            }
        }
    }
    hqlManager.init();
});
