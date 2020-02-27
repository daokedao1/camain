
import React, { Component } from 'react';
import { Row,Col,Form,Tabs,message,Divider,Table,Input} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import {getArticleList} from './../../axios';
import Header from './../layout/Header';

const { TabPane } = Tabs;
const ArticleTypeMapping = {
    1:'公告',
    2:'新闻'
};
class Notice extends Component {
    constructor(props){
        super(props);
        this.state={
            loading:false,
            dataList:[],
            total:0,
            page:1,
            pageSize:10,
            ispublish:''
        };
    }
    componentDidMount(){
        this.getArticleList();
    }
    componentDidUpdate(){
        if(this.state.loading){
            this.getArticleList();
        }
    }
    componentWillMount(){
        window.onresize = () => {
            this.getClientWidth();
        };
    }
    getArticleList(){
        let params = {

            'orderField': '',
            'orderType': '',
            'page': 1,
            'size': 10,
            'type': 1
        };
        if(this.state.ispublish !== ''){
            params['isPublish'] = this.state.ispublish;
        }
        getArticleList(params).then(res=>{
            if(res.success){
                if(res.data){
                    this.setState({
                        dataList:res.data.items,
                        total:res.data.totalCount,
                        loading:false
                    });
                }

            }
        });
    }
    onPageChange(page, pageSize){
        console.log(page, pageSize);
        this.setState({
            page:page,
            pageSize:pageSize,
            loading:true
        });
    }
    getClientWidth(){
        this.setState({
            treeheight:window.innerHeight-150
        });
    }

    ontabChange(key){
        console.log(key);
        this.setState({
            ispublish:key,
            loading:true
        });
    }
    render() {
        let columns = [
            {
                title: '文章ID',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '标题',
                dataIndex: 'title',
                key: 'title'
            },
            {
                title: '类型',
                dataIndex: 'type',
                key: 'type',
                render:e=>ArticleTypeMapping[e]
            },
            {
                title: '发布状态',
                dataIndex: 'isPublish',
                key: 'isPublish',
                render:e=>e===true?'发布':'未发布'
            },
            {
                title: '发布人',
                dataIndex: 'publisher',
                key: 'publisher'
            },
            {
                title: '发布时间',
                dataIndex: 'publishTime',
                key: 'publishTime'
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a>编辑 </a>
                        <Divider type="vertical" />
                        <a>下线</a>
                    </span>
                )
            }

        ];

        return (
            <div>
                <BreadcrumbCustom first="运营管理" second="公告管理" />
                <Header title="公告管理"/>
                <div className="common-card-content">
                    <Row gutter={16} style={{padding:'20px'}}>
                        <Col className="gutter-row" md={24}>
                            2
                        </Col>
                    </Row>
                    <Tabs defaultActiveKey="" onChange={this.ontabChange.bind(this)}>

                        <TabPane tab="全部" key="">
                            <Table
                                style={{backgroundColor:'#fff'}}
                                pagination={{total:this.state.total,page:this.state.page,pageSize:this.state.pageSize,onChange:this.onPageChange.bind(this)}}
                                columns={columns}
                                dataSource={this.state.dataList}
                                rowKey={'id'}
                                loading={this.state.loading}
                            />
                        </TabPane>
                        <TabPane tab="发布" key="true">
                            <Table
                                style={{backgroundColor:'#fff'}}
                                pagination={{total:this.state.total,page:this.state.page,pageSize:this.state.pageSize,onChange:this.onPageChange.bind(this)}}
                                columns={columns}
                                dataSource={this.state.dataList}
                                rowKey={'id'}
                                loading={this.state.loading}
                            />
                        </TabPane>
                        <TabPane tab="未发布" key="false">
                            <Table
                                style={{backgroundColor:'#fff'}}
                                pagination={{total:this.state.total,page:this.state.page,pageSize:this.state.pageSize,onChange:this.onPageChange.bind(this)}}
                                columns={columns}
                                dataSource={this.state.dataList}
                                rowKey={'id'}
                                loading={this.state.loading}
                            />
                        </TabPane>
                    </Tabs>
                </div>

            </div>
        );
    }
}

export default Form.create()(Notice);
