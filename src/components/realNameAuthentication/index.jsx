
import React, { Component } from 'react';
import { Row, Col, Table,Input,Divider,Modal,message,Button, Select } from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import Header from './../layout/Header';
import {getAlumniAuditList,AlumniAuditPass,AlumniAuditRefuse} from './../../axios';
const { confirm } = Modal;
const { Option } = Select;

class RealNameAuthentication extends Component {
    constructor(props){
        super(props);
        this.state={
            loading:false,
            page:1,
            pageSize:10,
            total:0,
            dataList:[],
            param:{
                id:'',
                'name': '',
                alumniName:'',
                auditStatus:1,
                orderField: '',
                orderType: ''
                // page: 1,
                // size: 10
            }
        };
    }
    componentDidMount(){
        this.getList();
    }
    componentDidUpdate(){
        if(this.state.loading){
            this.getList();
        }
    }
    getList(params){
        params = params || {
            'auditStatus':1,
            'orderField': '',
            'orderType': '',
            'page': this.state.page,
            'size': this.state.pageSize
        };
        getAlumniAuditList(params).then(res=>{
            if(res.success){
                res.data = res.data || {};
                this.setState({
                    dataList:this.buildData(res.data.items || []),
                    total:res.data.totalCount || 0,
                    loading:false
                });
            }
        });
    }
    buildData(list){
        let arr = [];
        list.forEach(element => {

            let userModel = element.userModel||{};
            let alumniModel = element.alumniModel||{};

            arr.push({
                id:element.id||'',
                username:userModel.name||'',
                userid:userModel.id||'',
                usercollegeName:userModel.collegeName||'',
                userfacultyName:userModel.facultyName||'',
                userModelworkUnit:userModel.workUnit||'',
                userModelduty:userModel.duty||'',
                userModelphone:userModel.phone||'',
                alumniModelID:alumniModel.id||'',
                alumniModelName:alumniModel.name||''
            });
        });
        return arr;
    }
    onPageChange(page, pageSize){
        console.log(page, pageSize);
        this.setState({
            page:page,
            pageSize:pageSize,
            loading:true
        });
    }
    
    searchs(){
        const {param, pageSize}=this.state;
        param['size'] = pageSize;
        param['page'] = 1;
        this.getList({...param});
    }
    IdChange(e,key){
        const { param } = this.state;
        // const params = Object.assign(searchParams,{});
        let value = e;
        if(key !== 'auditStatus') {
            value = e.target.value;
        }
        param[key] = value;
        this.setState({
            param: {...param}
        });
    }
    onPassClick(record){
        let {key,id,username='',alumniModelName=''} = record;
        let _this = this;
        confirm({
            title: '您确认审批通过该请求?',
            content: '请您核实用户('+username+')基本信息，确认加入组织('+alumniModelName+')！',
            onOk() {
                AlumniAuditPass(id).then(res=>{
                    if(res.success){
                        const dataList = [..._this.state.dataList];
                        _this.setState({ dataList: dataList.filter(item => item.id !== id) });
                        message.success('审批通过！');
                    }else{
                        message.error('审批失败！');
                    }
                });

            },
            onCancel() {
                console.log('取消');

            }
        });
    }
    onNoClick(record){
        let {key,id,username='',alumniModelName=''} = record;
        let _this = this;
        confirm({
            title: '您确认驳回该请求?',
            content: '请您核实用户('+username+')基本信息，确认驳回其加入组织('+alumniModelName+')！',
            onOk() {
                AlumniAuditRefuse(id).then(res=>{
                    if(res.success){
                        const dataList = [..._this.state.dataList];
                        _this.setState({ dataList: dataList.filter(item => item.id !== id) });
                        message.success('驳回通过！');
                    }else{
                        message.error('审批失败！');
                    }
                });

            },
            onCancel() {
                console.log('取消');

            }
        });
    }
    render() {
        let columns = [
            {
                title: '申请ID',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '申请协会',
                dataIndex: 'alumniModelName',
                key: 'alumniModelName'
            },
            {
                title: '申请人',
                dataIndex: 'username',
                key: 'username'
            },
            {
                title: '院系专业',
                dataIndex: 'usercollegeName',
                key: 'usercollegeName',
                render: (text,record) => <span>{text+'-'+record.userfacultyName}</span>
            },
            {
                title: '工作单位',
                dataIndex: 'userModelworkUnit',
                key: 'userModelworkUnit',
                render: (text,record) => <span>{text+'-'+record.userModelduty}</span>
            },
            {
                title: '联系方式',
                dataIndex: 'userModelphone',
                key: 'userModelphone'
            },
            {
                title: '操作',
                dataIndex: 'opt',
                key: 'opt',
                render: (e,record)=>(
                    <span>
                        {/* <a>详情</a>
                        <Divider type="vertical" /> */}
                        <a onClick={this.onPassClick.bind(this,record)}>通过</a>
                        <Divider type="vertical" />
                        <a onClick={this.onNoClick.bind(this,record)}>驳回</a>
                    </span>
                )

            }

        ];
        const {param}=this.state;
        return (
            <div>

                <Header title="申请加入协会申请审批"/>
                <Row gutter={16} style={{backgroundColor:'#fff',padding:'20px 40px'}}>

                    {/* <Col className="gutter-row" md={6}>
                        ID：<Input value={param.id} onChange={(e,v)=>this.IdChange(e,'id')}  placeholder="按id搜索" style={{width:'180px'}} />
                    </Col> */}
                    <Col className="gutter-row" md={6}>
                        姓名：<Input value={param.name} onChange={(e,v)=>this.IdChange(e,'name')}   placeholder="按姓名搜索" style={{width:'180px'}}/>
                    </Col>
                    <Col className="gutter-row" md={6}>
                        协会：<Input value={param.alumniName}  onChange={(e,v)=>this.IdChange(e,'alumniName')}   placeholder="按协会搜索" style={{width:'180px'}}/>
                    </Col>
                    <Col className="gutter-row" md={6}>
                        状态：<Select defaultValue={param.auditStatus} style={{ width: 180 }} onChange={(e) => this.IdChange(e, 'auditStatus')}>
                                <Option value={1}>未处理</Option>
                                <Option value={0}>已处理</Option>
                             </Select>
                    </Col>

                    <Col className="gutter-row" md={6}>
                        <Button onClick={this.searchs.bind(this)} type="primary">搜索</Button>
                    </Col>
                </Row>
                <Row gutter={16} style={{backgroundColor:'#fff'}}>
                    <Col className="gutter-row" md={24}>
                        <Table
                            dataSource={this.state.dataList}
                            columns={columns}
                            pagination={{total:this.state.total,page:this.state.page,pageSize:this.state.pageSize,onChange:this.onPageChange.bind(this)}}
                            rowKey={'id'}
                            scroll={{x:'max-content'}}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default RealNameAuthentication;
