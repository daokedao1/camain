import React from 'react';
import { withRouter } from 'react-router-dom';

import {Card, Col, Row,Button,Modal,Progress,message,Switch} from 'antd';
import InputForm from '@/components/input';
import {abTestAddData,abTestCurrentData,abTestUpdataData} from '@/axios';
import {arr,strategy,strategyParamsInit} from './serve';
import './index.less';
class Detile extends React.Component {
    constructor(props) {
        super(props);
        this.blockDetailType={};
        this.strageyList=[];
        this.allPercentVal=100;
        this.id=this.props.location.search.replace('?', '');

        this.state = {
            visible:false,
            operationName:'新增策略',
            strategyParams:{
                ...strategyParamsInit
            },
            paramsInput:{
                experimentName:'',
                experimentTitle:'',
                experimentType:'BUCKET',
                layer:0,
                domain:'',
                endTime:'',
                startTime:'',
                state:0
                // ...this.blockDetailType
            },
            listProportion:[
                // ...this.strageyList
            ],
            allPercent:{
                val:this.allPercentVal,
                shwo:true
            }

        };
    }
    add(){
        let obj={...strategyParamsInit};
        this.setState({visible:true,operationName:'新增策略',strategyParams:obj});
    }
    componentDidMount(){
        if(this.id){
            this.init(this.id);
        }
    }
    async init(id){
        const res=await abTestCurrentData({id:id});
        let strageyList=[];
        for(let key in res.data.strategyMapping){
            let keyObj=res.data.strategyMapping[key];
            strageyList.push({
                strategyName:keyObj.name,
                resource:JSON.stringify(keyObj.resource),
                percent:keyObj.attr.percent
            });
        }
        this.strageyList=strageyList;
        this.blockDetailType= res.data;
        for(let v of this.strageyList){
            this.allPercentVal-=v.percent;
        }
        let allPercent={
            val:this.allPercentVal,
            shwo:true
        };
        this.setState({paramsInput:this.blockDetailType,listProportion:this.strageyList,allPercent:allPercent});

    }
    edit(i){
        let {listProportion}=this.state;
        this.setState({visible:true,operationName:'编辑策略',strategyParams:listProportion[i]});
    }
    async save(){
        const {paramsInput,listProportion}=this.state;
        let res={};
        let params={
            ...paramsInput,
            strageyList:listProportion
        };
        params.percent=Number(params.percent);
        if(this.state.allPercent.val>0){
            message.error('您存在剩余分配流量');
            return;
        }
        if(this.id){
            res =await abTestUpdataData(params);
        }else{
            res =await abTestAddData(params);
        }
        if(res){
            message.success('成功');
            this.props.history.goBack();
        }
    }
    del(i){
        let {allPercent,listProportion}=this.state;
        let arr=[...listProportion];
        let curentArr= arr.splice(i, 1);
        for(let v of curentArr){
            allPercent.val+=v.percent;
        }
        this.setState({listProportion:arr,allPercent:allPercent});

    }
    handleOk(){

        let {strategyParams,listProportion,allPercent,operationName}=this.state;
        let arr=[...listProportion];
        let allVal=0;
        if(operationName==='新增策略'){
            arr.push({...strategyParams});
        }
        for(let v of arr){
            allVal+=Number(v.percent);
        }
        allPercent.val=100-allVal;
        if(allPercent.val<0){
            message.error('您输入的可分配流量占比过多');
            return false;
        }
        this.setState({listProportion:arr,visible:false,allPercent:allPercent});
    }
    handleCancel(){
        this.setState({visible:false});
    }
    switch(checked){
        const {paramsInput}=this.state;
        let stateObj={...paramsInput};
        if(checked){
            stateObj.state=0;
        }else{
            stateObj.state=-1;

        }
        this.setState({paramsInput:stateObj});
    }
    render() {
        const {operationName,paramsInput,listProportion,strategyParams,allPercent}=this.state;
        return (
            <div>
                <Row >
                    <Col span={5}></Col>
                    <Col span={14}>
                        <Card title="AB测试详情页" bordered={false}>
                            <InputForm styleCss={{height:'100%'}}  params={paramsInput}  labelAlign="right"  arr={arr}></InputForm>
                            <Row style={{margin:'30px 0'}}>
                                <Col span={6}>
                                  状态
                                </Col>
                                <Col span={16}>
                                    <Switch checked={paramsInput.state===0?true:false} onChange={this.switch.bind(this)}/>
                                </Col>
                            </Row>
                            <Row style={{margin:'30px 0'}}>
                                <Col span={4}>
                                  可分配流量
                                </Col>
                                <Col span={18}>
                                    <Progress status="active" percent={allPercent.val} />
                                </Col>
                            </Row>
                            <Row type="flex" align="middle" >
                                <Col span={20}>策略名称</Col>
                                <Col span={4}>
                                    <Button onClick={this.add.bind(this)} type="primary">新增策略</Button>
                                </Col>
                            </Row>
                            {
                                listProportion.map((v,i)=>(
                                    <Row key={i} type="flex" align="middle" style={{margin:'30px 0'}}>
                                        <Col span={4}>
                                            <div>{v.strategyName}</div>
                                        </Col>
                                        <Col span={10}>
                                            <Progress  type="line" percent={Number(v.percent)} />
                                        </Col>
                                        <Col span={3}>
                                        </Col>
                                        <Col span={7}>
                                            <Button onClick={()=>this.edit(i)} type="primary">编辑</Button>
                                            <Button onClick={()=>this.del(i)} type="danger">删除</Button>
                                        </Col>
                                    </Row>
                                ))
                            }

                        </Card>
                    </Col>
                    <Col span={5}>
                    </Col>
                </Row>
                <Row type="flex" justify="center">
                    <Button onClick={this.save.bind(this)} type="primary">保存</Button>
                </Row >


                <Modal
                    title={operationName}
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <InputForm   params={strategyParams} arr={strategy}></InputForm>
                </Modal>
            </div>

        );
    }
}

export default withRouter(Detile);

