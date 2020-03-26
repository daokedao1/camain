import React from 'react';
import {Card, Col, Row, Button, Modal,Switch,Popconfirm,message} from 'antd';
import { withRouter } from 'react-router-dom';
import ReactQuill from 'react-quill';
import ListTable from '@/components/table/List_table';
import InputForm from '@/components/input';
import {projectyList,addActivityList,delProjectList,editActivityList,retractProjectList,publishProjectList} from '@/axios';
import {tableData,initParams,arr} from './serve';
import './index.less';
class News extends React.Component {
    constructor(props){
        super(props);
        this.state={
            yAxisData:[],
            yArr:[],
            total:0,
            xAxisData:tableData,
            visible:false,
            operationName:'新建',
            params:{
                title:'',
                subTitle:'',
                content:'',
                startTime:'',
                endTime:''

            },
            text: '',
            objData:{},
            loading:true
        };
    }
    componentDidMount(){
        const data={};
        this.init();
    }
    async searchWay(e,v){
        const { value } = e.target;

        const paramData={};
        for(let key in paramData){
            if(key===v){
                paramData[key]=value;
            }
        }
        this.init(paramData);
    }
    async init(){
        let yAxisData,
            arrTable=[...tableData];
        const res= await projectyList({});
        if(res){
            yAxisData=[...res.data.items];
            yAxisData=this.stateWay(yAxisData);
            const option=this.option();
            arrTable.push(option);
        }
        this.setState({yAxisData:yAxisData,xAxisData:arrTable,loading:false});
    }
    stateWay(data){
        let obj=[...data];
        for(let v of data){
            for(let key in v){
                if(key==='state'){
                    if(v.state===0){
                        v.state='开';
                    }else{
                        v.state='关';
                    }
                }
            }
        }
        return obj;
    }
    async editWay(title,row){
        let param={...row};
        this.setState({
            visible:true,
            operationName:title,
            params:param
        });

    }
    async confirm(id) {
        await delProjectList({id:id});

        this.setState({loading:true},()=>{
            this.init();
            message.success('删除成功');
        });
    }
    switch(){
        const {params}=this.state;
        params.isPublish=!params.isPublish;
        this.setState({
            params:params
        });
    }
    handleChange(value) {
        const {params}=this.state;
        let text={...params};
        text.content=value;
        this.setState({ params: text });
    }
    async publish(id,row){
        const res=await publishProjectList({id:id});
        if(res){
            this.init();
            message.success('发布成功');
        }

    }
    async retract(id,row){
        const res=await retractProjectList({id:id});
        if(res){
            this.init();
            message.success('撤回成功');
        }

    }
    option(){
        return    {
            title: '操作',
            dataIndex: 'id',
            width: '20%',
            render: (id,row) => {

                return (<div className="option">
                    {/* <Button size="small" onClick={()=>this.editWay('编辑',row)} type="primary">编辑</Button> */}
                    {!row.isPublish?<Button size="small" onClick={()=>this.publish(id,row)} type="primary">发布项目</Button>:<Button size="small" onClick={()=>this.retract(id,row)} type="primary">撤回项目</Button>}

                    <Popconfirm
                        title="确定要删除本条数据吗?"
                        onConfirm={()=>this.confirm(id)}
                        // onCancel={this.cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button size="small" type="danger">删除</Button>
                    </Popconfirm>
                </div>);
            }
        };

    }
    indexWay(v){
        const {params}=this.state;
        if(params.field===''){
            return '';
        }else{
            // return paramsObj[v.val](params);
        }

    }

    handleCancel(){
        this.setState({visible:false});
    }
    async handleOk(){
        const {params,operationName}=this.state;
        console.log(params);
        let data={...params};
        if(operationName==='新建'){
            await addActivityList(data);
        }else{
            await editActivityList(data);
        }

        this.setState({visible:false},()=>{
            this.init();
        });
    }
    add(){
        let params={...initParams};
        this.setState({
            visible:true,
            operationName:'新建',
            params:params//初始化
        });
    }
    render() {
        const {yAxisData,total,xAxisData,operationName,visible,loading,params}=this.state;
        return (
            <div  className="content">
                <div>
                    <Row >
                        <Col span={24}>
                            <Card title="项目管理"
                            // extra={<Button onClick={()=>this.add('新建')} type="primary">新建</Button>}
                                bordered={false}>
                                <ListTable
                                    loading={loading}
                                    yAxisData={yAxisData}
                                    total={total}
                                    pagination={true}

                                    xAxisData={xAxisData}
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
                <Modal
                    title={operationName}
                    visible={visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    // searchData={searchData}
                >
                    <InputForm styleCss={{height:'100%'}}  indexWay={this.indexWay.bind(this)} params={params} arr={arr}></InputForm>
                    <div className="delayedSwitch" >
                        <p style={{width:'23.33%',color:' #000'}}>
                                发布内容:
                        </p>
                        <ReactQuill className="quill" value={params.content}
                            onChange={this.handleChange.bind(this)} />
                    </div>

                </Modal>
            </div>
        );
    }
}

export default withRouter(News);

