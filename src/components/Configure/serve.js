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
    id:'',
    info:'',
    key:'',
    value:''
};
export const tableData=[
    {
        title: '配置ID',
        dataIndex: 'id',
        width:'20%'
    },
    {
        title: '配置信息',
        width:'10%',
        align:'center',
        dataIndex: 'info',
        render: (text, record) =>{
            return (
                <div style={{display: 'inlineBlock',
                    'whiteSpace': 'nowrap',
                    'width': '100%',
                    'overflow': 'hidden',
                    'textOverflow':'ellipsis'
                }} >
                    {text}
                    {/* <img style={{width:'90px',height:'40px',paddingRight:'9px'}} src={text} alt=""/> */}
                </div>
            );
        }
    },
    {
        title: '配置key',
        dataIndex: 'key',
        width:'10%'
    },
    {
        title: '配置value',
        dataIndex: 'value',
        width:'60%',
        render: (text, record) =>{
            return (
                <div style={{display: 'inlineBlock',
                    'whiteSpace': 'nowrap',
                    'width': '100%',
                    'overflow': 'hidden',
                    'textOverflow':'ellipsis'
                }} >
                    {text}
                    {/* <img style={{width:'90px',height:'40px',paddingRight:'9px'}} src={text} alt=""/> */}
                </div>
            );
        }
    }

];
export const arr=[
    {
        name:'配置ID',
        type:'text',
        val:'id',
        placeholder:'请输入配置ID'
    },

    {
        name:'配置key',
        val:'key',
        type:'text',
        placeholder:'请输入配置key'
    },

    {
        name:'配置value',
        type:'area',
        placeholder:'请输入配置value',
        required:true,
        val:'value'
    },
    {
        name:'配置信息',
        val:'info',
        type:'text',
        placeholder:'请输入配置信息'
    }
];


