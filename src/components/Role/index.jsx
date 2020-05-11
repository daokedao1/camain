import React from 'react';
import {Card, Col, Row, Button, Modal,Switch,Popconfirm,message, Tree, Transfer} from 'antd';
import {get} from 'lodash';
import { withRouter } from 'react-router-dom';
import ReactQuill from 'react-quill';
import ListTable from '@/components/table/List_table';
import InputForm from '@/components/input';
import TableTransferWithSwitch from '@/components/modal/roleAssociateUsers'
import {listRoleList,addtRoleList,delRoleList,editRoleList, roleAssociateUsers, getRoleAssociateMenus, roleAssociateMenus, treeMenuList} from '@/axios';
import {tableData,initParams,arr} from './serve';
import './index.less';
import 'react-quill/dist/quill.snow.css'; // ES6

const {TreeNode} = Tree;
class News extends React.Component {
    constructor(props){
        super(props);
        this.state={
            yAxisData:[],
            yArr:[],
            total:0,
            xAxisData:tableData,
            visible:false,
            associateVisible: false,
            operationName:'新建',
            params:{
                name:'',
                permission:'',
                dataScope:'',
                remark:''

            },
            associateMenu: {
                visible: false,
                dataSource: [],
                flattenDataSource: [],
                menuIdList: []
            },
            text: '',
            objData:{},
            loading:true
        };
    }
    componentDidMount(){
        const data={};
        this.init();
    }
    async searchWay(e,v){
        const { value } = e.target;

        const paramData={};
        for(let key in paramData){
            if(key===v){
                paramData[key]=value;
            }
        }
        this.init(paramData);
    }
    async init(){
        let yAxisData,
            arrTable=[...tableData];
        const res= await listRoleList({});
        const menusRes = await treeMenuList();
        const {associateMenu} = this.state;
        if(res && res.data){
            yAxisData=[...res.data];
            yAxisData=this.stateWay(yAxisData);
            const option=this.option();
            arrTable.push(option);
        }
        const menus = get(menusRes, 'data');
        if(menus) {
            const flattenDataSource = [];
            this.flatten([...menus], flattenDataSource)
            associateMenu.dataSource = [...menus];
            associateMenu.flattenDataSource = flattenDataSource;
        }
        this.setState({yAxisData:yAxisData,xAxisData:arrTable,loading:false, associateMenu});
    }
    stateWay(data){
        let obj=[...data];
        for(let v of data){
            for(let key in v){
                if(key==='state'){
                    if(v.state===0){
                        v.state='开';
                    }else{
                        v.state='关';
                    }
                }
            }
        }
        return obj;
    }
    async editWay(title,row){
        let params={...row};
        this.setState({
            visible:true,
            operationName:title,
            params
        });

    }

    async associateItem(title, row) {
        let params={...row};
        if(title === '关联用户') {
            this.setState({
                associateVisible:true,
                operationName:title,
                params
            });
        }else {
            const {associateMenu} = this.state;
            associateMenu.visible = true;
            const res = await getRoleAssociateMenus(params.id);
            if(res && res.data) {
                const menuIdList = res.data.map(item => item.id + '');
                associateMenu.menuIdList = menuIdList;
            }
            this.setState({
                associateMenu,
                operationName:title,
                params
            });
        }
    }

    async confirm(id) {
        await delRoleList({id:id});

        this.setState({loading:true},()=>{
            this.init();
            message.success('删除成功');
        });
    }
    switch(){
        const {params}=this.state;
        params.isPublish=!params.isPublish;
        this.setState({
            params:params
        });
    }
    handleChange(value) {
        const {params}=this.state;
        let text={...params};
        text.content=value;
        this.setState({ params: text });
    }
    option(){
        return    {
            title: '操作',
            dataIndex: 'id',
            width: '15%',
            render: (id,row) => {
                return (<div className="option">
                    <Button size="small" onClick={()=>this.editWay('编辑',row)} type="primary">编辑</Button>
                    <Button size="small" onClick={()=>this.associateItem('关联菜单',row)} type="primary">关联菜单</Button>
                    <Button size="small" onClick={()=>this.associateItem('关联用户',row)} type="primary">关联用户</Button>
                    <Popconfirm
                        title="确定要删除本条数据吗?"
                        onConfirm={()=>this.confirm(id)}
                        // onCancel={this.cancel}
                        okText="是"
                        cancelText="否"
                    >
                        <Button size="small" type="danger">删除</Button>
                    </Popconfirm>
                </div>);
            }
        };

    }
    indexWay(v){
        const {params}=this.state;
        if(params.field===''){
            return '';
        }else{
            // return paramsObj[v.val](params);
        }

    }

