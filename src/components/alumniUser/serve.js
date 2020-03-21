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
        name:'姓名',
        type:'text',
        readonly:true,
        val:'name'
    },
    {
        name:'手机号',
        val:'phone',
        readonly:true,
        type:'text'
    },
    {
        name:'入学时间',
        val:'acceptAnceDate',
        readonly:true,
        type:'text'
    },
    {
        name:'所在公司',
        val:'workUnit',
        readonly:true,
        type:'text'
    },

    {
        name:'现地址',
        val:'address',
        readonly:true,
        type:'text'
    },

    {
        name:'隶属校友会名称',
        val:'alumniName',
        readonly:true,
        type:'text'
    },
    {
        name:'生日',
        val:'birthday',
        readonly:true,
        type:'text'
    },
    {
        name:'班级名称',
        val:'className',
        readonly:true,
        type:'text'
    },
    {
        name:'学院名称',
        val:'collegeName',
        readonly:true,
        type:'text'
    },

    {
        name:'职务',
        val:'duty',
        readonly:true,
        type:'text'
    },
    {
        name:'学历',
        val:'education',
        readonly:true,
        type:'text'
    },
    {
        name:'邮箱',
        val:'email',
        readonly:true,
        type:'text'
    },
    {
        name:'院系名称',
        val:'facultyName',
        readonly:true,
        type:'text'
    },
    {
        name:'毕业时间',
        val:'graduateDate',
        readonly:true,
        type:'text'
    },
    {
        name:'身份证',
        val:'idCard',
        readonly:true,
        type:'text'
    },
    {
        name:'头像地址',
        val:'photoImg',
        readonly:true,
        type:'text'
    },
    {
        name:'个人风采',
        val:'photoList',
        readonly:true,
        type:'text'
    },

    {
        name:'专业',
        val:'professional',
        readonly:true,
        type:'text'
    },
    {
        name:'密码',
        val:'pwd',
        readonly:true,
        type:'text'
    },
    {
        name:'密码最后更新时间',
        val:'pwdLastResetTime',
        readonly:true,
        type:'text'
    },

    {
        name:'QQ号',
        val:'qq',
        readonly:true,
        type:'text'
    },

    {
        name:'学校名称',
        val:'schoolName',
        readonly:true,
        type:'text'
    },
    {
        name:'性别',
        val:'sex',
        readonly:true,
        type:'text'
    },

    {
        name:'个性签名',
        val:'signature',
        readonly:true,
        type:'text'
    },
    {
        name:'微信号',
        val:'wx',
        readonly:true,
        type:'text'
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


