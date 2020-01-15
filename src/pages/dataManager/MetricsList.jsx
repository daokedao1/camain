import React from 'react';
import {Card, Col, Row, Modal,Input} from 'antd';
import Button from 'antd/es/button';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import ListTable from '@/components/table/List_table';
import InputForm from '@/components/input';
import {metricsTable,modifyTableMetrics,modifySearch,modifyCreate} from '@/axios';
import {tableData,paramsObj,arr,paramsInit,paramsDefault} from './serve';
import './metricsList.less';
class MetricsList extends React.Component {
    constructor(props){
        super(props);
        this.state={
            yAxisData:[],
            total:0,
            xAxisData:tableData,
            visible:false,
            operationName:'新建',
            params:{
                ...paramsInit
            }

        };


    }
    componentDidMount(){
        const data={...paramsDefault};
        this.init(data);
    }

    async searchWay(e,v){
        console.log(e,v);
        const { value } = e.target;

        const paramData={...paramsInit};
        for(let key in paramData){
            if(key===v){
                paramData[key]=value;
            }
        }
        // this.init(paramData);
    }
    async init(data){
        let arrTable=[...tableData];
        // await loginUrl({userName: 'admin',password: 'venus'});
        const res= await metricsTable(data);
        let yAxisData=[];
        yAxisData.push(...res.pairs.pageModel.results);
        const total=res.pairs.pageModel.totalRecords;
        const option=this.option();
        arrTable.unshift(option);
        this.setState({yAxisData:yAxisData,total:total,xAxisData:arrTable});
    }

    async editWay(title,id){
        let listData=null;
        if(id){//编辑
            const res= await modifySearch({id:id});
            listData=res.pairs.dat;
        }else{//新建
            listData={
                ...paramsInit
            };
        }
        this.setState({visible:true,operationName:title,params:listData});

    }
    async handleOk(){
        const {params,operationName}=this.state;
        params.isPartition=Number(params.isPartition);

        if(operationName==='新建'||operationName==='本条新建'){
            await modifyCreate(params);
        }else{
            await modifyTableMetrics(params);
        }
        this.setState({visible:false},()=>{
            const data={...paramsDefault};
            this.init(data);
        });

    }
    option(){
        return    {
            title: '操作',
            dataIndex: 'id',
            width: 130,
            fixed: 'left',
            render: (id) => {
                return (<div className="option">
                    <Button  size="small" onClick={()=>this.editWay('编辑',id)} type="primary">编辑</Button>
                    <Button  size="small" onClick={()=>this.editWay('本条新建',id)} type="primary">copy</Button>
                    {/* <Button type="danger">删除</Button> */}
                </div>);
            }
        };

    }
    indexWay(v){
        const {params}=this.state;
        if(params.field===''){
            return '';
        }else{
            return paramsObj[v.val](params);
        }

    }
    dbEdit(v){
        this.editWay('编辑',v.id);
    }
    handleCancel(){
        this.setState({visible:false});
    }
    render() {
        const {yAxisData,total,xAxisData,operationName,params}=this.state;

        return (
            <div className="content">
                <BreadcrumbCustom
                    first="数据知识"
                    second="指标管理"
                />
                <div>
                    <Row >
                        <Col span={24}>
                            <Card title="指标列表" extra={<Button onClick={()=>this.editWay('新建')} type="primary">新建</Button>} bordered={false}>
                                <ListTable yAxisData={yAxisData}
                                    total={total}
                                    // dbEdit={this.dbEdit.bind(this)}
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
                    <InputForm  indexWay={this.indexWay.bind(this)} params={params} arr={arr}></InputForm>
                </Modal>
            </div>
        );
    }
}

export default MetricsList;

