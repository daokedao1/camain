import React from 'react';
export const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['link', 'image', 'video'],
    ['clean']                                         // remove formatting button
];
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
        title: '新闻标题',
        dataIndex: 'title',
        width:'20%'
    },
    {
        title: '主图',
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
        title: '权重',
        dataIndex: 'weights',
        width:'10%'
    },
    {
        title: '是否置顶',
        dataIndex: 'hasTop',
        render: (text, record) =>{
            let a='';
            text?a='已置顶':a='未置顶';
            return a;
        },
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
        name:'新闻标题',
        type:'text',
        val:'title',
        placeholder:'请输入新闻标题'
    },
    {
        name:'权重',
        val:'weights',
        type:'text',
        placeholder:'请输入权重'
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


