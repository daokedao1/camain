
import React, { Component } from 'react';
import { Tree,Row, Button,Modal,Col,Form,Input,Select,message} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import {getAlumniOrg,getSchoolList,delAlumniById,getAlumniById,updateAlumniById,addAlumni} from './../../axios';

const { confirm } = Modal;
const { Option } = Select;
const { TreeNode } = Tree;
const { TextArea } = Input;

import './index.less';
class AlumniOrg extends Component {
    constructor(props){
        super(props);
        this.state={
            orgtitle:'组织信息',
            treeheight:window.innerHeight-150,
            loading:false,
            opttype:'query',//add
            partentId:'0',
            schoollist:[],
            curNode: null,
            treeData:[
                { title: '校友会', key: 2 }
            ],
            id:'',
            name:'',
            description:'',
            school_id:'',
            organization:'',
            leader_desc:'',
            tel:'',
            type:'',
            update_time:'',
            action: 'normal'
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
        addAlumni(param).then(res=>{
            if(res.success){
                message.success('保存成功！');
                _this.props.form.resetFields(); 
                window.location.reload();
            }else{
                console.log(res);
                message.warning(res.message);
            }
        });
    }
    updateAlumniById(param){
        updateAlumniById(param).then(res=>{
            if(res.success){
                message.success('保存成功！');
            }else{
                console.log(res);
                message.warning(res.message);
            }
        });
    }
    getOrgById(id){
        let param = {
            id:id
        };
        getAlumniById(param).then(res=>{
            if(res.success){
                let orginfo = res.data;
                this.setState({
                    id:orginfo.id,
                    name:orginfo.name,
                    description:orginfo.description,
                    school_id:orginfo.school_id||'1',
                    organization:orginfo.organization,
                    leader_desc:orginfo.leader_desc,
                    tel:orginfo.tel,
                    type:orginfo.type||'2',
                    update_time:orginfo.update_time,
                    partentId:orginfo.partentId

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
                'size': 100
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
                        {this.renderTreeNodes(item.children)}̀
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} {...item} dataRef={item} />;
        });
    onTreeNodeClick(keys, event){
        console.log(keys, event);
        this.props.form.resetFields(); 
        if(!keys || !keys.length) {
            this.setState({
                orgtitle:'请先在左侧选择校友会',
                curNode: null,
                partentId: '',
                id:'',
                name:'',
                description:'',
                school_id:'',
                organization:'',
                leader_desc:'',
                tel:'',
                type:'',
                update_time:'',
                opttype:'query'
            });
            return;
        }else {
            this.setState({
                curNode: event.node
            });
        }
        this.getOrgById(keys[0]);
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
            type:'2',
            update_time:'',
            opttype:'add'
        });
    }

    cancelAdd() {
        let {partentId} = this.state;
        this.setState({
            opttype:'query'
        });
        this.getOrgById(partentId)
    }

    delOrg(){
        let targetID = this.state.id;
        let _this = this;
        if(targetID > 3){
            confirm({
                title: `您确认删除 ${this.state.name} 组织吗？?`,
                content: '',
                onOk() {
                    delAlumniById({id:targetID}).then(res=>{
                        console.log(res);

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
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        const {schoollist, curNode, opttype} = this.state;
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

        let buttons;
        switch (opttype) {
            case 'query':
                buttons = (
                   <span style={{marginLeft: '10px'}}>
                        <Button type="primary" disabled={!curNode} onClick={this.addOrg.bind(this)} >
                                新增下级组织
                        </Button>
                        <Button type="danger" disabled={!curNode} onClick={this.delOrg.bind(this)} >
                                删除
                        </Button>
                    </span>)
                break;
            case 'add':
                buttons = (
                    <Button type="primary" disabled={!curNode} onClick={this.cancelAdd.bind(this)} >
                        取消
                    </Button>)
                break;

        }

        return (
            <div>
                <BreadcrumbCustom first="校友管理" second="校友会管理" />

                <Row gutter={16}>
                    <Col className="gutter-row" span={8}>
                    校友会结构：（请现在左侧选择具体的校友会，再进行操作！）
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
                            <Form.Item label="校友会名称">
                                {getFieldDecorator('name', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入校友会名称！'
                                        }
                                    ],
                                    initialValue:this.state.name
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="简介">
                                {getFieldDecorator('description', {
                                    rules: [
                                        {
                                            max: 800,
                                            message: '简介不能超过800字'
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
                                    rules: [],
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
                                            required: false,
                                            message: ''
                                        }
                                    ],
                                    initialValue:this.state.type+''
                                })(
                                    <Select  >
                                        {/* <Option value='1'>学校组织</Option> */}
                                        <Option value='2'>校友会</Option>
                                        {/* <Option value='3'>协会</Option> */}
                                    </Select>)}
                            </Form.Item>
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
                                <Button type="primary" htmlType="submit" disabled={this.hasErrors(getFieldsError()) || !curNode}>
                                         保存
                                </Button>
                                {buttons}
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>

            </div>
        );
    }
}

export default Form.create()(AlumniOrg);