    handleCancel(){
        const {associateMenu} = this.state;
        associateMenu.visible = false;
        this.setState({visible:false, associateVisible: false, associateMenu});
    }
    async handleOk(e){
        const {params,operationName, associateMenu}=this.state;
        console.log(params);
        console.log('data:', e);
        let data={...params};
        switch(operationName) {
            case '新建':
                await addtRoleList(data);
                this.setState({visible:false},()=>{
                    this.init();
                });
                break;
            case '编辑':
                await editRoleList(data);
                this.setState({visible:false},()=>{
                    this.init();
                });
                break;
            case '关联用户':
                if (params.associateUserKeys) {
                    await roleAssociateUsers(data.id, params.associateUserKeys);
                }
                return this.setState({associateVisible: false});
                break;
            case '关联菜单':
                await roleAssociateMenus(data.id, associateMenu.menuIdList);
                associateMenu.visible = false;
                return this.setState({associateMenu});
                break;
        }
    }
    add(){
        let params={...initParams};
        this.setState({
            visible:true,
            operationName:'新建',
            params:params//初始化
        });
    }

    /**
     * 关联菜单相关
     */

    generateTree = (treeNodes = [], checkedKeys = []) => {
        return treeNodes.map((item) => (
          <TreeNode title={item.name} disabled={checkedKeys.includes(item.id)} key={item.id} isLeaf={!item.children} dataRef={item}>
            {item.children ? this.generateTree(item.children, checkedKeys): ''}
          </TreeNode>
        ));
    };

    isChecked = (selectedKeys, eventKey) => {
        // return false;
        // let key = Array.isArray(eventKey) ? eventKey[0] : eventKey;
        return selectedKeys.indexOf(eventKey) !== -1;
    };

    associateMenuChange = (targetKeys, direction, moveKeys) => {
        const {associateMenu} = this.state;
        associateMenu.menuIdList = targetKeys;
        this.setState({associateMenu});
    }

    flatten(list = [], flattenDataSource) {
        list.forEach(item => {
            item.id = item.id + '';
            flattenDataSource.push(item);
            this.flatten(item.children || [], flattenDataSource);
        });
    }

    render() {
        const {yAxisData,total,xAxisData,operationName,visible, associateVisible, loading,params}=this.state;
        return (
            <div  className="content">
                <div>
                    <Row >
                        <Col span={24}>
                            <Card title="角色管理" extra={<Button onClick={()=>this.add('新建')} type="primary">新建</Button>} bordered={false}>
                                <ListTable
                                    loading={loading}
                                    pagination={true}
                                    yAxisData={yAxisData}
                                    total={total}
                                    xAxisData={xAxisData}
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
                <Modal
                    title={operationName}
                    visible={visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    // searchData={searchData}
                >
                    <InputForm styleCss={{height:'100%'}}  indexWay={this.indexWay.bind(this)} params={params} arr={arr}></InputForm>


                </Modal>
                <Modal
                    title={operationName}
                    visible={associateVisible}
                    width={800}
                    destroyOnClose={true}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <TableTransferWithSwitch params={params}/>
                </Modal>

                <Modal
                    title={operationName}
                    visible={this.state.associateMenu.visible}
                    width={800}
                    destroyOnClose={true}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                     <Transfer
                        targetKeys={this.state.associateMenu.menuIdList}
                        dataSource={this.state.associateMenu.flattenDataSource}
                        className="tree-transfer"
                        rowKey={record => record.id} //唯一标示ant-design 默认取的key，这个地方调试了我几个小时，干！
                        render={item => item.name}
                        showSelectAll={false}
                        onChange={this.associateMenuChange}
                        >
                        {({ direction, onItemSelect, selectedKeys }) => {
                            if (direction === 'left') {
                            const checkedKeys = [...selectedKeys, ...this.state.associateMenu.menuIdList];
                            return (
                                <Tree
                                blockNode
                                checkable
                                checkStrictly
                                defaultExpandAll
                                class="tree-transfer-left"
                                checkedKeys={checkedKeys}
                                onCheck={(
                                    _,
                                    {
                                      node: {
                                        props: { eventKey },
                                      },
                                    },
                                  ) => {
                                    onItemSelect(eventKey, !this.isChecked(checkedKeys, eventKey));
                                  }}
                                  onSelect={(
                                    _,
                                    {
                                      node: {
                                        props: { eventKey },
                                      },
                                    },
                                  ) => {
                                    onItemSelect(eventKey, !this.isChecked(checkedKeys, eventKey));
                                  }}
                                >
                                {this.generateTree(this.state.associateMenu.dataSource, this.state.associateMenu.menuIdList)}
                                </Tree>
                            );
                            }
                        }}
                        </Transfer>
                </Modal>
            </div>
        );
    }
}

export default withRouter(News);

