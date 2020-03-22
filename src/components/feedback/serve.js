import React from 'react';

export const initParams={
    title:'',
    subTitle:'',
    publishTime:'',
    creator:'',
    isPublish:false,
    type:1,
    content:''
};
export const tableData=[
    {
        title: '姓名',
        dataIndex: 'userName',
        width:'20%'
    },
    {
        title: '反馈信息',
        dataIndex: 'feedbackDesc',
        width:'10%'
    },
    {
        title: '状态',
        dataIndex: 'status',
        render(text){
            let a='';
            switch (text) {
            case 1:
                a='未处理';
                break;
            case 0:
                a='已处理';
                break;
            default:
                break;
            }
            return a;
        },
        width:'10%'
    },
    {
        title: '更新时间',
        dataIndex: 'updateTime',
        width:'10%'
    }

];
export const arr=[
    {
        name:'新闻标题',
        type:'text',
        val:'title',
        placeholder:'请输入新闻标题'
    },
    {
        name:'主图',
        val:'subTitle',
        type:'text',
        placeholder:'请输入主图'
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


