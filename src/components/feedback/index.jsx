import React from 'react';
import { Card, Col, Row, Button, Modal, Input, Table, message, Select } from 'antd';
import { withRouter } from 'react-router-dom';
import Header from './../layout/Header';
import { getFeedBackList, setFeedBackOk, delArticleList, editArticleList, pubArticleByid, retArticleByid } from '@/axios';
import { tableData, initParams, arr } from './serve';
import './index.less';
import 'react-quill/dist/quill.snow.css'; // ES6
const { Option } = Select;
const handlerColumn =  {
    title: '处理人',
    dataIndex: 'handlerName',
    width: '10%'
};
class FeedBack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            total: 0,
            xAxisData: tableData,
            dataSource: [],
            visible: false,
            param: {
                userName: '',
                status: 1,
                size: 20
            },
            text: '',
            objData: {},
            loading: true
        };
    }
    componentDidMount() {
        this.getFeedBackList(1)
    }

    pageChange = (page) => {
        this.setState({page});
        this.getFeedBackList();
    }

    getFeedBackList() {
        let {param, page, xAxisData} = this.state;
        const index = xAxisData.findIndex( item => item.dataIndex === handlerColumn.dataIndex);
        if(param.status === 1) {
            if(index !== -1) {
                xAxisData.splice(index, 1);
            }
        }else {
            if(index === -1) {
                xAxisData.push(handlerColumn);
            }
        }
        
        param['page'] = page;
        getFeedBackList(param).then(res => {
            if (res) {
                this.setState({ dataSource: [...res.data.items], total: res.data.totalCount, loading: false, xAxisData});
            }
        });

    }

    IdChange = (e, type) => {
        let {param} = this.state;
        let value;
        
        if(type !== 'status') {
            value = e.target.value;
        }else {
            value = e;
        }

        param[type] = value;
        this.setState({param});
    }

    searchs() {
        this.getFeedBackList();
    }

    async confirm(id) {
        await delArticleList({ id: id });

        this.setState({ loading: true }, () => {
            this.init();
            message.success('删除成功');
        });
    }

    async publish(id, row) {
        // const res= await setFeedBackOk({id:id});
        // if(res.success){
        //     this.init();
        //     message.success('成功');
        // }

    }
    async retract(id, row) {
        const res = await setFeedBackOk({ id: id });
        if (res.success) {
            this.getFeedBackList();
            message.success('成功');
        }
    }

    render() {
        const { xAxisData, param } = this.state;
        return (
            <div className="content">
                <div>
                    <Header title="管理用户反馈" />
                    <Row gutter={16} style={{ backgroundColor: '#fff', padding: '20px 40px' }}>
                        <Col className="gutter-row" md={6}>
                            姓名：<Input value={param.userName} onChange={(e, v) => this.IdChange(e, 'userName')} placeholder="按姓名搜索" style={{ width: '180px' }} />
                        </Col>
                        <Col className="gutter-row" md={6}>
                            状态：<Select defaultValue={param.status} style={{ width: 180 }} onChange={(e) => this.IdChange(e, 'status')}>
                                    <Option value={1}>未处理</Option>
                                    <Option value={0}>已处理</Option>
                                </Select>
                        </Col>

                        <Col className="gutter-row" md={6}>
                            <Button onClick={this.searchs.bind(this)} type="primary">搜索</Button>
                        </Col>
                    </Row>
                    <Row >
                        <Col span={24}>
                            <Card bordered={false}>
                                <Table
                                    pagination={{ total: this.state.total, onChange: this.pageChange, pageSize: 20 }}
                                    columns={xAxisData}
                                    dataSource={this.state.dataSource}
                                    rowKey={record => record.id}
                                    loading={this.state.loading}
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default withRouter(FeedBack);

