/**
 * Created by user on 16/6/24.
 */
/**
 * Created by user on 16/6/20.
 */
require(['jquery', 'jquery.bootstrap', 'jquery.datetimepicker', 'common', 'quickSearch', 'app','jquery.ztree.core','jquery.ztree.excheck'], function ($) {
    var menuManager = {

        id:null,

        role:null,

        init: function () {
            this.initEvent();
            this.id = $.getQueryString('id');
            this.setTree();
        },

        initEvent: function () {
            var _this = this;

            $('#save').click(function(){
                _this.modifyMenu();
            });
            $('#delete').click(function(){
                _this.deleteMenu();
            });

            $('#addChild').click(function(){
                var treeObj = $.fn.zTree.getZTreeObj('treeDemo');
                var nodes = treeObj.getSelectedNodes();
                if(nodes.length<=0){
                    showTip('请选择一个菜单.');
                    return;
                }
                $('#menuAddDialog').modal('toggle');
            });

            $('#sureAdd').click(function(){
                _this.addMenu();
            });
        },

        addMenu:function(){
            var treeObj = $.fn.zTree.getZTreeObj('treeDemo');
            var nodes = treeObj.getSelectedNodes();

            if($.trim($('#mname').val()) == ''){
                showTip('请填写菜单名称.');
                return;
            }
            var menu = {
                parentId:nodes[0].id,
                name:$('#mname').val(),
                url:$('#murl').val()
            };

            showloading(true);
            $.ajax({
                type: 'post',
                url: '/venus/menu/saveMenu',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(menu),
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        if(menu.parentId == -100){
                            location.reload();
                        }else{
                            treeObj.reAsyncChildNodes(treeObj.getNodeByParam('id', nodes[0].parentId, null), 'refresh');
                        }
                        $('#createTime').html('');
                        $('#timestamp').html('');
                        $('#menuName').val('');
                        $('#url').val('');
                        $('#menuAddDialog').modal('hide');
                    } else {
                        $.showModal({content: '保存失败: '+result.message});
                    }
                },
                error: function (a, b, c) {
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },

        modifyMenu:function(){
            var treeObj = $.fn.zTree.getZTreeObj('treeDemo');
            var nodes = treeObj.getSelectedNodes();
            if(nodes[0].id == -100){
                showTip('根节点不能修改.');
                return;
            }
            if(nodes.length<=0){
                showTip('请选择一个菜单.');
                return;
            }
            if($.trim($('#menuName').val()) == ''){
                showTip('请填写菜单名称.');
                return;
            }
            var menu = {
                id:nodes[0].id,
                parentId:nodes[0].parentId,
                name:$('#menuName').val(),
                url:$('#url').val()
            };

            showloading(true);
            $.ajax({
                type: 'post',
                url: '/venus/menu/updateMenu',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(menu),
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        treeObj.reAsyncChildNodes(treeObj.getNodeByParam('id', nodes[0].parentId, null), 'refresh');
                        $('#createTime').html('');
                        $('#timestamp').html('');
                        $('#menuName').val('');
                        $('#url').val('');
                    } else {
                        $.showModal({content: '保存失败: '+result.message});
                    }
                },
                error: function (a, b, c) {
                    showloading(false);
                    alert(a.responseText);
                }
            });

        },

        deleteMenu:function(){
            var treeObj = $.fn.zTree.getZTreeObj('treeDemo');
            var nodes = treeObj.getSelectedNodes();
            if(nodes.length<=0){
                showTip('请选择一个菜单.');
                return;
            }
            if(confirm('菜单删除无法恢复,请确认.')){
                var {id} = nodes[0],{parentId} = nodes[0];

                showloading(true);
                $.ajax({
                    type: 'post',
                    url: '/venus/menu/deleteMenu',
                    data: {
                        id:id
                    },
                    success: function (result) {
                        showloading(false);
                        if (result && result.success) {
                            treeObj.reAsyncChildNodes(treeObj.getNodeByParam('id', parentId, null), 'refresh');
                            $('#createTime').html('');
                            $('#timestamp').html('');
                            $('#menuName').val('');
                            $('#url').val('');
                        } else {
                            $.showModal({content: '保存失败: '+result.message});
                        }
                    },
                    error: function (a, b, c) {
                        showloading(false);
                        alert(a.responseText);
                    }
                });
            }
        },


        setTree:function(init){
            var _this = this;
            var setting = {
                async: {
                    enable: true,
                    url: '/venus/menu/listMenu',
                    autoParam: ['id'],
                    type: 'post',
                    dataFilter:_this.dataFilter
                },
                callback: {
                    onClick: zTreeOnClick,
                    beforeAsync: beforeAsync,
                    onAsyncSuccess: onAsyncSuccess,
                    onAsyncError: onAsyncError
                },

                data: {
                    simpleData: {
                        enable: true,
                        pIdKey:'parentId'
                    },
                    key:{
                        url:''
                    }
                }
            };
            if(init){
                $.fn.zTree.init($('#treeDemo'), setting);
            }

            var zNodes =[
                { id:-100,  name:'菜单列表',isParent:true, open:true}
            ];

            $.fn.zTree.init($('#treeDemo'), setting, zNodes);

            if(_this.role != null){
                var treeObj = $.fn.zTree.getZTreeObj('treeDemo');
                treeObj.checkNode(treeObj.getNodesByParam('id','-100',null)[0], true, false);
            }
            expandAll();
            var curAsyncCount = 0, asyncForAll = false,
                goAsync = false;
            function expandAll() {
                if (!check()) {
                    return;
                }
                var zTree = $.fn.zTree.getZTreeObj('treeDemo');
                if (asyncForAll) {
                    zTree.expandAll(true);
                } else {
                    expandNodes(zTree.getNodes());
                }
            }
            function expandNodes(nodes) {
                if (!nodes) return;
                var zTree = $.fn.zTree.getZTreeObj('treeDemo');
                for (var i=0, l=nodes.length; i<l; i++) {
                    zTree.expandNode(nodes[i], true, false, false);
                    if (nodes[i].isParent) {
                        expandNodes(nodes[i].children);
                    } else {
                        goAsync = true;
                    }
                }
            }
            function beforeAsync() {
                curAsyncCount++;
            }

            function onAsyncSuccess(event, treeId, treeNode, msg) {
                curAsyncCount--;
                expandNodes(treeNode.children);
                if (curAsyncCount <= 0) {
                    asyncForAll = true;
                }
            }

            function onAsyncError(event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) {
                curAsyncCount--;

                if (curAsyncCount <= 0) {
                    if (treeNode!=null) asyncForAll = true;
                }
            }

            function check() {
                if (curAsyncCount > 0) {
                    return false;
                }
                return true;
            }

            function zTreeOnClick(event, treeId, treeNode){
                if(treeNode.id != '-100'){
                    $('#createTime').html((new Date(treeNode.createTime)).Format('yyyy-MM-dd hh:mm:ss') );
                    $('#timestamp').html((new Date(treeNode.timestamp)).Format('yyyy-MM-dd hh:mm:ss'));
                    $('#menuName').removeAttr('disabled');
                }else{
                    $('#menuName').attr('disabled','disabled');
                }
                $('#menuName').val(treeNode.name);
                $('#url').val(treeNode.url);


            }
        },

        dataFilter:function(treeId, parentNode, dat){
            var scriptTrees = dat.pairs.menus;
            for(var i=0; i<scriptTrees.length; i++){
                if(scriptTrees[i].leaf == 0){
                    scriptTrees[i].isParent = true;
                }else{
                    scriptTrees[i].isParent = false;
                }
            }
            return scriptTrees;
        }
    };
    menuManager.init();
});
