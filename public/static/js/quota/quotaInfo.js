/**
 * Created by user on 16/6/20.
 */
require(['jquery','jquery.bootstrap','jquery.datetimepicker','common','quickSearch','app'],function($){
    var quotaInfo = {

        id:"",

        init:function(){
            this.initEvent();
            this.id = $.getQueryString("id");
            this.getInfo();
        },

        initEvent:function(){
            var _this = this;
        },

        getInfo:function(){
            var _this = this;
            showloading(true);
            $.ajax({
                type: "get",
                url: "/venus/metadata/quota/get",
                data: {id:_this.id},
                success: function (result) {
                    showloading(false);
                    if(result && result.success){
                        var dat = result.pairs.dat;
                        _this.setValues(dat);
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

        setValues:function(dat){
            $("#ename").html(dat.name);
            $("#cname").html(dat.chineseName);
            $("#columType").html(dat.columnType);

            this.setTables(dat.tables);

            $("#quotaType").html(dat.type=="dimension"?"维度":"指标");
            $("#desc").val(dat.note);
        },

        setTables:function(tables){
            for(var i=0;i<tables.length;i++){
                $("#tableList").append('<tr><td>'+tables[i].name+'</td><td>'+tables[i].creator+'</td></tr>');
            }
        }
    };
    quotaInfo.init();
});
