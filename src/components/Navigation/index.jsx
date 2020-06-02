import React from 'react';
import {Card, Col, Row, Button, Modal,Switch,Popconfirm,message} from 'antd';
import { withRouter } from 'react-router-dom';
import ReactQuill from 'react-quill';
import ListTable from '@/components/table/List_table';
import InputForm from '@/components/input';
import {bannerList,addBannerList,delBannerList,editBannerList} from '@/axios';
import {tableData,initParams,arr} from './serve';
import './index.less';
import {merge} from 'lodash';
import NavModalForm from './modal'; 
import 'react-quill/dist/quill.snow.css'; // ES6

console.log(NavModalForm);
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
                redirectPath:'',
                path:'',
                rank:'',
                homePageId:'1'
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
        const res= await bannerList({});
        if(res){
            yAxisData=[...res.data];
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
        await delBannerList({id:id});

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
    option(){
        return    {
            title: '操作',
            dataIndex: 'id',
            width: '15%',
            render: (id,row) => {
                return (<div className="option">
                    <Button size="small" onClick={()=>this.editWay('编辑',row)} type="primary">编辑</Button>
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
    handleOk(){
        debugger;
        let  {params,operationName}=this.state;
        const {form} = this.modalFormRef.props;
        const {state} = this.modalFormRef;

        form.validateFields(async (err, values) => {
            if (err) {
                return message.error('保存信息失败，请查看信息填写是否正确或者联系管理员');
            }

            form.resetFields();
            params = merge(params, values, {path: state.imageUrl});
            let res;
            if(operationName==='新建'){
                res = await addBannerList(params);
            }else{
                res = await editBannerList(params);
            }
            
            if(!res.success) {
                return message.error(res.message);
            } 
            this.setState({visible:false},()=>{
                this.init();
            });

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

    saveForm(form) {
        this.modalFormRef = form;
        console.log(this.modalFormRef);
    }
    render() {
        const {yAxisData,total,xAxisData,operationName,visible,loading,params}=this.state;
        return (
            <div  className="content">
                <div>
                    <Row >
                        <Col span={24}>
                            <Card title="首页轮播图" extra={<Button onClick={()=>this.add('新建')} type="primary">新建</Button>} bordered={false}>
                                <ListTable
                                    loading={loading}
                                    yAxisData={yAxisData}
                                    total={total}
                                    xAxisData={xAxisData}
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
                <Modal
                    title={operationName}
                    visible={visible}
                    width={800}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    // searchData={searchData}
                >
                    {/* <InputForm styleCss={{height:'100%'}}  indexWay={this.indexWay.bind(this)} params={params} arr={arr}></InputForm> */}
                    {/* <NavModalForm wrappedComponentRef={(form) => this.form = form} params={params}/> */}

                    <NavModalForm wrappedComponentRef={this.saveForm.bind(this)} params={params}></NavModalForm>
                </Modal>
            </div>
        );
    }
}

export default withRouter(News);

