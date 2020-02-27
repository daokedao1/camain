import React, { Component } from 'react';
import { Tree,Row, Button,Divider,Table,Col,Input,Select,message} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import {getAlumniOrg,getAlumniById,getCaUserList} from './../../axios';

const { Option } = Select;
const { TreeNode } = Tree;
const { TextArea } = Input;

import './index.less';
class AlumniUser extends Component {
    constructor(props){
        super(props);
        this.state={

            treeheight:window.innerHeight-150,
            loading:false,
            page:1,
            pageSize:10,
            total:0,
            dataList:[],
            treeData:[
                { title: '院系组织', key: 1 }
            ]
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
        this.getUserList();
    }
    componentDidUpdate(){
        if(this.state.loading){
            this.getUserList();
        }
    }
    getUserList(){
        let param ={
            'orderField': '',
            'orderType': '',
            'page': this.state.page,
            'size': this.state.pageSize,
            'yn': 1
        };
        getCaUserList(param).then(res=>{
            if(res.success){
                this.setState({
                    dataList:res.data.items,
                    total:res.data.totalCount,
                    loading:false
                });
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
        this.getOrgById(keys);
    }
    onPageChange(page, pageSize){
        console.log(page, pageSize);
        this.setState({
            page:page,
            pageSize:pageSize,
            loading:true
        });
    }
    onDetailClick(reecord){

    }
    render() {
        let columns = [
            {
                title: '序号',
                dataIndex: 'id',
                key: 'id',
                render: text => <a>{text}</a>
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                render: text => <a>{text}</a>
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                render: text => <a>{text===1?'男':'女'}</a>
            },
            {
                title: '专业',
                dataIndex: 'facultyName',
                key: 'facultyName',
                render: text => <a>{text}</a>
            },
            {
                title: '在校时间',
                dataIndex: 'acceptAnceDate',
                key: 'acceptAnceDate',
                render: (text,reecord) => <a>{text+'~'+reecord.graduateDate}</a>
            },
            {
                title: '所在公司',
                dataIndex: 'workUnit',
                key: 'workUnit',
                render: (text,reecord) => <a>{(text||'')+'-'+(reecord.duty||'')}</a>
            },
            {
                title: '操作',
                dataIndex: 'detail',
                key: 'detail',
                render: (text,reecord) => <a onClick={this.onDetailClick.bind(this,reecord)} >详情>></a>
            }
        ];
        return (
            <div>
                <BreadcrumbCustom first="校友管理" second="校友管理" />
                <Row gutter={16}>
                    <Col className="gutter-row" span={5}>
                    院系班级组织：
                        <Tree style={{height:this.state.treeheight+'px',overflow: 'auto',backgroundColor:'#fff'}} onSelect={this.onTreeNodeClick.bind(this)} loadData={this.onLoadData.bind(this)}>{this.renderTreeNodes(this.state.treeData)}</Tree>
                    </Col>

                    <Col className="gutter-row" span={19} >
                        用户列表：
                        <Table
                            style={{backgroundColor:'#fff'}}
                            pagination={{total:this.state.total,page:this.state.page,pageSize:this.state.pageSize,onChange:this.onPageChange.bind(this)}}
                            columns={columns}
                            dataSource={this.state.dataList}
                            rowKey={'id'}
                            loading={this.state.loading}
                        />
                    </Col>
                </Row>

            </div>
        );
    }
}

export default AlumniUser;
