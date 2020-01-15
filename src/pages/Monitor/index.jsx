import React from 'react';
import {Card, Col, Row, Button, Modal,Tabs,Popconfirm,message} from 'antd';
import { withRouter } from 'react-router-dom';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import ListTable from '@/components/table/List_table';
import InputForm from '@/components/input';
import {monitorList,monitorUpdata,monitorCreate,abTestStatisticData} from '@/axios';
import {tableData,timeliness,arr,paramsDefault} from './serve';
import './index.less';
const { TabPane } = Tabs;
class Monitor extends React.Component {
    constructor(props){
        super(props);
        this.state={
            yAxisData:[],
            total:0,
            xAxisData:tableData,
            visible:false,
            operationName:'新建',
            params:{
                name:'',
                mtable:'',
                mtype:'及时性',
                locksman:'',
                timeField:'',
                level2Alert:'40m',
                level1Alert:'30m',
                timeFormat:'yyyy-MM-dd HH:mm:ss'
            },
            statistics:[],
            objData:{}
        };
    }
    componentDidMount(){
        const data={};
        this.init(data);
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
    async init(data){
        let arrTable=[...tableData];
        const res= await monitorList({});
        let yAxisData=[...res.pairs.monitors];
        yAxisData=this.stateWay(yAxisData);
        const option=this.option();
        arrTable.push(option);
        this.setState({yAxisData:yAxisData,xAxisData:arrTable});
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
        const {params}=this.state;
        if(title==='编辑'){//编辑
            params;
            this.setState({visible:true,params:{...row},operationName:title});
            // listData=res.pairs.dat;
        }else{//新建
            this.setState({visible:true,operationName:title,params:paramsDefault});
        }
        // operationName:title,params:listData});

    }
    async statistics(title,id){
        const res=await abTestStatisticData({id:id});
        let obj=res.data;
        let arr=Object.keys(obj);
        let newArr=['experimentName','experimentType','layer','totalReq'];
        let objArr=[];
        for(let key of arr){
            if(!newArr.includes(key)){
                objArr.push(key);
            }
        }

        arr=[...newArr,...objArr];
        this.setState({statistics:arr,objData:obj,visible:true});

    }
    async confirm(title,row) {
        row.status=1;
        await monitorUpdata({...row});
        this.setState({visible:false,params:paramsDefault},()=>{
            this.init();
        });
        message.success('删除成功');
    }

    // cancel(e) {
    //     console.log(e);
    //     message.error('取消删除');
    // }
    option(){
        return    {
            title: '操作',
            dataIndex: 'id',
            width: 200,
            rowKey:'id',
            render: (id,row) => {
                return (<div className="option">
                    <Button  size="small" onClick={()=>this.editWay('编辑',row)} type="primary">编辑</Button>
                    {/* <Button onClick={()=>this.statistics('统计',id)} type="primary">统计</Button> */}
                    <Popconfirm
                        title="确定要删除本条数据吗?"
                        onConfirm={()=>this.confirm('删除',row)}
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
    async handleOk(){
        const {params,operationName}=this.state;

        if(operationName==='新建'||operationName==='本条新建'){
            await monitorCreate({...params});
        }else{
            await monitorUpdata({...params});
        }
        this.setState({visible:false},()=>{
            this.init();
        });

    }
    indexWay(v){
        const {params}=this.state;
        if(params.field===''){
            return '';
        }else{
            // return paramsObj[v.val](params);
        }

    }
    tab(v){
        this.setState({mtype:v});
    }
    handleCancel(){
        this.setState({visible:false});
    }
    render() {
        const {yAxisData,total,xAxisData,operationName,params}=this.state;

        return (
            <div className="content">
                <div>
                    <Row >
                        <Col span={24}>
                            <Card title="监控配置" extra={<Button onClick={()=>this.editWay('新建')} type="primary">新建</Button>} bordered={false}>
                                <ListTable
                                    yAxisData={yAxisData}
                                    total={total}
                                    xAxisData={xAxisData}/>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <Modal
                    title={operationName}
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    // searchData={searchData}
                >
                    <InputForm styleCss={{height:'100%'}}  indexWay={this.indexWay.bind(this)} params={params} arr={arr}></InputForm>
                    <Tabs defaultActiveKey="1" onChange={this.tab.bind(this)}>
                        <TabPane tab="及时性" key="及时性">
                            <InputForm styleCss={{height:'100%'}}  indexWay={this.indexWay.bind(this)} params={params} arr={timeliness}></InputForm>
                        </TabPane>
                        {/* <TabPane tab="准确性" key="准确性">
                            <InputForm styleCss={{height:'100%'}}  indexWay={this.indexWay.bind(this)} params={params} arr={timeliness}></InputForm>
                        </TabPane> */}
                    </Tabs>

                </Modal>
            </div>
        );
    }
}

export default withRouter(Monitor);

