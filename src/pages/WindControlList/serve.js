
export const tableData=[
    {
        title: 'keyId',
        dataIndex: 'keyValue',
        width:180,
        fixed: 'left'
    },
    {
        title: '生效时长',
        width:180,
        align:'center',
        dataIndex: 'longTime'
    },
    {
        title: '开始时间',
        dataIndex: 'createTime',
        width:180
    }
];

export const arr=[

    {
        name:'用户ID',
        type:'text',
        val:'userId',
        placeholder:'请输入用户ID'
    },
    {
        name:'SKU',
        type:'text',
        val:'sku',
        placeholder:'请输入SKU'
    },
    {
        name:'SPU',
        type:'text',
        val:'spu',
        placeholder:'请输入SKU'
    },
    {
        name:'生效时长',
        val:'longTime',
        type:'select',
        wrapperCol:{
            // labelCol: { span: 4 },
            // wrapperCol: { span: 14 }
        },
        placeholder:'请选择生效时长',
        sleContent:[
            {
                name:'1h',
                val:3600
            },
            {
                name:'6h',
                val:3600*6
            },
            {
                name:'12h',
                val:3600*12
            },
            {
                name:'24h',
                val:3600*24
            },
            {
                name:'一周',
                val:3600*24*7
            },
            {
                name:'一月',
                val:3600*24*30
            },
            {
                name:'永久',
                val:'0'
            }
        ]
    },

    {
        name:'查找',
        type:'btn'
    },
    {
        name:'删除',
        type:'btn',
        btnType:'del'
    }
];
export const arrBlock=[

    {
        name:'用户ID',
        type:'text',
        val:'userId',
        placeholder:'请输入用户ID'
    },
    {
        name:'SKU',
        type:'text',
        val:'sku',
        placeholder:'请输入SKU'
    },
    {
        name:'SPU',
        type:'text',
        val:'spu',
        placeholder:'请输入SKU'
    },
    {
        name:'生效时长',
        val:'longTime',
        type:'select',
        placeholder:'请选择生效时长',
        wrapperCol:{
            // labelCol: { span: 4 },
            // wrapperCol: { span: 14 }
        },
        sleContent:[
            {
                name:'1h',
                val:3600
            },
            {
                name:'6h',
                val:3600*6
            },
            {
                name:'12h',
                val:3600*12
            },
            {
                name:'24h',
                val:3600*24
            },
            {
                name:'一周',
                val:3600*24*7
            },
            {
                name:'一月',
                val:3600*24*30
            },
            {
                name:'永久',
                val:'0'
            }
        ]
    },

    {
        name:'查找',
        type:'btn'
    },
    {
        name:'删除',
        type:'btn',
        btnType:'del'
    }
];
export const newArr=[
    {
        name:'用户ID',
        type:'area',
        val:'userId',
        placeholder:'请输入用户ID'
    },
    {
        name:'SKU',
        type:'text',
        val:'sku',
        placeholder:'请输入SKU'
    },
    {
        name:'SPU',
        type:'text',
        val:'spu',
        placeholder:'请输入SKU'
    },
    {
        name:'生效时长',
        val:'longTime',
        type:'select',
        placeholder:'请选择生效时长',
        wrapperCol:{
            // labelCol: { span: 4 },
            // wrapperCol: { span: 14 }
        },
        sleContent:[
            {
                name:'1h',
                val:3600
            },
            {
                name:'6h',
                val:3600*6
            },
            {
                name:'12h',
                val:3600*12
            },
            {
                name:'24h',
                val:3600*24
            },
            {
                name:'一周',
                val:3600*24*7
            },
            {
                name:'一月',
                val:3600*24*30
            },
            {
                name:'永久',
                val:'0'
            }
        ]
    }


];
export const newArrBlock=[
    {
        name:'用户ID',
        type:'area',
        val:'userId',
        placeholder:'请输入用户ID'
    },
    {
        name:'SKU',
        type:'text',
        val:'sku',
        placeholder:'请输入SKU'
    },
    {
        name:'SPU',
        type:'text',
        val:'spu',
        placeholder:'请输入SKU'
    },
    {
        name:'生效时长',
        val:'longTime',
        type:'select',
        wrapperCol:{
            // labelCol: { span: 4 },
            // wrapperCol: { span: 14 }
        },
        sleContent:[
            {
                name:'1h',
                val:3600
            },
            {
                name:'6h',
                val:3600*6
            },
            {
                name:'12h',
                val:3600*12
            },
            {
                name:'24h',
                val:3600*24
            },
            {
                name:'一周',
                val:3600*24*7
            },
            {
                name:'一月',
                val:3600*24*30
            },
            {
                name:'永久',
                val:'0'
            }
        ]
    }


];
export const paramsDefault={
    'sku': '',
    'spu': '',
    'userId': '',
    'nameType': '商品-刷单白名单',
    'longTime': 3600
};





