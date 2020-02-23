
import React, { Component } from 'react';
import { Row, Col, Table } from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import Header from './../layout/Header';
import {getAlumniAuditList} from './../../axios';

class RealNameAuthentication extends Component {
    constructor(props){
        super(props);
        this.state={
            loading:false,
            dataList:[]
        };
    }
    componentDidMount(){
        this.getList();
    }
    getList(){
        let params = {

            'auditStatus':0,
            'orderField': '',
            'orderType': '',
            'page': 1,
            'size': 10


        };
        getAlumniAuditList(params).then(res=>{
            if(res.success){
                if(res.data){
                    this.setState({
                        dataList:res.data.items
                    });
                }

            }
        });
    }
    render() {
        let columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
                render: (text) => <a>{text}</a>
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                render: (text) => <a>{text}</a>
            },
            {
                title: '院系专业',
                dataIndex: 'facultyName',
                key: 'facultyName',
                render: (text) => <a>{text}</a>
            }
        ];
        return (
            <div>
                <BreadcrumbCustom first="校友管理" second="注册/审核" />
                <Row gutter={16} style={{backgroundColor:'#fff'}}>
                    <Col className="gutter-row" md={24}>
                        <Header title="ww"/>
                    </Col>
                </Row>
                <Row gutter={16} style={{backgroundColor:'#fff'}}>
                    <Col className="gutter-row" md={24}>
                        搜索
                    </Col>
                </Row>
                <Row gutter={16} style={{backgroundColor:'#fff'}}>
                    <Col className="gutter-row" md={24}>
                        <Table dataSource={this.state.dataList} columns={columns} />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default RealNameAuthentication;
