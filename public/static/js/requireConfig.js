requirejs.config({
    baseUrl: '../../',
    paths: {
        jquery: 'empty:',
        common:'js/common',
        'jquery.bootstrap' : 'other/bootstrap/js/bootstrap.min',
        'jquery.bootstrap.select' : 'other/bootstrap_select/bootstrap-select',
        'select2' : 'other/bootstrap_select/select2',
        app : 'other/dist/js/app.min',
        d3 : 'other/d3/d3.v4.min',
        'jquery.datetimepicker' : 'other/bootstrap/js/bootstrap-datetimepicker.min',
        'moment' : 'other/bootstrap/js/moment',
        'daterangepicker' : 'other/bootstrap/js/daterangepicker',
        'rangeSlider' : 'other/slider/ion.rangeSlider.min',
        'bootstrap_slider' : 'other/slider/bootstrap-slider',
        'quickSearch' : 'other/quickSearch/quickSearch',
        'jquery.ztree.core':'other/plugins/ztree/jquery.ztree.core-3.5',
        'jquery.ztree.excheck':'other/plugins/ztree/jquery.ztree.excheck-3.5',
        'jquery.ztree.exedit':'other/plugins/ztree/jquery.ztree.exedit-3.5',
        'codemirror':'other/codeMirror/codemirror',
        'sql':'other/codeMirror/sql',
        'show-hint':'other/codeMirror/show-hint',
        'sql-hint':'other/codeMirror/sql-hint',
        'echarts':'other/echarts/echarts.min'
    },
    shim : {
        common:{
            deps : [ 'jquery' ],
            exports : 'common'
        },
        quickSearch:{
            deps : [ 'jquery' ],
            exports : 'quickSearch'
        },
        'jquery.bootstrap' : {
            deps : [ 'jquery' ],
            exports : 'jquery.bootstrap'
        },
        'jquery.bootstrap.select' : {
            deps : [ 'jquery','jquery.bootstrap' ],
            exports : 'jquery.bootstrap.select'
        },
        'select2' : {
            deps : [ 'jquery','jquery.bootstrap' ],
            exports : 'select2'
        },
        app:{
            deps : [ 'jquery'],
            exports : 'app'
        },
        'jquery.ztree.core': {
            deps: ['jquery']
        },
        'jquery.ztree.excheck':{
            deps : [ 'jquery','jquery.ztree.core']
        },
        'jquery.ztree.exedit': {
            deps: ['jquery','jquery.ztree.core']
        }
    }
});