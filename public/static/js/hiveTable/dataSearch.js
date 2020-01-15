require(['jquery','jquery.bootstrap','jquery.datetimepicker','common','quickSearch','app'],function($){
    /**
     * Created by user on 16/6/20.
     */
    var dataSearch = {

        pageNo:1,

        pageSize:10,

        totalPage:0,

        totalRecords:0,

        noDateFlag:false,

        init:function(){
            var _this = this;
            this.initEvent();
            this.getJishi();
            this.getZhuti();
            this.searchResult();
        },

        initEvent:function(){
            var _this = this;
            $(".searchContent").delegate(".labelGroups li a","click",function(){
                var li = $(this).parent(),ul = li.parent();
                if(li.hasClass("active")){
                    return;
                }
                if(ul.attr("data-one")){
                    ul.find("li").removeClass("active");
                }
                li.addClass("active");
                _this.noDateFlag = false;
                _this.pageNo =1;
                _this.searchResult();
            });
            $(".searchContent").delegate(".labelGroups li a i","click",function(e){
                var lii = $(this).parent().parent();
                lii.removeClass("active");
                _this.noDateFlag = false;
                _this.pageNo =1;
                _this.searchResult();
                e.stopPropagation();
                e.preventDefault();
            });

            $(".searchContent").delegate(".labelGroups .more","click",function(){
                if($(this).find("i").hasClass("fa-plus")){
                    $(this).siblings(".tagValues").addClass("jielue");
                    $(this).find(".fa-fw").removeClass("fa-plus").addClass("fa-minus");
                }else{
                    $(this).siblings(".tagValues").removeClass("jielue");
                    $(this).find(".fa-fw").removeClass("fa-minus").addClass("fa-plus");
                }
            });
            $(".deleteAll").click(function(){
                $(".labelGroups li").removeClass("active");
                _this.noDateFlag = false;
                _this.pageNo =1;
                _this.searchResult();
            });

            $("#showMoreSelect").click(function(){
                if($(this).find("i").hasClass("fa-angle-down")){
                    $(this).find("i").removeClass("fa-angle-down");
                    $(this).find("i").addClass("fa-angle-up");
                    $(".more_5").css("height","auto");
                }else{
                    $(this).find("i").removeClass("fa-angle-up");
                    $(this).find("i").addClass("fa-angle-down");
                    $(".more_5").css("height","0");
                }
            });

            $(".searchinputbut").click(function(){
                _this.pageNo =1;
                _this.noDateFlag = false;
                _this.searchResult();
            });
            $(".synchronization").click(function(){
                $('.synchronizationLoding').show();
                $('.autextBox').hide();
                $.ajax({
                    type: "get",
                    url: "/venus/hiveManage/flushClickHouseMetaTable",
                    success: function (res) {
                        $('.synchronizationLoding').hide();
                        $('.autextBox').show();
                        var insert=res.pairs.insert;
                        var update=res.pairs.update;
                        console.log(update)
                        $(".addBarPage").text(insert);
                        $(".updataBarPage").text(update);
                        
                    },
                    error: function (a, b, c) {
                        showloading(false);
                        alert(a.responseText);
                    }
                });
            });
            $(window).scroll(function(){
                var scrollTop = $(this).scrollTop();
                var scrollHeight = $(document).height();
                var windowHeight = $(this).height();
                if(scrollTop + windowHeight == scrollHeight){
                    _this.pageNo = _this.pageNo + 1;
                    _this.searchResult("scroll");
                }
            });
            $("#searchResult").delegate(".s_name","click",function(){
                window.open ('../hiveTable/hiveTableInfo.html?tableId='+$(this).parent().attr("data-id"));
            });

            $("#searchResult").delegate(".s_xueyuan","click",function(){
                window.open ('../hiveTable/hiveTableConsanguinity.html?tableId='+$(this).parent().attr("data-id"));
            });

        },

        searchResult:function(type){
            if(this.noDateFlag){
                return;
            }
            var _this = this;
            var searchTxt = $.trim($("#content").val());
            var jishiActive = $("#jishi").find("li.active"),marketId="";
            if(jishiActive.length>0){
                marketId = jishiActive.find("a").attr("data-value");
            }

            var fencengActive = $("#fenceng").find("li.active"),level="";
            if(fencengActive.length>0){
                level = fencengActive.find("a").attr("data-value");
            }

            var labelIdsActive = $(".kulabels").find("li.active"),_labelIds=[], labelIds="";
            for(var i=0;i<labelIdsActive.length;i++){
                _labelIds.push(labelIdsActive.eq(i).find("a").attr("data-value"));
            }
            labelIds = _labelIds.join(",");

            showloading(true);
            $.ajax({
                type: "post",
                url: "/venus/metadata/table/search",
                data: {
                    searchTxt:searchTxt,
                    marketId:marketId,
                    level:level,
                    labelIds:labelIds,
                    pageNo:_this.pageNo,
                    pageSize:_this.pageSize
                },
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        var dat = result.pairs.dat;
                        _this.setResultList(dat,type);
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

        setResultList:function(dat,type){
            var list = dat.results,totalNum = dat.totalRecords;
            if(list.length<=0 && type == "scroll") {
                this.noDateFlag=true;
                return
            };
            var totalHtml = '<div class="col-md-12 totalNumDiv">'
                            +'共<span>'+totalNum+'</span>条'
                            +'</div>';
            var listHtml = '';
            for(var i=0;i<list.length;i++){
                var tagNames = list[i].tagNames,tagHtml = "";
                if(tagNames && tagNames != ""){
                    var tags = tagNames.split(",");
                    for(var j=0;j<tags.length;j++){
                        tagHtml = tagHtml + '<span class="label label-warning">'+tags[j]+'</span>';
                    }
                }
                var marketOrDb = "";
                if(list[i].marketName){
                    marketOrDb = '<span class="s_jishi">所在集市:<span class="label label-success">'+list[i].marketName+'</span></span>';

                }else{
                    marketOrDb = '<span class="s_jishi">所在仓库:<span class="label label-success">'+list[i].dbName+'</span></span>';
                }
                listHtml = listHtml + '<div class="col-md-6">'
                    +'<div class="info-box s_info" data-id="'+list[i].id+'">'
                    +'<span class="s_name" >'+list[i].name+'</span>'
                +'<span class="s_time">创建:'+(new Date(list[i].createTime)).Format("yyyy-MM-dd hh:mm:ss")+'</span>'
                +'<span class="s_desc">'+list[i].chineseName+'</span>'
                +'<span class="s_xueyuan" data-id="'+list[i].id+'">查看血缘关系</span>'
                +marketOrDb
                +'<span class="s_biaoqian">标签:'+tagHtml+'</span>'
                +'</div>'
                +'</div>'
            }
            if(type == "scroll"){
                $("#searchResult").append(listHtml);
            }else{
                $("#searchResult").html(totalHtml+listHtml);
            }

            $(".main-sidebar").css("height",$(".content-wrapper").height()+60)
        },

        getJishi:function(){
            var _this = this;
            showloading(true);
            $.ajax({
                type: "get",
                url: "/venus/market/list",
                data: {
                    pageNo:1,
                    pageSize:99999
                },
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        var dat = result.pairs.dat.results;
                        _this.setJishi(dat);
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

        setJishi:function(dat){
            for(var i=0;i<dat.length;i++){
                $("#jishi").append('<li>'
                    +'<a data-value="'+dat[i].id+'">'
                    +dat[i].name
                    +'<i class="fa fa-fw fa-times-circle"></i>'
                    +'</a>'
                    +'</li>');
            }
        },

        getZhuti:function(){
            var _this = this;
            showloading(true);
            $.ajax({
                type: "get",
                url: "/venus/metadata/theme/list/all/withlabels",
                data: {
                },
                success: function (result) {
                    showloading(false);
                    if (result && result.success) {
                        var dat = result.pairs.dat;
                        _this.setZhuti(dat);
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

        setZhuti:function(dat){
            for(var i=0;i<dat.length;i++){
                var strHtml ="", first = dat[i],labelList = first.labelList,more_5=(i>3?"more_5":"");
                for(var j=0;j<labelList.length;j++){
                    strHtml = strHtml + '<li>'
                        +'<a data-value="'+labelList[j].id+'">'
                        +labelList[j].name
                        +'<i class="fa fa-fw fa-times-circle"></i>'
                        +'</a>'
                        +'</li>';
                }
                strHtml = '<div class="form-group labelGroups '+more_5+'">'
                    +'<label class="col-sm-2 control-label">'+dat[i].name+'</label>'

                    +'<div class="col-sm-10 input-group-sm">'
                    +'<ul class="tagValues kulabels"  style="color: #666666;font-size:12px;">'
                    +strHtml
                    +'</ul>'
                    +'<div class="more">'
                    +'<a>'
                    +'更多'
                    +'<i class="fa fa-fw fa-plus"></i>'
                    +'</a>'
                    +'</div>'
                    +'</div>'
                    +'</div>'
                    +'<div class="sperLine"></div>';
                $(".searchContent").append(strHtml);
            }
        }


    };
    dataSearch.init();
});