
export const tableData=[
    {
        title: '实验标题',
        dataIndex: 'experimentTitle',
        width:180,
        fixed: 'left'
    },
    {
        title: '实验名称',
        width:180,
        align:'center',
        dataIndex: 'experimentName'
    },
    {
        title: '实验类型',
        dataIndex: 'experimentType',
        width:120
    },
    {
        title: '实验层级',
        dataIndex: 'layer',
        width:150
    },
    {
        title: '实验域',
        dataIndex: 'domain',
        width:150
    },
    {
        title: '开始时间',
        dataIndex: 'startTime',
        width:350
    },
    {
        title: '结束时间',
        dataIndex: 'endTime',
        width:350
    },
    {
        title: '状态',
        dataIndex: 'state',
        width:80
    }
];
export const arr=[
    {
        name:'实验标题',
        type:'text',
        val:'experimentTitle',
        placeholder:'请输入实验标题'
    },
    {
        name:'实验名称',
        type:'text',
        val:'experimentName',
        placeholder:'请输入实验名称'
    },
    {
        name:'实验类型',
        val:'experimentType',
        type:'select',
        placeholder:'请输入实验类型',
        sleContent:[
            // {
            //     name:'RANDOM',
            //     val:'RANDOM'
            // },
            // {
            //     name:'SIMPLE',
            //     val:'SIMPLE'
            // },
            {
                name:'BUCKET',
                val:'BUCKET'
            }
        ]
    },
    {
        name:'实验层级',
        type:'select',
        placeholder:'请输入实验层级',
        required:true,
        val:'layer',
        sleContent:[
            {
                name:'0',
                val:'0'
            },
            {
                name:'1',
                val:'1'
            },
            {
                name:'2',
                val:'2'
            },
            {
                name:'3',
                val:'3'
            },
            {
                name:'4',
                val:'4'
            },
            {
                name:'5',
                val:'5'
            },
            {
                name:'6',
                val:'6'
            },
            {
                name:'7',
                val:'7'
            }
        ]
    },
    {
        name:'实验域',
        type:'text',
        placeholder:'请输入实验域',
        required:true,
        val:'domain',
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

    },
    {
        name:'开始时间',
        type:'time',
        placeholder:'请输入开始时间',
        required:true,
        val:'startTime'
        // format:'YYYY-MM-DD'
    },
    {
        name:'结束时间',
        type:'time',
        placeholder:'请输入结束时间',
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

