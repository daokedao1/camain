import React from 'react';
import {Card, Col, Row, Button, Modal,Input} from 'antd';
import { withRouter } from 'react-router-dom';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import ListTable from '@/components/table/List_table';
import InputForm from '@/components/input';
import {abTestList,abTestStatisticData} from '@/axios';
import {tableData,paramsObj,arr} from './serve';
import './index.less';

class ABtest extends React.Component {
    constructor(props){
        super(props);
        this.state={
            yAxisData:[],
            total:0,
            xAxisData:tableData,
            visible:false,
            operationName:'新建',
            params:{
                percent:'',
                strategyName:'',
                strategyName1:'',
                resuouce:''
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
        let searchData={
            code: <Input onChange={(e)=>this.searchWay(e,'code')}  />,
            dbTable: <Input onChange={(e)=>this.searchWay(e,'dbTable')}  />,
            name: <Input onChange={(e)=>this.searchWay(e,'name')}  />,
            alias: <Input onChange={(e)=>this.searchWay(e,'alias')}  />,
            field: <Input onChange={(e)=>this.searchWay(e,'field')}  />,
            isPartition:  <Input onChange={(e)=>this.searchWay(e,'isPartition')}  />,
            used: <Input onChange={(e)=>this.searchWay(e,'used')}  />
        };
        let arrTable=[...tableData];
        const res= await abTestList({sad:123});
        let yAxisData=[...res.data];
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
    async editWay(title,id){
        let listData=null,blockDetailType={},strageyList=[];
        const {yAxisData}=this.state;

        if(id){//编辑
            for(let v of yAxisData){
                if(v.id===id){
                    for(let key in v.strategyMapping){
                        let keyObj=v.strategyMapping[key];
                        strageyList.push({
                            strategyName:keyObj.name,
                            resource:JSON.stringify(keyObj.resource),
                            percent:keyObj.attr.percent
                        });
                    }
                    blockDetailType=v;
                }
            }
            blockDetailType.strageyList=strageyList;
            this.props.history.push({ pathname : '/ABtestDetile',search:'?'+id,state : { blockDetailType: blockDetailType} });
        }else{//新建
            this.props.history.push({ pathname : '/ABtestDetile'});
        }
        this.setState({visible:true,operationName:title,params:listData});

    }
    async statistics(title,id){
        const res=await abTestStatisticData({id:id});
        console.log(res);
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
    option(){
        return    {
            title: '操作',
            dataIndex: 'id',
            width: 200,
            render: (id) => {
                return (<div className="option">
                    <Button onClick={()=>this.editWay('编辑',id)} type="primary">编辑</Button>
                    <Button onClick={()=>this.statistics('统计',id)} type="primary">统计</Button>
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
            // return paramsObj[v.val](params);
        }

    }
    handleCancel(){
        this.setState({visible:false});
    }
    render() {
        const {yAxisData,total,xAxisData,statistics,objData}=this.state;

        return (
            <div className="content">
                {/* <BreadcrumbCustom
                    first="AB测试"
                /> */}
                <div>
                    <Row >
                        <Col span={24}>
                            <Card title="AB测试" extra={<Button onClick={()=>this.editWay('新建')} type="primary">新建</Button>} bordered={false}>
                                <ListTable
                                    yAxisData={yAxisData}
                                    total={total}
                                    xAxisData={xAxisData}
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
                <Modal
                    title="统计列表"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel.bind(this)}
                    okButtonProps={{ disabled: true }}
                    cancelButtonProps={{ disabled: true }}
                >
                    {
                        statistics.map((key,i) =>{
                            return (<p key={i}>{key}：{objData[key]}</p>);
                        }
                        )
                    }

                </Modal>
            </div>
        );
    }
}

export default withRouter(ABtest);

