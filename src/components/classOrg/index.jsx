
import React, { Component } from 'react';
import { Tree,Row,Switch, Button,Modal,Col,Form,Input,Select,message} from 'antd';
import {isEmpty, get} from 'lodash';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import {getAlumniOrg,getSchoolList,delAlumniById,getAlumniById,updateAlumniById,addAlumni} from './../../axios';

const { confirm } = Modal;
const { Option } = Select;
const { TreeNode } = Tree;
const { TextArea } = Input;

import './index.less';
class ClassOrg extends Component {
    constructor(props){
        super(props);
        this.state={
            orgtitle:'组织信息',
            treeheight:window.innerHeight-150,
            curNode:'',
            loading:false,
            opttype:'query',//add
            partentId:'0',
            schoollist:[],
            canDelete: false,
            treeData:[
                { title: '院系组织', key: 1 }
            ],
            id:'',
            name:'',
            description:'',
            school_id:'',
            organization:'',
            leader_desc:'',
            tel:'',
            type:'',
            update_time:''
        };
    }
    componentWillMount(){
        window.onresize = () => {
            this.getClientWidth();
        };
    }
    getClientWidth(){
        this.setState({
            treeheight:window.innerHeight-150
        });
    }
    componentDidMount(){
        //this.getOrgData();

        this.getSchoolList();
    }
    getSchoolList(){
        let param = {
            'orderField': '',
            'orderType': '',
            'page': 1,
            'size': 1000
        };
        getSchoolList(param).then(res=>{
            if(res.success){
                this.setState({
                    schoollist:res.data.items
                });
            }else{
                console.log(res);

            }
        });
    }
    addAlumni(param){
        delete param.update_time;
        delete param.id;
        let _this = this;
        param.status = 1;
        let curNode = this.state.curNode.node;
        addAlumni(param).then(res=>{
            if(res.success){
                message.success('保存成功！');
               
                let param = {
                    'orderField': '',
                    'orderType': '',
                    'page': 1,
                    'partentId': curNode.props.dataRef.key,
                    'size': 2000
                };
                getAlumniOrg(param).then(res=>{
                    if(res.success){
                        let children = [];
                        res.data.items.forEach(element => {
                            children.push({title:element.name,key:element.id});
                        });
                        curNode.props.dataRef.children = children;
                        this.setState({
                            treeData: [...this.state.treeData]
                        });
                        
                       
                    }else{
                        console.log(res);
    
                    }
                });
                _this.props.form.resetFields();
            }else{
                message.warning(res.message);
            }
        });
    }
    updateAlumniById(param){
        let _this = this;
        param.status = 1;
        updateAlumniById(param).then(res=>{
            if(res.success){
                message.success('保存成功！');
                if(param.name){
                    _this.state.curNode.node.props.dataRef.title = param.name
                    this.setState({
                        treeData: [...this.state.treeData]
                    });
                }
                
               
            }else{
                message.warning(res.message);
            }
        });
    }
    getOrgById(id){
        let param = {
            id:id
        };
        // id等于1 院系组织也不能删
        return getAlumniById(param).then(res=>{
            if(res.success){
                let orginfo = res.data;
                let associateData = get(orginfo, ['userVOList']);
                this.setState({
                    id:orginfo.id,
                    name:orginfo.name||'',
                    description:orginfo.description||'',
                    school_id:orginfo.school_id||'1',
                    organization:orginfo.organization||'',
                    leader_desc:orginfo.leader_desc||'',
                    tel:orginfo.tel||'',
                    type:orginfo.type||'1',
                    update_time:orginfo.update_time,
                    partentId:orginfo.partentId,
                    canDelete: isEmpty(associateData) && id > 1
                });
            }else{
                console.log(res);
            }
        });
    }
    onLoadData = treeNode =>{
        console.log(treeNode);
        return         new Promise(resolve => {
            if (treeNode.props.children) {
                resolve();
                return;
            }
            let param = {
                'orderField': '',
                'orderType': '',
                'page': 1,
                'partentId': treeNode.props.dataRef.key,
                'size': 2000
            };
            getAlumniOrg(param).then(res=>{
                if(res.success){
                    let children = [];
                    res.data.items.forEach(element => {
                        children.push({title:element.name,key:element.id});
                    });
                    treeNode.props.dataRef.children = children;
                    this.setState({
                        treeData: [...this.state.treeData]
                    });
                    console.log(this.state.treeData)
                    resolve();
                }else{
                    console.log(res);

                }
            });

        });
    }
    hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }
    delOrg(){
        let targetID = this.state.id;
        let _this = this;
        let curNode = this.state.curNode.node;
        // const orgRes = await this.getOrgById(targetID);
        // if(orgRes)
        if(targetID > 3){
            confirm({
                title: `您确认删除 ${_this.state.name}吗？?`,
                content: 'When clicked the OK button, this dialog will be closed after 1 second',
                onOk() {
                    delAlumniById({id:targetID}).then(res=>{
                        if(res.success){
                            message.success('删除成功！');
                            window.location.reload();
                        }else{
                            message.error('删除失败！');
                        }
                    });
                },
                onCancel() {}
            });

        }else{
            message.warning('您不能删除该组织！');
        }

    }
    handleSubmit(e){
        e.preventDefault();
        if(this.state.opttype === 'query'){
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    if(values.id === ''){
                        message.warning('请选择左侧组织！');
                    }else{
                        this.updateAlumniById(values);
                    }
                    console.log('Received values of form: ', values);
                }
            });
        }else if(this.state.opttype === 'add'){
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    this.addAlumni(values);
                    console.log('Received values of form: ', values);
                }
            });
        }

    }
    renderTreeNodes = data =>
        data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} {...item} dataRef={item} />;
        });
    onTreeNodeClick(keys, event){
        console.log(keys, event)
        // let cn = event.node;
        // cn.props.dataRef.title = cn.props.dataRef.title+'*'
        this.props.form.resetFields(); 
        this.setState({
            opttype:'query',
            orgtitle:'组织信息',
            curNode:event
        },()=>{
            this.getOrgById(keys);
        });
       
    }
    addOrg(){
        this.setState({
            orgtitle:'新增组织',
            partentId:this.state.id,
            id:'',
            name:'',
            description:'',
            school_id:'1',
            organization:'',
            leader_desc:'',
            tel:'',
            type:'1',
            update_time:'',
            opttype:'add'
        });
    }
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        const {schoollist, canDelete} = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 }
            }
        };
        let choolSelectOption = (
            schoollist.map((school,index)=>{
                return (<Option key={index} value={school.id+''}>{school.name}</Option>);
            })
        );

        return (
            <div>
                <BreadcrumbCustom first="校友管理" second="院系班级管理" />

                <Row gutter={16}>
                    <Col className="gutter-row" span={8}>
                    院系班级组织：
                        <Tree style={{height:this.state.treeheight+'px',overflow: 'auto',backgroundColor:'#fff'}} onSelect={this.onTreeNodeClick.bind(this)} loadData={this.onLoadData.bind(this)}>{this.renderTreeNodes(this.state.treeData)}</Tree>
                    </Col>

                    <Col className="gutter-row" span={16} >
                        {this.state.orgtitle}：
                        <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
                            <Form.Item label="ID">
                                {getFieldDecorator('id', {
                                    rules: [
                                        {
                                            required: false,
                                            message: 'id不能唯空'
                                        }
                                    ],
                                    initialValue:this.state.id
                                })(<Input disabled />)}
                            </Form.Item>
                            <Form.Item label="上级组织">
                                {getFieldDecorator('partentId', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '上级组织不能为空！'
                                        }
                                    ],
                                    initialValue:this.state.partentId
                                })(<Input disabled />)}
                            </Form.Item>
                            <Form.Item label="名称">
                                {getFieldDecorator('name', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入名称！'
                                        }
                                    ],
                                    initialValue:this.state.name
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="简介">
                                {getFieldDecorator('description', {
                                    rules: [
                                        {
                                            required: false,
                                            message: '请输入简介！'
                                        }
                                    ],
                                    initialValue:this.state.description
                                })(<TextArea autoSize={true}/>)}
                            </Form.Item>
                            <Form.Item label="学校">
                                {getFieldDecorator('school_id', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择学校！'
                                        }
                                    ],
                                    initialValue:this.state.school_id+''
                                })(
                                    <Select  >
                                        {choolSelectOption}
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item label="组织结构">
                                {getFieldDecorator('organization', {
                                    rules: [
                                        {
                                            required: false,
                                            message: ''
                                        }
                                    ],
                                    initialValue:this.state.organization
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="领导简介">
                                {getFieldDecorator('leader_desc', {
                                    rules: [
                                        {
                                            required: false,
                                            message: ''
                                        }
                                    ],
                                    initialValue:this.state.leader_desc
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="联系电话">
                                {getFieldDecorator('tel', {
                                    rules: [
                                        {
                                            required: false,
                                            message: ''
                                        }
                                    ],
                                    initialValue:this.state.tel
                                })(<Input />)}
                            </Form.Item>


                            <Form.Item label="类型">
                                {getFieldDecorator('type', {
                                    rules: [
                                        {

                                            message: 'The input is not valid E-mail!'
                                        },
                                        {
                                            required: false,
                                            message: ''
                                        }
                                    ],
                                    initialValue:this.state.type+''
                                })(
                                    <Select  >
                                        <Option value='1'>学校组织</Option>
                                        {/* <Option value='2'>校友会</Option> */}
                                        {/* <Option value='3'>协会</Option> */}
                                    </Select>)}
                            </Form.Item>
                            {/* <Form.Item label="状态">
                                {getFieldDecorator('status', {
                                    rules: [
                                        {
                                            required: false,
                                            message: ''
                                        }
                                    ],
                                    initialValue:this.state.tel
                                })(<Switch checkedChildren="开启" unCheckedChildren="禁用" defaultChecked />)}
                            </Form.Item> */}
                            <Form.Item label="更新时间">
                                {getFieldDecorator('update_time', {
                                    rules: [

                                        {
                                            required: false,
                                            message: ''
                                        }

                                    ],
                                    initialValue:this.state.update_time
                                })(<Input disabled/>)}
                            </Form.Item>
                            <Form.Item style={{textAlign:'center'}}>
                                <Button type="primary" htmlType="submit" disabled={this.hasErrors(getFieldsError())}>
                                         保存
                                </Button>
                                <Button type="primary" onClick={this.addOrg.bind(this)} >
                                         新增下级组织
                                </Button>
                                <Button type="danger" onClick={this.delOrg.bind(this)} disabled={!canDelete}>
                                         删除
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>

            </div>
        );
    }
}

export default Form.create()(ClassOrg);
