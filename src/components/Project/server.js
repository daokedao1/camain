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
        title: '项目标题',
        dataIndex: 'title',
        width:'20%'

    },
    // {
    //     title: '内容',
    //     width:'10%',
    //     align:'center',
    //     dataIndex: 'content',
    //     render: (text, record) =>{
    //         return (
    //             <div >
    //                 {text}
    //             </div>
    //         );
    //     }
    // },
    {
        title: '子标题',
        dataIndex: 'subTitle',
        width:'20%'
    },
    {
        title: '图片',
        width:'50%',
        align:'center',
        dataIndex: 'pictures',
        render: (text, record) =>{

            return (
                <div style={{display:'flex',flexFlow:'row',paddingRight:'9px',height:'100%',justifyContent:'center',alignContent:'center'}} >
                    {
                        text.map((v,i)=>(
                            <div key={i}>
                                {/* {text} */}
                                <img style={{width:'50px',height:'50px',paddingRight:'9px'}} src={v} alt=""/>
                            </div>
                        ))
                    }
                </div>


            );
        }
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
    },
    {
        title: '浏览次数',
        dataIndex: 'viewCount',
        width:'10%'

    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        width:'10%'
    },
    {
        title: '发布时间',
        dataIndex: 'publishTime',
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
        name:'主图',
        val:'subTitle',
        type:'text',
        placeholder:'请输入主图'
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


