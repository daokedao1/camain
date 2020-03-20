import React from 'react';

export const initParams={
    title:'',
    subTitle:'',
    content:'',
    startTime:'',
    endTime:''
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
                    {text}
                    {/* <img style={{width:'90px',height:'40px',paddingRight:'9px'}} src={text} alt=""/> */}
                </div>
            );
        }
    },
    {
        title: '开始时间',
        dataIndex: 'startTime',
        width:'10%'
    },
    {
        title: '结束时间',
        dataIndex: 'endTime',
        width:'10%'
    },
    {
        title: '活动进度',
        dataIndex: 'flowStatus',
        width:'10%',
        render: (text, record) =>{
            let a='';
            switch (text) {
            case 1:
                a='未开始';
                break;
            case 2:
                a='进行中';
                break;
            case 3:
                a='已结束';
                break;
            default:
                break;
            }
            return (
                a
            );
        }
    },
    {
        title: '活动状态',
        dataIndex: 'status',
        width:'10%',
        render: (text, record) =>{
            let a='';
            switch (text) {
            case 1:
                a='待发布';
                break;
            case 2:
                a='已发布';
                break;
            case 3:
                a='已撤回';
                break;
            default:
                break;
            }
            return   a;
        }
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
    },
    {
        name:'开始时间',
        type:'time',
        placeholder:'请输入开始时间',
        required:true,
        val:'startTime'
    },
    {
        name:'结束时间',
        type:'time',
        placeholder:'请输入结束时间',
        required:true,
        val:'endTime'
    }

];


