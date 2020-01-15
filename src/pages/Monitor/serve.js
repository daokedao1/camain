
export const tableData=[
    {
        title: '监控名称',
        dataIndex: 'name',
        width:180,
        fixed: 'left'
    },
    {
        title: '监控表名',
        width:480,
        align:'center',
        dataIndex: 'mtable'
    },
    {
        title: '值班人员',
        dataIndex: 'locksman',
        width:120
    },
    {
        title: '监控类型',
        dataIndex: 'mtype',
        width:150
    }
];
export const arr=[
    {
        name:'监控名称',
        type:'text',
        val:'name',
        placeholder:'请输入监控名称'
    },
    {
        name:'监控表名',
        type:'text',
        val:'mtable',
        placeholder:'请输入监控表名'
    },
    {
        name:'值班人员',
        val:'locksman',
        type:'mSelect',
        placeholder:'请输入值班人员',
        sleContent:[
            {
                name:'郭宁',
                val:'郭宁'
            },
            {
                name:'郝文爽',
                val:'郝文爽'
            },
            {
                name:'张晗',
                val:'张晗'
            },
            {
                name:'叶思成',
                val:'叶思成'
            },
            {
                name:'肖雅茹',
                val:'肖雅茹'
            },
            {
                name:'祁恩阔',
                val:'祁恩阔'
            },
            {
                name:'胡雅琳',
                val:'胡雅琳'
            },
            {
                name:'郭彦冬',
                val:'郭彦冬'
            },
            {
                name:'李进勇',
                val:'李进勇'
            }

        ]
    }

    // {
    //     name:'实验域',
    //     type:'text',
    //     placeholder:'请输入实验域',
    //     required:true,
    //     val:'domain',
    //     rules:{
    //         rules:[{
    //             required:true,
    //             message: '您不能输入中文'
    //         }],
    //         getValueFromEvent: (event) => {
    //             const {value}=event.target;
    //             return value.replace(/[\u4E00-\u9FA5]{2,4}/g,'');
    //         }
    //     }

    // },
    // {
    //     name:'开始时间',
    //     type:'time',
    //     placeholder:'请输入开始时间',
    //     required:true,
    //     val:'startTime'
    //     // format:'YYYY-MM-DD'
    // },
    // {
    //     name:'结束时间',
    //     type:'time',
    //     placeholder:'请输入结束时间',
    //     required:true,
    //     val:'endTime'
    // }


];
export const paramsDefault={
    name:'',
    mtable:'',
    mtype:'及时性',
    locksman:'',
    timeField:'',
    level2Alert:'40m',
    level1Alert:'30m',
    timeFormat:'yyyy-MM-dd HH:mm:ss'
};
export const timelinessParamsDefault={
    timeField:'',
    level2Alert:'10m',
    level1Alert:'10m',
    timeFormat:'YYYY-MM-DD'
};

export const timeliness=[
    {
        name:'时间字段',
        type:'text',
        val:'timeField',
        placeholder:'请输入时间字段'
    },
    {
        name:'时间格式',
        type:'text',
        val:'timeFormat',
        placeholder:'请输入时间格式'
    },
    {
        name:'一级报警',
        val:'level1Alert',
        type:'select',
        placeholder:'请选择一级报警',
        sleContent:[
            {
                name:'10分钟',
                val:'10m'
            },
            {
                name:'20分钟',
                val:'20m'
            },
            {
                name:'30分钟',
                val:'30m'
            },
            {
                name:'40分钟',
                val:'40m'
            },
            {
                name:'50分钟',
                val:'50m'
            },
            {
                name:'59分钟',
                val:'59m'
            }
        ]
    },
    {
        name:'二级报警',
        val:'level2Alert',
        type:'select',
        placeholder:'请选择二级报警',
        sleContent:[
            {
                name:'10分钟',
                val:'10m'
            },
            {
                name:'20分钟',
                val:'20m'
            },
            {
                name:'30分钟',
                val:'30m'
            },
            {
                name:'40分钟',
                val:'40m'
            },
            {
                name:'50分钟',
                val:'50m'
            },
            {
                name:'59分钟',
                val:'59m'
            }
        ]
    }

];
export const accuracy=[
    {
        name:'时间字段',
        type:'text',
        val:'experimentTitle',
        placeholder:'请输入时间字段'
    },
    {
        name:'时间格式',
        type:'text',
        val:'experimentTitle',
        placeholder:'请输入时间格式'
    },
    {
        name:'一级告警',
        type:'time',
        placeholder:'请输入一级告警',
        required:true,
        val:'startTime'
        // format:'MM-DD'
    },
    {
        name:'二级告警',
        type:'time',
        placeholder:'请输入二级告警',
        required:true,
        val:'endTime'
    }

];

export const disInputArr=[
    {
        name:'剩余流量',
        type:'progress',
        placeholder:'请输入实验域',
        required:true,
        val:'Progress',
        strokeColor:'',
        dataType:'circle'
    }
];
export const strategyList={
    name:'剩余流量',
    type:'progress',
    placeholder:'请输入实验域',
    required:true,
    val:'Progress',
    strokeColor:'',
    dataType:'circle'
};
export const strategyParamsInit={
    percent:0,
    strategyName:'',
    strategyName1:'',
    resource:'{}',
    experimentTitle:''
};
export const strategy=[
    {
        name:'占比(%)',
        type:'percent',
        placeholder:'请输入占比',
        required:true,
        val:'percent',
        dataType:'number'

    },
    {
        name:'策略名',
        type:'text',
        placeholder:'请输入策略名',
        required:true,
        val:'strategyName',
        rules:{
            rules:[{
                required:true,
                // pattern: new RegExp(/^[1-9]*$/, 'g'),
                message: '您不能输入中文'
            }],
            getValueFromEvent: (event) => {
                const {value}=event.target;
                return value.replace(/[\u4E00-\u9FA5]{2,4}/g,'');
            }
        }

    },
    // {
    //     name:'策略标识',
    //     type:'text',
    //     placeholder:'请输入策略名',
    //     required:true,
    //     val:'strategyName1'
    // },
    {
        name:'资源',
        type:'area',
        placeholder:'请输入策略名',
        required:true,
        val:'resource',
        rules:{
            rules:[{
                required:true,
                message: '您不能输入中文'
            }],
            getValueFromEvent: (event) => {
                const {value}=event.target;
                return value.replace(/[\u4E00-\u9FA5]{2,4}/g,'');
            }
        }
    }
];

