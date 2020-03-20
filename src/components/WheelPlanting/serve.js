import React from 'react';

export const initParams={
    name:'',
    redirectPath:'',
    path:'',
    rank:'',
    homePageId:'',
    backColor:'',
    backImg:''
};
export const tableData=[
    {
        title: '名称',
        dataIndex: 'name',
        width:'20%'
    },
    {
        title: '跳转地址',
        dataIndex: 'redirectPath',
        width:'20%'
    },
    {
        title: '背景颜色',
        dataIndex: 'backColor',
        width:'20%'
    },
    {
        title: '背景图片',
        width:'10%',
        align:'center',
        dataIndex: 'backImg',
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
        name:'名称',
        type:'text',
        val:'name',
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
        val:'backImg'
    },
    {
        name:'背景颜色',
        type:'text',
        placeholder:'请输入背景颜色',
        required:true,
        val:'backColor'
    },
    {
        name:'顺序',
        type:'text',
        placeholder:'请输入顺序',
        required:true,
        val:'rank'
    }


];


