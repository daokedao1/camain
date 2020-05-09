import React from 'react';
import { Transfer, Pagination, message } from 'antd';
import { uniqBy, filter, remove, debounce } from 'lodash';
import { getRoleAssociateUsers, getCaUserList, roleAssociateUsers } from './../../axios'

class TableTransferWithSwitch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            targetKeys: [],
            dataSource: [],
            showSearch: true,
            associateUsers: [],
            page: 1,
            keyword: '',
        };
    }

    componentDidMount() {
        let { params } = this.props;
        this.getRoleAssociateUsers(params);
        this.getCaUserList(params);
    }

    componentWillUnmount() {
        this.setState({
            targetKeys: [],
            dataSource: [],
            showSearch: true,
            associateUsers: [],
            page: 1,
        })
    }

    getRoleAssociateUsers(params) {
        if (!params || !params.id) return;
        getRoleAssociateUsers(params.id).then(res => {
            if (res.success) {
                let { dataSource } = this.state;
                let combineDataSource = [...res.data, ...dataSource];
                dataSource = uniqBy(combineDataSource, 'id');
                let targetKeys = _.map(res.data, 'id');
                this.setState({
                    associateUsers: res.data,
                    dataSource,
                    targetKeys
                });
            }
        })
    }

    getCaUserList(pageObj = {}) {
        let {keyword} = this.state;
        let param = {
            'orderField': '',
            'orderType': '',
            'page': pageObj.page || 1,
            'size': 20,
            keyword,
            'yn': 1
        };

        getCaUserList(param).then(res => {
            let { associateUsers } = this.state;
            if (res.success) {
                let combineDataSource = [...associateUsers, ...res.data.items];
                let dataSource = uniqBy(combineDataSource, 'id');
                this.setState({
                    dataSource,
                    total: res.data.totalCount
                });
            }
        });
    }

    onPageChange = (page) => {
        this.getCaUserList({ page });
    }

    onChange = nextTargetKeys => {
        this.setState({ targetKeys: nextTargetKeys });
    };

    handleChange = (targetKeys, direction, moveKeys) => {
        let { dataSource, associateUsers } = this.state;
        let { params } = this.props;
        if (direction === 'right') {
            associateUsers = filter(dataSource, item => targetKeys.indexOf(item.id) !== -1);
        } else {
            associateUsers = remove(associateUsers, item => moveKeys.indexOf(item.id) !== -1);
        }
        params['associateUserKeys'] = targetKeys;
        this.setState({ targetKeys, associateUsers });
    }

    renderFooter = (props) => {
        let { direction } = props;
        if (direction === 'left') {
            return (<Pagination total={this.state.total} size="small" onChange={this.onPageChange} />)
        }
    }

    search = (dir, keyword) => {
        if(dir === 'left') {
            this.setState({keyword});
            this.getCaUserList();
        }
    }

    render() {
        const { targetKeys, dataSource } = this.state;
        return (
            <Transfer
                dataSource={dataSource}
                rowKey={record => record.id}
                showSearch
                titles={['未关联用户', '已关联用户']}
                listStyle={{
                    width: 300,
                    height: 500,
                }}
                operations={['添加', '删除']}
                targetKeys={targetKeys}
                onChange={this.handleChange}
                filterOption={(inputValue, item) =>
                    item.name.indexOf(inputValue) !== -1 || (item.alumniName && item.alumniName.indexOf(inputValue) !== -1)
                }
                style={{}}
                onSearch={debounce(this.search, 500)}
                render={item => `${item.name}${item.alumniName ? `-${item.alumniName}` : ''}${item.className ? `-${item.className}` : ''}`}
                footer={this.renderFooter}
            />
        );
    }
}

export default TableTransferWithSwitch;