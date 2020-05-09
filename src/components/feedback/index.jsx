import React from 'react';
import { Card, Col, Row, Button, Modal, Input, Table, message, Select } from 'antd';
import { withRouter } from 'react-router-dom';
import Header from './../layout/Header';
import { getFeedBackList, setFeedBackOk, delArticleList, editArticleList, pubArticleByid, retArticleByid } from '@/axios';
import { tableData, initParams, arr } from './serve';
import './index.less';
import 'react-quill/dist/quill.snow.css'; // ES6
const { Option } = Select;
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
        let { xAxisData } = this.state;
        xAxisData.push(this.option());
        this.setState({ xAxisData });
        this.getFeedBackList(1)
    }

    pageChange = (page) => {
        this.setState({page});
        this.getFeedBackList();
    }

    getFeedBackList() {
        let {param, page} = this.state;
        param['page'] = page;
        getFeedBackList(param).then(res => {
            if (res) {
                this.setState({ dataSource: [...res.data.items], total: res.data.totalCount, loading: false });
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
    option() {
        return {
            title: '操作',
            dataIndex: 'id',
            width: '15%',
            render: (id, row) => {
                return (<div className="option">
                    {/* <Button size="small" onClick={()=>this.editWay('编辑',row)} type="primary">编辑</Button> */}
                    {!row.status ? <Button size="small" disabled={true} onClick={() => this.publish(id, row)} type="default">已处理</Button> : <Button size="small" onClick={() => this.retract(id, row)} type="primary">处理</Button>}
                </div>);
            }
        };
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

