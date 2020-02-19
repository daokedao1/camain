
import React, { Component } from 'react';
import { Tree,Row, Col,Form,Input} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import {getAlumniOrg} from './../../axios';
const { TreeNode } = Tree;
import './index.less';
class AlumniOrg extends Component {
    constructor(props){
        super(props);
        this.state={
            loading:false,
            partentId:2,
            treeData:[
                { title: '校友会', key: 2 }
            ]
        };
    }
    componentDidMount(){
        this.getOrgData();
    }
    getOrgData(){
        let {partentId} = this.state;
        let param = {
            'orderField': '',
            'orderType': '',
            'page': 1,
            'partentId': '2',
            'size': 1000
        };
        getAlumniOrg(param).then(res=>{
            // if(res.success){

            // }else{
            //     console.log(res);

            // }
        });
        // this.setState({
        //     treeData:[


        //     ]
        // });
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
    handleSubmit(){

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
    render() {
        const { getFieldDecorator } = this.props.form;
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
        return (
            <div>
                <BreadcrumbCustom first="校友管理" second="校友管理" />
                校友会组织：
                <Row gutter={16}>
                    <Col className="gutter-row" span={6}>

                        <Tree loadData={this.onLoadData.bind(this)}>{this.renderTreeNodes(this.state.treeData)}</Tree>
                    </Col>

                    <Col className="gutter-row" span={18}>
                        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                            <Form.Item label="校友会名称">
                                {getFieldDecorator('email', {
                                    rules: [
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!'
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!'
                                        }
                                    ]
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="简介">
                                {getFieldDecorator('email', {
                                    rules: [
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!'
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!'
                                        }
                                    ]
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="E-mail">
                                {getFieldDecorator('email', {
                                    rules: [
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!'
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!'
                                        }
                                    ]
                                })(<Input />)}
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>

            </div>
        );
    }
}

export default Form.create()(AlumniOrg);
