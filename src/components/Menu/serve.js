import React from 'react';

export const initParams={
    name:'',
    path:'',
    type:1,
    sort:'',
    permission:'',
    visible:true,
    target:'menuItem'
};
export const tableData=[
    {
        title: '名称',
        dataIndex: 'name',
        width:'20%'
    },
    {
        title: '跳转地址',
        width:'10%',
        align:'center',
        dataIndex: 'path',
        render: (text, record) =>{
            return (
                <div >
                    {text}
                    {/* <img style={{width:'90px',height:'40px',paddingRight:'9px'}} src={text} alt=""/> */}
                </div>
            );
        }
    },
    {
        title: '打开方式',
        dataIndex: 'menuItem',
        width:'10%'
    },
    {
        title: '是否可见',
        dataIndex: 'visible',
        width:'10%'
    },
    {
        title: '菜单类型',
        dataIndex: 'type',
        width:'10%'
    }

];
export const arr=[
    {
        name:'名称',
        type:'text',
        val:'name',
        placeholder:'请输入名称'
    },
    {
        name:'打开方式',
        val:'target',
        placeholder:'请选择打开方式',
        model:true,
        type:'select',
        rules:[{
            required:true
        }],
        sleContent:[

            {
                name:'页签',
                val:'menuItem'
            },
            {
                name:'新窗口',
                val:'menuBlank'
            }

        ]
    },

    {
        name:'顺序',
        val:'sort',
        type:'text',
        placeholder:'请输入顺序'
    },

    {
        name:'菜单权限',
        placeholder:'请选择菜单权限',
        val:'permission',
        type:'text'

    },
    {
        name:'菜单类型',
        placeholder:'请选择菜单类型',
        val:'type',
        model:true,
        type:'select',
        rules:[{
            required:true
        }],
        sleContent:[

            {
                name:'目录',
                val:1
            },
            {
                name:'菜单',
                val:2
            },
            {
                name:'按钮',
                val:3
            }

        ]
    },
    {
        name:'是否可见',
        placeholder:'请选择是否可见',
        val:'visible',
        model:true,
        type:'select',
        rules:[{
            required:true
        }],
        sleContent:[

            {
                name:'不可见',
                val:false
            },
            {
                name:'可见',
                val:true
            }
        ]
    },
    {
        name:'备注',
        type:'area',
        placeholder:'请输入备注',
        val:'remark'
    }
];


