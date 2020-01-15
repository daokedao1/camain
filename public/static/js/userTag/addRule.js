/**
 * Created by user on 16/6/20.
 */
require(['jquery','jquery.bootstrap','jquery.datetimepicker','common','quickSearch','app'],function($,d3){
    var addRule = {

        _EXPR: "CG",

        _LABELEXPR:"C",

        selectMeijuInput:null,

        quickTimeOut:null,

        operweiduTagValues:[],

        _moveElm:null,

        move:false,

        _ableMove:"",

        toDraggableDiv:null,

        formDraggableDiv:null,

        id:null,

        obj:null,

        init:function(){
            this.initEvent();

            this.id = $.getQueryString("id");
            if(this.id != null){
                this.getInfo();
            }else{
                this.getTagList();
            }

            $('.fa-question-circle').tooltip({html : true });
            $('.fa-question-circle').tooltip("show");
            $('.fa-question-circle').tooltip("hide");//小bug 要不自己不会出来
        },

        initEvent:function() {
            var _this = this;

            $(".labelGroups").delegate("li a","click",function(){
                var li = $(this).parent();
                if(li.hasClass("active")){
                    return;
                }
                li.addClass("active");
                _this.addTypeList(li);
            });
            $(".labelGroups").delegate("li a i","click",function(e){
                var lii = $(this).parent().parent();
                lii.removeClass("active");
                _this.removeTypeList(lii);
                e.stopPropagation();
                e.preventDefault();
            });

            $(".more").click(function(){
                if($(this).find("i").hasClass("fa-plus")){
                    $(this).siblings(".tagValues").addClass("jielue");
                    $(this).find(".fa-fw").removeClass("fa-plus").addClass("fa-minus");
                }else{
                    $(this).siblings(".tagValues").removeClass("jielue");
                    $(this).find(".fa-fw").removeClass("fa-minus").addClass("fa-plus");
                }
            });

            $(".luojiDiv .fa-times").click(function(){
                var a = $(this).parent();
                a.fadeOut(300,function(){
                    a.remove();
                })
            });

            $(".luojiDiv .cont").delegate("a","click",function(){
                if($(this).hasClass("active")){
                    $(this).removeClass("active");
                }else{
                    $(this).addClass("active");
                }
            });

            $("input:radio[name=uuid]").click(function(){
                _this.getTagList();
            });

            //$(".opreFas .fa-arrow-circle-right").click(function(){
            //    var actives = $("#jiaojiElm a.active");
            //    $("#bingjiElm").append(actives);
            //});
            //$(".opreFas .fa-arrow-circle-left").click(function(){
            //    var actives = $("#bingjiElm a.active");
            //    $("#jiaojiElm").append(actives);
            //});

            //枚举值选择处理
            $("#weiduTable").delegate(".meijuValues","click",function(){
                _this.selectMeijuInput = $(this);
                var values = $(this).val().split(","),id = $(this).attr("data-id");
                $(".selectUsers").html("");
                if(values != ""){
                    for(var i=0;i<values.length;i++){
                        $(".selectUsers").append('<a class="btn btn-app" data-value="'+$.trim(values[i])+'">'
                            +'<span class="badge bg-yellow"><i class="fa fa-fw fa-times"></i></span>'
                            +values[i]
                            +'</a>');
                    }
                }
                _this.getValuesByTagId(id);
            });

            $(".selectUsers").delegate('.badge', "click", function () {
                $(this).parent().remove();
            });

            $(".myuserUl").delegate("li",'click',function(){
                var value = $(this).attr("data-value");
                if ($(".selectUsers").find("a[data-value='" + value + "']").length <= 0) {
                    $(".selectUsers").append('<a class="btn btn-app" data-value="' + value + '">'
                        + '<span class="badge bg-yellow"><i class="fa fa-fw fa-times"></i></span>'
                        + value
                        + '</a>');
                }
            });
            $("#quickSearchValue").keyup(function (e) {
                var e = e || window.event;
                var value = $(this).val();
                if (e.keyCode != 38 && e.keyCode != 40) {
                    _this.quickTimeOut = setTimeout(function () {
                        _this.quickSearchValues(value);
                    }, 500)
                }
            });
            $("#quickSearchValue").keydown(function (e) {
                clearTimeout(_this.quickTimeOut);
            });

            $("#addMeijuValue").click(function(){
                _this.setWeiduInput();
            });

            $("#jingtaitable,#dongtaizhibiao").delegate(".guanxiselect select","change",function(){
                var value = $(this).val();
                if(value == "between"){
                    $(this).parent().next().find("input").eq(1).show();
                }else{
                    $(this).parent().next().find("input").eq(1).hide();
                }
            });

            $("#jingtaitable,#dongtaizhibiao").delegate(".rulesureAdd","click",function(){
                var select = $(this).parent().prev().prev().find("select");
                var inputs = $(this).parent().prev().find("input");
                if(select.val() == "between"){
                    if($.trim(inputs.eq(0).val()) == ""){
                        inputs.eq(0).focus();
                        showTip("值不能为空.");
                        return;
                    }
                    if($.trim(inputs.eq(1).val()) == ""){
                        inputs.eq(1).focus();
                        showTip("值不能为空.");
                        return;
                    }
                    var valuesTd = $(this).parent().parent().find(".valuesTd");
                    var or = "";
                    if(valuesTd.find("a").length > 0){
                        or = "<span class='guanxiLabel'> OR </span>";
                    }
                    valuesTd.append(or + '<a class="elmTagA">'
                        +'BETWEEN ' + inputs.eq(0).val() + ' AND ' + inputs.eq(1).val()
                        +'<i class="fa fa-fw fa-times-circle"></i>'
                        +'</a>');
                }else{
                    if($.trim(inputs.eq(0).val()) == ""){
                        inputs.eq(0).focus();
                        showTip("值不能为空.");
                        return;
                    }
                    var valuesTd = $(this).parent().parent().find(".valuesTd");
                    var or = "";
                    if(valuesTd.find("a").length > 0){
                        or = "<span class='guanxiLabel'> OR </span>";
                    }
                    valuesTd.append(or + '<a class="elmTagA">'
                        + select.val() + " " + inputs.eq(0).val()
                        +'<i class="fa fa-fw fa-times-circle"></i>'
                        +'</a>');
                }
            });

            $(".dingzhitable").delegate(".elmTagA .fa-times-circle","click",function(){
                var prevSpan = $(this).parent().prev("span");
                var nextSpan = $(this).parent().next("span");
                if(prevSpan.length == 0 &&  nextSpan.length == 0){
                }else if(prevSpan.length == 1 &&  nextSpan.length == 0){
                    prevSpan.remove();
                }else if(prevSpan.length == 0 &&  nextSpan.length == 1){
                    nextSpan.remove();
                }else if(prevSpan.length == 1 &&  nextSpan.length == 1){
                    prevSpan.remove();
                }
                $(this).parent().remove();
            });


            //标签逻辑拖拽
            $(".tagLuoji").delegate(".draggable", "mouseenter", function (e) {
                _this._ableMove = true;
                _this.toDraggableDiv = $(this);
            });
            $(".tagLuoji").delegate(".draggable", "mouseleave", function (e) {
                _this._ableMove = false;
            });
            $(".tagLuoji").delegate(".draggable a", "mousedown", function (e) {
                _this.move = true;
                _this.formDraggableDiv = $(this).parent();
                _this._moveElm = $(this);
                $("#dragSpan").html($(this).text());
                var x = e.clientX;//控件左上角到屏幕左上角的相对位置
                var y = e.clientY;
                var wekitType = _this.myBrowser();
                if (wekitType == "Chrome") {
                    $(".drag").css({"top": y+5, "left": x+5});
                } else if (wekitType == "Safari") {
                    $(".drag").css({"top": y, "left": x});
                } else {
                    $(".drag").css({"top": y, "left": x});
                }

                $(".drag").show();
            });
            $(document).mousemove(function (e) {
                if (_this.move) {
                    var x = e.clientX;//控件左上角到屏幕左上角的相对位置
                    var y = e.clientY;
                    var wekitType = _this.myBrowser();
                    if (wekitType == "Chrome") {
                        $(".drag").css({"top": y+5, "left": x+5});
                    } else if (wekitType == "Safari") {
                        $(".drag").css({"top": y+5, "left": x+5});
                    } else {
                        $(".drag").css({"top": y, "left": x});
                    }
                }
            }).mouseup(function () {
                $(".drag").hide();
                if (_this._ableMove && _this.move) {
                    _this.toDraggableDiv.append('<a data-id="'+_this._moveElm.attr("data-id")+'">'+_this._moveElm.text()+'</a>');
                    _this._moveElm.remove();
                }
                _this.move = false;
            });


            $(".tagLuoji").delegate(".fa-times","click",function(){
                var parent = $(this).parent().parent();
                parent.prev().remove();
                $("#allTagsDraggagle").append(parent.find(".draggable").html());
                parent.remove();
            });

            $(".addNewGroup").click(function(){
                $(this).parent().before('<div class="guanxi">'
                    +'<select class="myselect100">'
                    +'<option value="OR">OR</option>'
                    +'<option value="AND">AND</option>'
                    +'</select>'
                    +'</div>'
                    +'<div class="luojiDiv luojiLeft">'
                    +'<div class="tit">'
                    +'<select class="myselect100" style="width:100px;">'
                    +'<option value="OR">OR</option>'
                    +'<option value="AND">AND</option>'
                    +'</select>'
                    +'<i class="fa fa-fw fa-times"></i>'
                    +'</div>'
                    +'<div class="cont draggable">'
                    +'</div>'
                    +'</div>');
            });

            $("#add").click(function(){
                _this.saveRule();
            });

        },

        saveRule:function(){
            var _this = this;
            var rule = {};
            var name = $.trim($("#ruleName").val());
            if(name == ""){
                showTip("任务名称不能为空");
                return;
            }
            rule.name = name;

            var uuid = $('input:radio[name="uuid"]:checked').val();
            rule.uuid = uuid;

            rule.period = $('input:radio[name="period"]:checked').val();;

            var label_list = [],labellis = $(".tagValues").find('li.active');
            if(labellis.length<=0){
                showTip("请选择最少一个标签.");
                return;
            }
            for(var i=0;i<labellis.length;i++){
                label_list.push(labellis.eq(i).attr("data-id"));
            }
            rule.label_list = label_list.join(",");


            //所有标签的值list
            var labelValuesList =[], weidutrs = $("#weiduTable tr"),
                jingtaitrs = $("#jingtaitable tr"),
                dongtaitrs = $("#dongtaizhibiao tr");
            for(var j=0;j<weidutrs.length;j++){
                var obj = {},tr = weidutrs.eq(j),tds = tr.find("td");
                obj.label_id = tr.attr("data-id");
                obj.label_name = tr.attr("data-name");
                obj.type = 1;
                obj.values = tr.find("input").val();
                if($.trim(obj.values) == ""){
                    showTip("维度 "+obj.label_name+" 值不能为空.");
                    return;
                }
                obj.start_time = "";
                obj.end_time = "";
                obj.op =tr.find("select").val();
                labelValuesList.push(obj);
            }
            for(var k=0;k<jingtaitrs.length;k++){
                var obj = {},tr = jingtaitrs.eq(k),tds = tr.find("td");
                obj.label_id = tr.attr("data-id");
                obj.label_name = tr.attr("data-name");
                obj.type = 2;
                var values = tds.eq(2).text();
                if($.trim(values) == ""){
                    showTip("静态指标 "+obj.label_name+" 值不能为空.");
                    return;
                }
                obj.values = values.split("OR").join(",");
                obj.start_time = "";
                obj.end_time = "";
                obj.op = "";

                labelValuesList.push(obj);
            }
            for(var k=0;k<dongtaitrs.length;k++){
                var obj = {},tr = dongtaitrs.eq(k),tds = tr.find("td");
                obj.label_id = tr.attr("data-id");
                obj.label_name = tr.attr("data-name");
                obj.type = 3;
                var values = tds.eq(3).text();
                if($.trim(values) == ""){
                    showTip("动态指标 "+obj.label_name+" 值不能为空.");
                    return;
                }
                obj.values = values.split("OR").join(",");
                obj.start_time = tds.eq(2).find("input").eq(0).val();
                obj.end_time = tds.eq(2).find("input").eq(1).val();
                if($.trim(obj.start_time) == ""){
                    showTip("动态指标 "+obj.label_name+" 起始时间不能为空.");
                    return;
                }
                if($.trim(obj.end_time) == ""){
                    showTip("动态指标 "+obj.label_name+" 结束时间不能为空.");
                    return;
                }
                if(obj.start_time > obj.end_time){
                    showTip("动态指标 "+obj.label_name+" 开始时间不能大于结束时间.");
                    return;
                }
                obj.op = "";

                labelValuesList.push(obj);
            }

            //逻辑C1 AND C2 OR C3 OR C4
            var luojiLefts = $(".luojiLeft"),expr = "";
            for(var m=0;m<luojiLefts.length;m++){
                if(m != 0){
                    expr = expr + " " + luojiLefts.eq(m).prev().find("select").val() + " ";
                }
                expr = expr + " " + this._EXPR + m + " ";

                var pobj = {},children = luojiLefts.eq(m).find(".draggable a"),labels = [];
                pobj.type = luojiLefts.eq(m).find("select").val();
                for(var n=0;n<children.length;n++){
                    pobj[this._LABELEXPR + n] = this.getTagById(children.eq(n).attr("data-id"),labelValuesList);
                    labels.push(this._LABELEXPR + n);
                }
                pobj.expr = labels.join(" " + pobj.type + " ");
                rule[this._EXPR  + m] = pobj;
            }
            rule.expr = expr;

            rule.desc = $("#desc").val();

            var url = "/venus/usergroup/group/add";
            if(this.id != null){
                url = "/venus/usergroup/group/update";
                rule.id = this.id;
                rule.create_time = this.obj.create_time;
                rule.last_build_time = this.obj.last_build_time;
                rule.last_modify_time = this.obj.last_modify_time;
                rule.type = this.obj.type;
                rule.total_num = this.obj.total_num;
            }
            showloading(true);
            $.ajax({
                type: "post",
                url: url,
                dataType: "json",
                contentType: 'application/json',
                data: JSON.stringify(rule),
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        showTip("保存成功!");
                        location.href = "ruleList.html";
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


        getTagById:function(id,arr){
            for(var i=0;i<arr.length;i++){
                if(id == arr[i].label_id){
                    return arr[i];
                }
            }
            return;
        },

        getInfo:function(){
            var _this = this;
            showloading(true);
            $.ajax({
                type: "get",
                url: "/venus/usergroup/group/get/"+_this.id,
                data: {},
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        var dat = result.pairs.dat;
                        var obj = dat.obj;
                        _this.setInfo(obj);
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
        setInfo:function(obj){
            this.obj = obj;
            $("#ruleName").val(obj.name);
            $("input[type=radio][name=uuid][value="+obj.uuid+"]").attr("checked",'checked');
            $("input[type=radio][name=period][value="+obj.period+"]").attr("checked",'checked');
            this.getTagList(obj.label_list.split(","));
            this.setTagValues(obj);

            $("#desc").val(obj.desc);
        },

        setTagValues:function(obj){
            var sqlCGs = $.trim(obj.expr).split("  ");// '  '可能会存在问题 待优化
            for(var i=0;i<sqlCGs.length;i++){
                var key = sqlCGs[i];
                if(key.indexOf(this._EXPR)>-1){
                    var child = obj[key],type = child.type;
                    if(i==0){
                        $("#firstTagSelect").val(type);
                        for(var childKey in child){
                            if(childKey.indexOf(this._LABELEXPR)>-1){
                                $("#allTagsDraggagle").append('<a data-id="'+child[childKey].label_id+'">'+child[childKey].label_name+'</a>');
                                this.addTypeListValue(child[childKey],type);
                                console.log(child[childKey].label_name);
                            }
                        }
                    }else{
                        var strHtml = '<div class="luojiDiv luojiLeft">'
                            +'<div class="tit">'
                            +'<select class="myselect100" style="width:100px;">'
                            +'<option value="OR" '+(type=="OR"?'selected':"")+'>OR</option>'
                            +'<option value="AND" '+(type=="AND"?'selected':"")+'>AND</option>'
                            +'</select>'
                            +'<i class="fa fa-fw fa-times"></i>'
                            +'</div>'
                            +'<div class="cont draggable">';
                        for(var childKey in child){
                            if(childKey.indexOf(this._LABELEXPR)>-1){
                                strHtml = strHtml + '<a data-id="'+child[childKey].label_id+'">'+child[childKey].label_name+'</a>';
                                this.addTypeListValue(child[childKey],type);
                            }
                        }
                        $(".addNewGroup").parent().before(strHtml+'</div>'
                            +'</div>')
                    }
                }else{
                    $(".addNewGroup").parent().before('<div class="guanxi">'
                        +'<select class="myselect100">'
                        +'<option value="OR" '+(key=="OR"?'selected':"")+'>OR</option>'
                        +'<option value="AND" '+(key=="AND"?'selected':"")+'>AND</option>'
                        +'</select>'
                        +'</div>');
                }
            }
        },

        quickSearchValues:function(value){
            $(".myuserUl").html("");
            var values = this.operweiduTagValues;
            for(var i=0;i<values.length;i++){
                if(values[i].indexOf(value)>-1){
                    $(".myuserUl").append('<li data-value="'+values[i]+'"><a href="javascript:void(0);">'+values[i]+'</a></li>');
                }
            }

        },

        setWeiduInput:function(){
            var selectUsers = $(".selectUsers a");
            var valuess = [];
            for (var i = 0; i < selectUsers.length; i++) {
                valuess.push(selectUsers.eq(i).attr("data-value"));
            }
            this.selectMeijuInput.val(valuess.join(", "));
            $("#tagModal").modal("hide");
        },

        addTypeListValue:function(obj,groupType){
            var type = obj.type,id = obj.label_id,name = obj.label_name,op = obj.op||"in";
            if(type == 1){
                var weiduTable = $("#weiduTable");
                var strHtml = '<tr data-id="'+id+'" data-name="'+name+'">'
                    +'<td style="width:50px;">'
                    + (weiduTable.find("tr").length + 1)
                    +'</td>'
                    +'<td style="width:100px;">'
                    + name
                    +'</td>'
                    +'<td style="width:100px;">'
                    +'<select class="myselect100">'
                    +'<option value="in" '+(op=="in"?"selected":"")+'>in</option>'
                    +'<option value="not in" '+(op!="in"?"selected":"")+'>not in</option>'
                    +'</select>'
                    +'</td>'
                    +'<td style="width:450px;">'
                    +'<div class="input-group-sm">'
                    +'<input type="text" class="form-control meijuValues" value="'+obj.values+'" data-id="'+id+'" placeholder="点击添加枚举值" readonly>'
                    +'</div>'
                    +'</td>'
                    +'</tr>';
                weiduTable.append(strHtml);
            }else if(type == 2){
                var jingtaitable = $("#jingtaitable");
                var strHtml = '<tr data-id="'+id+'" data-name="'+name+'">'
                    +'<td style="width:50px;">'
                    + (jingtaitable.find("tr").length + 1)
                    +'</td>'
                    +'<td  style="width:100px;">'
                    + name
                    +'</td>'
                    +'<td style="width:400px;" class="valuesTd">'
                    + this.getTagHtml(groupType,obj.values)
                    +'</td>'
                    +'<td class="guanxiselect" style="width:100px;">'
                    +'<select class="myselect100">'
                    +'<option value="=">=</option>'
                    +'<option value=">"> > </option>'
                    +'<option value="<"> < </option>'
                    +'<option value=">=">>=</option>'
                    +'<option value="<="><=</option>'
                    +'<option value="between">between</option>'
                    +'</select>'
                    +'</td>'
                    +'<td>'
                    +'<div class="input-group-sm">'
                    +'<input type="text" class="form-control jingduinput" placeholder="">'
                    +'<input type="text" class="form-control jingduinput" placeholder="" style="display:none;">'
                    +'</div>'
                    +'</td>'
                    +'<td style="width:50px;">'
                    +'<a class="rulesureAdd">确定</a>'
                    +'</td>'
                    +'</tr>';
                jingtaitable.append(strHtml);
            }else if(type == 3){
                var dongtaizhibiao = $("#dongtaizhibiao");
                var strHtml = '<tr data-id="'+id+'" data-name="'+name+'">'
                    +'<td style="width:50px;">'
                    + (dongtaizhibiao.find("tr").length + 1)
                    +'</td>'
                    +'<td  style="width:100px;">'
                    + name
                    +'</td>'
                    +'<td style="width:200px;" >'
                    +'<div class="input-group-sm">'
                    +'<input type="text" class="form-control dongtaiTime" value="'+obj.start_time+'" style="width:48%;" placeholder="起始时间" >'
                    +'<input type="text" class="form-control dongtaiTime" value="'+obj.end_time+'" style="width:48%;"  placeholder="结束时间" >'
                    +'</div>'
                    +'</td>'
                    +'<td style="width:200px;" class="valuesTd">'
                    + this.getTagHtml(groupType,obj.values)
                    +'</td>'
                    +'<td class="guanxiselect" style="width:100px;">'
                    +'<select class="myselect100">'
                    +'<option value="=">=</option>'
                    +'<option value=">"> > </option>'
                    +'<option value="<"> < </option>'
                    +'<option value=">=">>=</option>'
                    +'<option value="<="><=</option>'
                    +'<option value="between">between</option>'
                    +'</select>'
                    +'</td>'
                    +'<td>'
                    +'<div class="input-group-sm">'
                    +'<input type="text" class="form-control jingduinput" placeholder="">'
                    +'<input type="text" class="form-control jingduinput" placeholder="" style="display:none;">'
                    +'</div>'
                    +'</td>'
                    +'<td style="width:50px;">'
                    +'<a class="rulesureAdd">确定</a>'
                    +'</td>'
                    +'</tr>';
                dongtaizhibiao.append(strHtml);
                $(".dongtaiTime").datetimepicker({
                    format: "yyyy-mm-dd",
                    autoclose: true,
                    todayBtn: true,
                    todayHighlight: true,
                    showMeridian: true,
                    minView:2,
                    pickerPosition: "bottom-right",
                    language: "zh-CN"
                });
            }
            $(".jingduinput").float();
        },

        getTagHtml:function(type,value){
            type = "OR";//type永远等于or
            var values = value.split(","),strhtml = '';
            for(var i=0;i<values.length;i++){
                strhtml = strhtml + '<a class="elmTagA">'
                    + $.trim(values[i])
                    +'<i class="fa fa-fw fa-times-circle"></i>'
                    +'</a>';
                if(i!=values.length-1) strhtml = strhtml +  '<span class="guanxiLabel"> '+type+' </span>';
            }
            return strhtml;
        },

        addTypeList:function($li){
            var id = $li.attr("data-id"),type = $li.attr("data-type"),name = $li.attr("data-name");
            if(type == 1){
                var weiduTable = $("#weiduTable");
                var strHtml = '<tr data-id="'+id+'" data-name="'+name+'">'
                    +'<td style="width:50px;">'
                    + (weiduTable.find("tr").length + 1)
                    +'</td>'
                    +'<td style="width:100px;">'
                    + name
                    +'</td>'
                    +'<td style="width:100px;">'
                    +'<select class="myselect100">'
                    +'<option value="in">in</option>'
                    +'<option value="not in">not in</option>'
                    +'</select>'
                    +'</td>'
                    +'<td style="width:450px;">'
                    +'<div class="input-group-sm">'
                    +'<input type="text" class="form-control meijuValues" data-id="'+id+'" placeholder="点击添加枚举值" readonly>'
                    +'</div>'
                    +'</td>'
                    +'</tr>';
                weiduTable.append(strHtml);
                showTip("已将标签"+name+"添加到维度.");
            }else if(type == 2){
                var jingtaitable = $("#jingtaitable");
                var strHtml = '<tr data-id="'+id+'" data-name="'+name+'">'
                    +'<td style="width:50px;">'
                    + (jingtaitable.find("tr").length + 1)
                    +'</td>'
                    +'<td  style="width:100px;">'
                    + name
                    +'</td>'
                    +'<td style="width:400px;" class="valuesTd">'
                    +'</td>'
                    +'<td class="guanxiselect" style="width:100px;">'
                    +'<select class="myselect100">'
                    +'<option value="=">=</option>'
                    +'<option value=">"> > </option>'
                    +'<option value="<"> < </option>'
                    +'<option value=">=">>=</option>'
                    +'<option value="<="><=</option>'
                    +'<option value="between">between</option>'
                    +'</select>'
                    +'</td>'
                    +'<td>'
                    +'<div class="input-group-sm">'
                    +'<input type="text" class="form-control jingduinput" placeholder="">'
                    +'<input type="text" class="form-control jingduinput" placeholder="" style="display:none;">'
                    +'</div>'
                    +'</td>'
                    +'<td style="width:50px;">'
                    +'<a class="rulesureAdd">确定</a>'
                    +'</td>'
                    +'</tr>';
                jingtaitable.append(strHtml);
                showTip("已将标签"+name+"添加到静态指标.");
            }else if(type == 3){
                var dongtaizhibiao = $("#dongtaizhibiao");
                var strHtml = '<tr data-id="'+id+'" data-name="'+name+'">'
                    +'<td style="width:50px;">'
                    + (dongtaizhibiao.find("tr").length + 1)
                    +'</td>'
                    +'<td  style="width:100px;">'
                    + name
                    +'</td>'
                    +'<td style="width:200px;" >'
                    +'<div class="input-group-sm">'
                    +'<input type="text" class="form-control dongtaiTime" style="width:48%;" placeholder="起始时间" >'
                    +'<input type="text" class="form-control dongtaiTime" style="width:48%;"  placeholder="结束时间" >'
                    +'</div>'
                    +'</td>'
                    +'<td style="width:200px;" class="valuesTd">'
                    +'</td>'
                    +'<td class="guanxiselect" style="width:100px;">'
                    +'<select class="myselect100">'
                    +'<option value="=">=</option>'
                    +'<option value=">"> > </option>'
                    +'<option value="<"> < </option>'
                    +'<option value=">=">>=</option>'
                    +'<option value="<="><=</option>'
                    +'<option value="between">between</option>'
                    +'</select>'
                    +'</td>'
                    +'<td>'
                    +'<div class="input-group-sm">'
                    +'<input type="text" class="form-control jingduinput" placeholder="">'
                    +'<input type="text" class="form-control jingduinput" placeholder="" style="display:none;">'
                    +'</div>'
                    +'</td>'
                    +'<td style="width:50px;">'
                    +'<a class="rulesureAdd">确定</a>'
                    +'</td>'
                    +'</tr>';
                dongtaizhibiao.append(strHtml);
                showTip("已将标签"+name+"添加到动态指标.");
                $(".dongtaiTime").datetimepicker({
                    format: "yyyy-mm-dd",
                    autoclose: true,
                    todayBtn: true,
                    todayHighlight: true,
                    showMeridian: true,
                    minView:2,
                    pickerPosition: "bottom-right",
                    language: "zh-CN"
                });
            }
            $("#allTagsDraggagle").append('<a data-id="'+id+'">'+name+'</a>');
            $(".jingduinput").float();
        },

        removeTypeList:function($li){
            var id = $li.attr("data-id"),type = $li.attr("data-type"),name = $li.attr("data-name");
            if(type == 1){
                $("#weiduTable tr[data-id="+id+"]").remove();
                var trs = $("#weiduTable tr");
                for(var i=0;i<trs.length;i++){
                    trs.eq(i).find("td").eq(0).html(i+1);
                }
                showTip("已将标签"+name+"从维度中删除.");
            }else if(type == 2) {
                $("#jingtaitable tr[data-id="+id+"]").remove();
                var trs = $("#jingtaitable tr");
                for(var i=0;i<trs.length;i++){
                    trs.eq(i).find("td").eq(0).html(i+1);
                }
                showTip("已将标签"+name+"从静态指标中删除.");
            }else if(type == 3) {
                $("#dongtaizhibiao tr[data-id="+id+"]").remove();
                var trs = $("#dongtaizhibiao tr");
                for(var i=0;i<trs.length;i++){
                    trs.eq(i).find("td").eq(0).html(i+1);
                }
                showTip("已将标签"+name+"从动态指标中删除.");
            }
            $(".draggable a[data-id="+id+"]").remove();
        },

        getValuesByTagId:function(id){
            var _this = this;
            showloading(true);
            $.ajax({
                type: "get",
                url: "/venus/usergroup/label/getvalues",
                data: {
                    id:id
                },
                success: function (result) {
                    showloading(false);
                    if(result && result.success){
                        var dat = result.pairs.dat;
                        if(dat == ""){
                            showTip("该标签没有枚举值,请检查.");
                            return;
                        }else{
                            $(".myuserUl").html("");
                            var values = dat.split(",");
                            _this.operweiduTagValues = values;
                            for(var i=0;i<values.length;i++){
                                $(".myuserUl").append('<li data-value="'+values[i]+'"><a href="javascript:void(0);">'+values[i]+'</a></li>');
                            }
                            $("#tagModal").modal("toggle");
                        }
                    }else{
                        $.showModal({content:"查询失败:"+result.message});
                    }
                },
                error:function(a,b,c){
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },

        getTagList:function(selectListid){
            var _this = this;
            showloading(true);
            $.ajax({
                type: "get",
                url: "/venus/usergroup/label/list/all",
                data: {
                },
                success: function (result) {
                    showloading(false);
                    if(result && result.success){
                        var dat = result.pairs.dat;
                        _this.setDataList(dat,selectListid);
                    }else{
                        $.showModal({content:"查询失败:"+result.message});
                    }
                },
                error:function(a,b,c){
                    showloading(false);
                    alert(a.responseText);
                }
            });
        },
        setDataList:function(dat,selectListid){
            $(".tagValues").html("");

            if(!selectListid){
                $("#weiduTable").html("");
                $("#jingtaitable").html("");
                $("#dongtaizhibiao").html("");
                $(".luojiDiv .draggable").html("");
            }
            selectListid = selectListid||[];
            var joinColumnName = $("input:radio[name=uuid]:checked").val();
            for(var i=0;i<dat.length;i++){
                var obj = dat[i],active = "";
                if($.inArray(obj.id+"",selectListid)>-1){
                    active = "active";
                }
                if(joinColumnName == obj.joinColumnName){
                    var strHtml = '<li title="'+obj.name+'" data-id="'+obj.id+'" data-type="'+obj.type+'" data-name="'+obj.name+'" class="'+active+'">'
                        +'<a>'
                        +obj.name
                        +'<i class="fa fa-fw fa-times"></i>'
                        +'</a>'
                        +'</li>';
                    $("#classification_"+ obj.classification).append(strHtml);
                }
            }


        },

        myBrowser: function () {
            var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
            var isOpera = userAgent.indexOf("Opera") > -1;
            if (isOpera) {
                return "Opera"
            }
            ; //判断是否Opera浏览器
            if (userAgent.indexOf("Firefox") > -1) {
                return "FF";
            } //判断是否Firefox浏览器
            if (userAgent.indexOf("Chrome") > -1) {
                return "Chrome";
            }
            if (userAgent.indexOf("Safari") > -1) {
                return "Safari";
            } //判断是否Safari浏览器
            if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
                return "IE";
            }
            ; //判断是否IE浏览器
        }

    };
    addRule.init();
});
