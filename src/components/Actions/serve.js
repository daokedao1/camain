import React from 'react';
export const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],//加粗，斜体，下划线，删除线
    ['blockquote', 'code-block'],//引用，代码块

    [{ 'header': 1 }, { 'header': 2 }],               // 标题，键值对的形式；1、2表示字体大小
    [{ 'list': 'ordered'}, { 'list': 'bullet' }], //列表
    [{ 'script': 'sub'}, { 'script': 'super' }],// 上下标
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // 缩进
    [{ 'direction': 'rtl' }],                         // 文本方向
    [{
        // 'size': ['10px', '12px', '14px', '16px', '18px', '20px']
        //1/75 *2
        //1px =0.026rem
        //1rem=36px
        'size': ['0.26rem', '0.31rem', '0.37rem', '0.41rem', '0.47rem', '0.52rem']
    }],
    // [{ 'size': ['small', false, 'large', 'huge', '0.52rem'] }],  // 字体大小
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],//几级标题

    [{ 'color': [] }, { 'background': [] }],         // 字体颜色，字体背景颜色
    [{ 'font': [] }],//字体
    [{ 'align': [] }],//对齐方式
    ['link', 'image', 'video'],//上传图片、上传视频
    ['clean']                     //清除字体样式                     // remove formatting button
];
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
        title: '主图',
        width:'10%',
        align:'center',
        dataIndex: 'subTitle',
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
        title: '开始时间',
        dataIndex: 'startTime',
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
        name:'主图',
        val:'subTitle',
        type:'text',
        placeholder:'请输入主图'
    },
    {
        name:'权重',
        val:'weights',
        type:'text',
        placeholder:'请输入权重'
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


