import React from 'react';

export const initParams={
    title:'',
    redirectPath:'',
    path:'',
    rank:'',
    homePageId:'1'
};
export const tableData=[
    {
        title: '标题',
        dataIndex: 'title',
        width:'20%'
    },
    {
        title: '跳转地址',
        dataIndex: 'redirectPath',
        width:'20%'
    },
    {
        title: '图片',
        width:'10%',
        align:'center',
        dataIndex: 'path',
        render: (text, record) =>{
            return (
                <div >
                    {/* {text} */}
                    <img style={{width:'90px',height:'40px',paddingRight:'9px'}} src={text} alt=""/>
                </div>
            );
        }
    },
    {
        title: '顺序',
        width:'10%',
        align:'center',
        dataIndex: 'rank'
    }

];
export const arr=[
    {
        name:'主页ID',
        type:'text',
        val:'homePageId',
        placeholder:'请输入主页ID',
        require:true
    },
    {
        name:'标题',
        type:'text',
        val:'title',
        placeholder:'请输入公告标题'
    },
    {
        name:'跳转地址',
        val:'redirectPath',
        type:'text',
        placeholder:'请输入跳转地址'
    },
    {
        name:'图片地址',
        type:'text',
        placeholder:'请输入图片地址',
        required:true,
        val:'path'
    },
    {
        name:'顺序',
        type:'text',
        placeholder:'顺序',
        required:true,
        val:'rank'
    }


];


