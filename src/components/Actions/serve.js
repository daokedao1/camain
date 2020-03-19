import React from 'react';

export const initParams={
    title:'',
    subTitle:'',
    publishTime:'',
    creator:'',
    isPublish:false,
    type:2,
    content:''
};
export const tableData=[
    {
        title: '活动标题',
        dataIndex: 'title',
        width:'20%'
    },
    {
        title: '子标题',
        width:'10%',
        align:'center',
        dataIndex: 'subTitle',
        render: (text, record) =>{
            return (
                <div >
                    <img style={{width:'90px',height:'40px',paddingRight:'9px'}} src={text} alt=""/>
                </div>
            );
        }
    },
    {
        title: '发布时间',
        dataIndex: 'publishTime',
        width:'10%'
    },
    {
        title: '创建人',
        dataIndex: 'creator',
        width:'10%'
    },
    {
        title: '更新时间',
        dataIndex: 'updateTime',
        width:'10%'
    },
    {
        title: '更新人',
        dataIndex: 'updater',
        width:'10%'
    },
    {
        title: '是否发布',
        dataIndex: 'isPublish',
        render(v){
            let a='';
            v?a='已发布':a='未发布';
            return a;
        },
        width:'10%'
    }
];
export const arr=[
    {
        name:'活动标题',
        type:'text',
        val:'title',
        placeholder:'请输入活动标题'
    },
    {
        name:'子标题',
        val:'subTitle',
        type:'text',
        placeholder:'请输入子标题'
    }
    // {
    //     name:'发布时间',
    //     type:'text',
    //     placeholder:'请输入发布时间',
    //     required:true,
    //     val:'publishTime'
    // },
    // {
    //     name:'是否发布',
    //     type:'text',
    //     placeholder:'请输入是否发布',
    //     required:true,
    //     val:'isPublish'
    // },
    // {
    //     name:'发布内容',
    //     type:'area',
    //     placeholder:'请输入发布内容',
    //     required:true,
    //     val:'content'
    // }

];


