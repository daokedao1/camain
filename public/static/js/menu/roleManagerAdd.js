/**
 * Created by user on 16/6/24.
 */
/**
 * Created by user on 16/6/20.
 */
var roleManagerAdd = {

    id: null,

    role: null,

    init: function () {
        this.initEvent();
        this.id = $.getQueryString("id");
        if (this.id != null) {
            this.getRoleInfo();
        } else {
            this.setTree();
        }
    },

    initEvent: function () {
        var _this = this;

        $("#addRole").click(function () {
            _this.addRole();
        });
    },

    addRole: function () {
        var name = $("#name").val();
        if ($.trim(name) == '') {
            showTip("角色名称不能为空.")
            return;
        }
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        var checkedNodes = zTree.getCheckedNodes(), roleResources = [];
        if (checkedNodes.length <= 0) {
            showTip("请至少选择一个菜单.")
            return;
        }
        for (var i = 0; i < checkedNodes.length; i++) {
            if (checkedNodes[i].id != -100) {
                var menu = {
                    resourceId: checkedNodes[i].id,
                    resourceType: "web"
                };
                roleResources.push(menu);
            }
        }
        var url = "/venus/auth/role/saveRole", data = {};
        data.name = name;
        data.roleResources = roleResources;
        data.dataResource = JSON.stringify($("#dataResourceSelectId").val());
        data.cityResource = JSON.stringify($("#cityResourceSelectId").val());
        data.teamResource = JSON.stringify($("#teamResourceSelectId").val());
        data.deptResource = JSON.stringify($("#deptResourceSelectId").val());


        if (this.id != null) {
            data.id = this.id;
            url = "/venus/auth/role/updateRole";
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
                    location.href = "roleManagerList.html";
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

    getRoleInfo: function () {
        var _this = this;
        showloading(true);
        $.ajax({
            type: "post",
            url: "/venus/auth/role/getRole",
            data: {
                id: _this.id
            },
            success: function (result) {
                showloading(false);
                if (result && result.success) {
                    var role = result.pairs.role;
                    $("#name").val(role.name);
                    if (role.dataResource != null && role.dataResource !== '') {
                        $("#dataResourceSelectId").selectpicker("val", JSON.parse(role.dataResource));
                    }
                    if (role.cityResource != null && role.cityResource !== '') {
                        $("#cityResourceSelectId").selectpicker("val", JSON.parse(role.cityResource));
                    }
                    if (role.teamResource != null && role.teamResource !== '') {
                        $("#teamResourceSelectId").selectpicker("val", JSON.parse(role.teamResource));
                    }
                    if (role.deptResource != null && role.deptResource !== '') {
                        $("#deptResourceSelectId").selectpicker("val", JSON.parse(role.deptResource));
                    }


                    $("#getRoleInfo").val
                    _this.role = role;
                    _this.setTree();
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

    setTree: function () {
        var _this = this;
        var setting = {
            async: {
                enable: true,
                url: "/venus/menu/listMenu",
                autoParam: ["id"],
                type: "post",
                dataFilter: _this.dataFilter
            },
            callback: {
                onClick: zTreeOnClick,
                beforeAsync: beforeAsync,
                onAsyncSuccess: onAsyncSuccess,
                onAsyncError: onAsyncError
            },
            check: {
                enable: true,
                chkboxType: {"Y": "ps", "N": "ps"}
            },
            data: {
                simpleData: {
                    enable: true,
                    pIdKey: "parentId"
                },
                key: {
                    url: ""
                }
            }
        };

        var zNodes = [
            {id: -100, name: "菜单列表", isParent: true, open: true}
        ];

        $.fn.zTree.init($("#treeDemo"), setting, zNodes);

        if (_this.role != null) {
            var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
            treeObj.checkNode(treeObj.getNodesByParam("id", "-100", null)[0], true, false);
        }
        expandAll();
        var curAsyncCount = 0, asyncForAll = false,
            goAsync = false;

        function expandAll() {
            if (!check()) {
                return;
            }
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            if (asyncForAll) {
                zTree.expandAll(true);
            } else {
                expandNodes(zTree.getNodes());
            }
        }

        function expandNodes(nodes) {
            if (!nodes) return;
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            for (var i = 0, l = nodes.length; i < l; i++) {
                zTree.expandNode(nodes[i], true, false, false);
                if (nodes[i].isParent) {
                    expandNodes(nodes[i].children);
                } else {
                    goAsync = true;
                }
                if (_this.role != null && isInRoles(nodes[i])) {
                    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                    treeObj.checkNode(nodes[i], true, false);
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
            if (_this.role != null && isInRoles(treeNode)) {
                var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                treeObj.checkNode(treeNode, true, false);
            }
        }

        function onAsyncError(event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) {
            curAsyncCount--;

            if (curAsyncCount <= 0) {
                if (treeNode != null) asyncForAll = true;
            }
        }

        function isInRoles(treeNode) {
            var menus = _this.role.menus;
            for (var i = 0; i < menus.length; i++) {
                if (menus[i].id == treeNode.id) {
                    return true;
                }
            }
            return false;
        }

        function check() {
            if (curAsyncCount > 0) {
                return false;
            }
            return true;
        }

        function zTreeOnClick(event, treeId, treeNode) {
            $("#menuName").html(treeNode.name);
            $("#url").html(treeNode.url);
            $("#createTime").html((new Date(treeNode.createTime)).Format("yyyy-MM-dd hh:mm:ss"));
            $("#timestamp").html((new Date(treeNode.timestamp)).Format("yyyy-MM-dd hh:mm:ss"));

        }
    },

    dataFilter: function (treeId, parentNode, dat) {
        var scriptTrees = dat.pairs.menus;
        for (var i = 0; i < scriptTrees.length; i++) {
            if (scriptTrees[i].leaf == 0) {
                scriptTrees[i].isParent = true;
            } else {
                scriptTrees[i].isParent = false;
            }
        }
        return scriptTrees;
    }
};
roleManagerAdd.init();
