import React, { Component } from 'react';
import { Tree,Row, Button,Divider,Table,Col,Input,Select,message,Modal} from 'antd';
import InputForm from '@/components/input';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import {getAlumniOrg,getCaUserList} from './../../axios';
import Header from './../layout/Header';
import {tableData,initParams,arr} from './serve';

const { Option } = Select;
const { TreeNode } = Tree;
const { TextArea } = Input;

import './index.less';
class AlumniUser extends Component {
    constructor(props){
        super(props);
        this.state={
            operationName:'详情',
            treeheight:window.innerHeight-150,
            loading:false,
            visible:false,
            page:1,
            pageSize:10,
            params:{
                title:'',
                subTitle:'',
                publishTime:'',
                creator:'',
                isPublish:false,
                content:'',
                type:1
            },
            total:0,
            nodePos:'0-0',
            curSelectedOrgid:1,
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
        let {nodePos,curSelectedOrgid} = this.state;
        console.log(curSelectedOrgid);
        console.log(nodePos);
        nodePos = nodePos.split('-');
        switch(nodePos.length) {
        case 2:
            console.log('组织');

            break;
        case 3:
            console.log('学院');
            param.collegeId = curSelectedOrgid;
            break;
        case 4:
            console.log('专业');
            param.facultyId = curSelectedOrgid;
            break;
        case 5:
            console.log('班级');
            param.classId = curSelectedOrgid;
            break;
        default:

        }
        getCaUserList(param).then(res=>{
            if(res.success){
                this.setState({
                    dataList:res.data.items,
                    total:res.data.totalCount,
                    page:1,
                    pageSize:10,

                    loading:false
                });
            }
        });
    }


    getOrgById(id,nodeEvent){
        let nodePos = nodeEvent.node.props.pos;

        this.setState({
            nodePos:nodePos,
            curSelectedOrgid:id[0],
            loading:true
        });



    }

    onLoadData = treeNode =>{
        console.log(treeNode);
        return new Promise(resolve => {
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
        console.log(keys, event);
        this.getOrgById(keys,event);
    }
    onPageChange(page, pageSize){
        console.log(page, pageSize);
        this.setState({
            page:page,
            pageSize:pageSize,
            loading:true
        });
    }
    async  onDetailClick(title,row){
        let param={...row};
        this.setState({
            visible:true,
            operationName:title,
            params:param
        });

    }
    handleCancel(){
        this.setState({visible:false});
    }
    async handleOk(){
        const {params,operationName}=this.state;
        let data={...params};
        if(operationName==='新建'){
            await addArticleList(data);
        }else{
            await editArticleList(data);
        }

        this.setState({visible:false},()=>{
            this.init();
        });
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
                render: text => <a>{text===0?'男':'女'}</a>
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
                render: (text,row) => <a  onClick={()=>this.onDetailClick('详情',row)} >详情>></a>
            }
        ];
        const {operationName,visible,params}=this.state;
        return (
            <div>

                <Header title="校友管理"/>
                <Row gutter={16} style={{backgroundColor:'#fff',padding:'20px 40px'}}>
                    <Col className="gutter-row" span={5}>
                        <Tree style={{height:this.state.treeheight+'px',overflow: 'auto',backgroundColor:'#fff'}} onSelect={this.onTreeNodeClick.bind(this)} loadData={this.onLoadData.bind(this)}>{this.renderTreeNodes(this.state.treeData)}</Tree>
                    </Col>

                    <Col className="gutter-row" span={19} >

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
                <Modal
                    title={operationName}
                    visible={visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    footer={''}
                    okButtonProps={{ disabled: true }}
                    cancelButtonProps={{ disabled: true }}
                    // searchData={searchData}
                    className="alum"

                >
                    <div className="delayedSwitch" >
                        <p style={{width:'33.33%',color:' #000'}}>
                                头像:
                        </p>
                        <img  src={params.photoImg} alt=""/>

                    </div>
                    <InputForm

                        styleCss={{height:'600px',overflowY: 'auto'}}   params={params} arr={arr}></InputForm>



                </Modal>
            </div>
        );
    }
}

export default AlumniUser;
