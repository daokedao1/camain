/**
 * Created by user on 16/6/20.
 */
require(['jquery','jquery.bootstrap','jquery.datetimepicker','common','quickSearch','app'],function($){
    var hiveTableConsanguinity = {

        hdb:"",

        tableId:"",

        tableName:"",

        _jm:null,

        tables:[],

        _index:0,

        init:function(){
            this.initEvent();
            this.tableId = $.getQueryString("tableId");
            this.getJsmindInfo(this.tableId);
        },

        initEvent:function(){
            var _this = this;

        },

        getJsmindInfo:function(id,uuid){
            var _this = this;
            showloading(true);
            $.ajax({
                type: "get",
                url: "/venus/metadata/consanguinity/table",
                data: {
                    tableId: id
                },
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        var dat = result.pairs.dat;
                        if(uuid){
                            _this.addNodeToJsmind(dat,uuid);
                        }else{
                            _this.initJsmind(dat);
                        }
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

        initJsmind:function(dat){
            var _this = this;
            var options = {
                container:'jsmind_container',
                theme:'clouds',
                editable:false
            };
            var mind = {
                "meta":{
                    "name":"jsMind venus",
                    "author":"zebing.wu",
                    "version":"0.1"
                },
                "format":"node_tree",
                "data":{
                    "id": "root",
                    "topic": "当前节点",
                    "background-color": "#ffec00",
                    "font-size":"10px",
                    "children": [
                    ]
                }
            };
            mind.data.topic = dat.tableName;
            mind.data.id = dat.tableId;
            var downstreamTasks = dat.downstreamTasks,upstreamTasks=dat.upstreamTasks;
            for(var u=0;u<upstreamTasks.length;u++){
                var up = upstreamTasks[u],uobj={},uchildren=up.upstreamTables;
                //uobj.id=up.taskId;
                uobj.id=this._index + "u"+u;
                uobj.topic=up.taskName;
                uobj.direction="left";
                uobj["background-color"]="#fff";
                uobj.children = [];
                for(var uu=0;uu<uchildren.length;uu++){
                    this.tables[this._index +"u"+u+"uu"+uu] = uchildren[uu];
                    this.tables[this._index +"u"+u+"uu"+uu].isUp = true;
                    uobj.children.push({
                        "id": this._index + "u"+u+"uu"+uu,
                        "topic":  uchildren[uu].tableName,
                        "dbName":  uchildren[uu].dbName,
                        "background-color": "#ffec00",
                        "font-size":"10px"
                    });
                }
                mind.data.children.push(uobj);

            }
            for(var u=0;u<downstreamTasks.length;u++){
                var down = downstreamTasks[u],uobj={},uchildren=down.downstreamTables;
                //uobj.id=down.taskId;
                uobj.id=this._index + "d"+u;
                uobj.topic=down.taskName;
                uobj.direction="right";
                uobj["background-color"]="#fff";
                uobj.children = [];
                for(var uu=0;uu<uchildren.length;uu++){
                    this.tables[this._index +"d"+u+"duu"+uu] = uchildren[uu];
                    this.tables[this._index +"d"+u+"duu"+uu].isUp = false;
                    uobj.children.push({
                        "id": this._index + "d"+u+"duu"+uu,
                        "topic":  uchildren[uu].tableName,
                        "dbName":  uchildren[uu].dbName,
                        "background-color": "#ffec00",
                        "font-size":"10px"
                    });
                }
                mind.data.children.push(uobj);
            }

            this._jm = jsMind.show(options,mind);
        },

        addNodeToJsmind:function(dat,uuid){
            this._index = this._index + 1;
            var downstreamTasks = dat.downstreamTasks,upstreamTasks=dat.upstreamTasks;
            if(uuid.indexOf("duu")>-1){//点击的是下游的表
                for(var u=0;u<downstreamTasks.length;u++){
                    this._jm.select_node(uuid);
                    var selected_node = this._jm.get_selected_node();
                    var up = downstreamTasks[u],uobj={},uchildren=up.downstreamTables;
                    uobj.direction="right";
                    uobj["background-color"]="#fff";
                    var taskNode = this._jm.add_node(selected_node, this._index + "u"+u, up.taskName, uobj);
                    for(var uu=0;uu<uchildren.length;uu++){
                        this.tables[this._index +"u"+u+"duu"+uu] = uchildren[uu];
                        this.tables[this._index +"u"+u+"duu"+uu].isUp = true;

                        this._jm.add_node(taskNode, this._index +"u"+u+"duu"+uu, uchildren[uu].tableName, {
                            "background-color": "#ffec00"
                        });
                    }
                }
            }else{                     //点击的是上游的表
                for(var u=0;u<upstreamTasks.length;u++){
                    this._jm.select_node(uuid);
                    var selected_node = this._jm.get_selected_node();
                    var up = upstreamTasks[u],uobj={},uchildren=up.upstreamTables;
                    uobj.direction="left";
                    uobj["background-color"]="#fff";
                    var taskNode = this._jm.add_node(selected_node, this._index + "u"+u, up.taskName, uobj);
                    for(var uu=0;uu<uchildren.length;uu++){
                        this.tables[this._index +"u"+u+"uu"+uu] = uchildren[uu];
                        this.tables[this._index +"u"+u+"uu"+uu].isUp = true;

                        this._jm.add_node(taskNode, this._index +"u"+u+"uu"+uu, uchildren[uu].tableName, {
                            "background-color": "#ffec00"
                        });
                    }
                }
            }
        },

        showDBName:function(id){
            var table = this.tables[id];
            if(table){
                $(".dbnameInfo").slideUp(500,function(){
                    $(".dbnameInfo").html("该表所在库是:"+table.dbName);
                    $(".dbnameInfo").slideDown();
                });

                if(table.tableType && table.tableType == "hive" && !this.tables[id].isAjaxed){
                    this.tables[id].isAjaxed = true;
                    this.getJsmindInfo(table.tableId,id);
                }

            }else{
                $(".dbnameInfo").slideUp();
            }
        }

    };
    hiveTableConsanguinity.init();
    jsMind.hiveTableConsanguinity = hiveTableConsanguinity;
});
