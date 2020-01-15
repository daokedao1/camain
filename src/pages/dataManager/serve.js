
export const tableData=[
    {
        title: '编码',
        width:80,
        align:'left',
        dataIndex: 'code',
        fixed: 'left'
    },

    {
        title: '表名',
        align:'left',
        dataIndex: 'dbTable',
        width:500
    },
    {
        title: '指标名',
        align:'left',
        dataIndex: 'name',
        width:120
    },
    {
        title: '字段',
        align:'left',
        dataIndex: 'field',
        width:500
    },

    {
        title: '绑定小时时间',
        align:'left',
        dataIndex: 'fHour',
        width:150
    },
    {
        title: '绑定日期时间',
        align:'left',
        dataIndex: 'fDate',
        width:150
    },
    {
        title: '是否分区',
        align:'left',
        dataIndex: 'isPartition',
        width:80

    },
    {
        title: '应用场景',
        align:'left',
        dataIndex: 'used',
        width:200

    },
    {
        title: '类型',
        align:'left',
        dataIndex: 'type',
        width:80
    },

    {
        title: '指标解释',
        align:'left',
        dataIndex: 'note',
        width:500
    },
    {
        title: '别名',
        align:'left',
        dataIndex: 'alias',
        width:150
    }
];
export const paramsObj={
    plan1:(params)=>{
        let contentName='';
        contentName+=`select ${params.field} as ${params.alias} from ${params.dbTable} where 1=1`;
        params.fHour===''?'':contentName+=` and ${params.fHour} between \'2019-11-11 00:00:00\' and \'2019-11-11 23:59:59\'`;
        params.isPartition===1?contentName+= ' and ptdate between \'2019-11-11\' and \'2019-11-11\'':'';
        return contentName;
    },
    plan2:(params={})=>{
        let contentName='';
        contentName+=`select ${params.field} as ${params.alias} from ${params.dbTable} where 1=1`;
        params.fDate===''?'':contentName+=` and ${params.fDate} between \'2019-11-11\' and \'2019-11-11\'`;
        params.isPartition===1?contentName+= ' and ptdate between \'2019-11-11\' and \'2019-11-11\'':'';
        return contentName;
    }
};
export const arr=[
    {
        name:'表名',
        type:'area',
        val:'dbTable',
        placeholder:'请输入表名'
    },
    {
        name:'别名',
        val:'alias',
        type:'text',
        placeholder:'请输入别名'
    },
    {
        name:'字段逻辑',
        type:'area',
        placeholder:'请输入字段逻辑',
        required:true,
        val:'field'
        // rules: [
        //     {
        //         type: 'field',
        //         message: 'The input is not valid E-mail!'
        //     },
        //     {
        //         required: true,
        //         message: 'Please input your E-mail!'
        //     }
        // ]

    },
    {
        name:'绑定小时时间',
        type:'text',
        placeholder:'请输入绑定小时时间',
        required:true,
        val:'fHour'

    },
    {
        name:'绑定日期时间',
        type:'text',
        placeholder:'请输入绑定日期时间',
        required:true,
        val:'fDate'

    },
    {
        name:'是否分区',
        type:'text',
        placeholder:'请输入分区',
        required:true,
        val:'isPartition',
        defaultVal:'0'
    },
    {
        name:'指标名称',
        type:'text',
        placeholder:'请输入指标名称',
        val:'name'
        // rules: [
        //     {
        //         type: 'email',
        //         message: 'The input is not valid E-mail!'
        //     },
        //     {
        //         required: true,
        //         message: 'Please input your E-mail!'
        //     }
        // ]
    },
    {
        name:'指标解释',
        type:'text',
        placeholder:'请输入指标解释',
        val:'note'

    },
    {
        name:'应用场景',
        type:'text',
        placeholder:'请输入应用场景',
        required:true,
        val:'used'

    },
    {
        name:'指标类型',
        type:'select',
        defaultVal:'指标',
        // placeholder:'请输入指标类型',
        val:'type',
        sleContent:[
            {
                name:'指标',
                val:'指标'
            },
            {
                name:'分组',
                val:'分组'
            },
            {
                name:'比率',
                val:'比率'
            }

        ]

    },
    {
        name:'计划预览1',
        type:'area',
        placeholder:'请输入指标类型',
        val:'plan1',
        calculation:true
    },
    {
        name:'计划预览2',
        type:'area',
        placeholder:'请输入指标类型',
        val:'plan2',
        calculation:true
    }

];
export const paramsInit={
    code:'',
    alias: '',
    dbTable: '',
    field: '',
    id: '',
    name: '',
    note: '',
    type: '指标',
    fHour:'',
    fDate:'',
    isPartition:'0',
    used:'',
    plan1:'',
    plan2:'',
    page:'/1000000/1'

};
export const paramsDefault={
    code:'',
    alias: '',
    dbTable: '',
    field: '',
    id: '',
    name: '',
    note: '',
    type: '',
    fHour:'',
    fDate:'',
    isPartition:'',
    used:'',
    plan1:'',
    plan2:'',
    page:'/1000000/1'

};

