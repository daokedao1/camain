import React from 'react';
import {Card, Col, Row, Button, Modal,Tabs,Popconfirm,message} from 'antd';
import { withRouter } from 'react-router-dom';
import ListTable from '@/components/table/List_table';
import InputForm from '@/components/input';
import {windControlListListName,windControlQueryList,windControlAddNameList,windControlDeleteNameList} from '@/axios';
import {tableData,newArr,arr,paramsDefault,arrBlock,newArrBlock} from './serve';
import './index.less';
const { TabPane } = Tabs;
class WindControlList extends React.Component {
    constructor(props){
        super(props);
        this.state={
            yAxisData:[],
            total:0,
            xAxisData:tableData,
            visible:false,
            operationName:'新建',
            params:{
                'sku': '',
                'spu': '',
                'userId': '',
                'nameType': '商品-刷单白名单',
                'longTime': 3600
            },
            paramsBlack:{
                'sku': '',
                'spu': '',
                'userId': '',
                'nameType': '用户-恶意退换货黑名单',
                'longTime': 3600
            },
            paramspop:{
                'sku': '',
                'spu': '',
                'userId': '',
                'nameType': '商品-刷单白名单',
                'longTime': 3600
            },
            paramspopBlack:{
                'sku': '',
                'spu': '',
                'userId': '',
                'nameType': '用户-恶意退换货黑名单',
                'longTime': 3600
            },
            statistics:[],
            objData:{},
            stateSave:'1'
        };
    }
    componentDidMount(){
        const data={};
        this.initDefault(data);
    }
    async initDefault(data){
        const selListName=await windControlListListName({type:1});
        const selListBlack=await windControlListListName({type:2});
        let menu=this.selListNameWay(selListName.data?selListName.data.menu:[]);
        let menublack=this.selListNameWay(selListBlack.data?selListBlack.data.menu:[]);
        arr.unshift(menu);
        arrBlock.unshift(menublack);
        newArr.unshift(menu);
        newArrBlock.unshift(menublack);
        let arrTable=[...tableData];
        let yAxisData=[];
        this.setState({yAxisData:yAxisData,xAxisData:arrTable});
    }
    async init(data){

        const res= await windControlQueryList(data);
        let yAxisData=res.data.result;
        let arrTable=[...tableData];
        this.setState({yAxisData:yAxisData,xAxisData:arrTable});
        message.success('成功');
    }
    selListNameWay(arr){
        let objArr=[];
        for(let v of arr){
            objArr.push({
                name:v,
                val:v
            });
        }
        return{
            name:'选择名单',
            val:'nameType',
            type:'select',
            placeholder:'请输入选择名单',
            sleContent:objArr
        };
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
    async confirm(data) {
        const res=await windControlDeleteNameList({...data});
        if(res.code===0){
            this.init(data);
            // message.success('删除成功');
        }
    }
    option(){
        return{
            title: '操作',
            dataIndex: 'id',
            width: 200,
            render: (id,row) => {
                return (<div className="option">
                    {/* <Button  size="small" onClick={()=>this.editWay('编辑',row)} type="primary">编辑</Button> */}
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
    tab(val){
        this.setState({stateSave:val});
    }
    async handleOk(){
        const {paramspop,params,paramsBlack,paramspopBlack,operationName,stateSave}=this.state;
        let param={};
        // let paramq={};
        stateSave==='1'?param=paramspop:param=paramspopBlack;
        // stateSave==='1'?paramq=params:paramq=paramsBlack;
        if(operationName==='新建'||operationName==='本条新建'){
            await windControlAddNameList({...param});
        }else{
            await monitorUpdata({...params});
        }
        this.setState({visible:false},()=>{
            this.init(param);
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
    async handleSubmit(data){

        this.init(data);
    }
    handleCancel(){
        this.setState({visible:false});
    }
    render() {
        const {yAxisData,total,xAxisData,operationName,params,paramspop,paramsBlack,paramspopBlack}=this.state;
        let formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 }
            }

        };
        return (
            <div className="content">
                <div>
                    <Row >
                        <Col span={24}>
                            <Card title="黑白名单" extra={<Button onClick={()=>this.editWay('新建')} type="primary">新建</Button>} bordered={false}>
                                <Tabs defaultActiveKey="1" >
                                    <TabPane tab="白名单" key="1">
                                        <Row>
                                            <Col span={24}>
                                                <InputForm handleDel={()=>this.confirm(params)} handleSubmit={()=>this.handleSubmit(params)}  layout={'inline'} styleCss={{height:'100%'}}  indexWay={this.indexWay.bind(this)} params={params} arr={arr}></InputForm>
                                                <ListTable
                                                    yAxisData={yAxisData}
                                                    total={total}
                                                    xAxisData={xAxisData}/>
                                            </Col>
                                            {/* <Col span={4}>
                                                <Button type="danger">删除</Button>

                                            </Col> */}
                                        </Row>


                                    </TabPane>
                                    <TabPane tab="黑名单" key="2">
                                        <Row>
                                            <Col span={24}>

                                                <InputForm handleDel={()=>this.confirm(paramsBlack)}  handleSubmit={()=>this.handleSubmit(paramsBlack)}  layout={'inline'} styleCss={{height:'100%'}}  indexWay={this.indexWay.bind(this)} params={paramsBlack} arr={arrBlock}></InputForm>
                                                <ListTable
                                                    yAxisData={yAxisData}
                                                    total={total}
                                                    xAxisData={xAxisData}/>
                                            </Col>
                                        </Row>

                                    </TabPane>
                                </Tabs>

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
                    <Tabs defaultActiveKey="1" onChange={this.tab.bind(this)}>

                        <TabPane tab="白名单" key="1">
                            <InputForm  styleCss={{height:'100%'}}  indexWay={this.indexWay.bind(this)} params={paramspop} arr={newArr}></InputForm>
                        </TabPane>
                        <TabPane tab="黑名单" key="2">
                            <InputForm styleCss={{height:'100%'}}  indexWay={this.indexWay.bind(this)} params={paramspopBlack} arr={newArrBlock}></InputForm>
                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
        );
    }
}

export default withRouter(WindControlList);

