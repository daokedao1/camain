import React from 'react';

export const initParams={
    name:'',
    permission:'',
    dataScope:'',
    remark:''
};
export const tableData=[
    {
        title: '名称',
        dataIndex: 'name',
        width:'20%'
    },
    {
        title: '数据范围',
        width:'10%',
        align:'center',
        dataIndex: 'dataScope',
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
        title: '权限标识',
        dataIndex: 'permission',
        width:'10%'
    },
    {
        title: '备注',
        dataIndex: 'remark',
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
        name:'数据范围',
        val:'dataScope',
        type:'text',
        placeholder:'请输入数据范围'
    },
    {
        name:'权限标识',
        val:'permission',
        type:'text',
        placeholder:'请输入权限标识'
    },
    {
        name:'备注',
        type:'area',
        placeholder:'请输入备注',
        val:'remark'
    }

];


