import React from 'react';
import {Table,Input, Button, Icon} from 'antd';
import Highlighter from 'react-highlight-words';

import {type, id} from '../../utils/index';
/*
  栗子：
  const yAxisData = [
            {
                dataTime: '20191001',
                D0: '100%',
                D1: '100%',
                D2: '100%',
                D3: '100%',
                D4: '100%',
                D5: '100%',
                D6: '100%',
                D7: '100%',
                D14: '100%',
                D21: '100%',
                D30: '100%'
            }
        ];
    const xAxisData=['D0','D1','D2','D3','D4','D5','D6','D7','D14','D21','D30'];

*/
class VisitDate extends React.Component {
    constructor(props) {
        super(props);
        this.id = id(9);
        this.state = {
            loading: true,
            xAxisData: [
            ],
            yAxisData: [],
            legend: [],
            scrollW: 0,
            searchText: '',
            searchedColumn: ''
        };
    }
    componentDidMount() {
        this.props.xAxisData ? this.init(this.props.xAxisData, this.props.yAxisData) : console.log('没有找到xAxisData这个参数');
    }
    componentWillReceiveProps(nextProps) {
        nextProps.xAxisData && nextProps.xAxisData.length > 0 ? this.init(nextProps.xAxisData) : console.log('没有找到xAxisData这个参数');
    }
    init(data, yData) {
        const box = document.getElementById(this.id);
        const boxWh = box.parentElement.offsetWidth;
        const rowWh = boxWh / data.length;
        let scrollW = 0;
        const arr = [];
        if (type(data) === 'Array') {
            for (const item of data) {
                if (type(item) === 'Object') {
                    const obj = {
                        align: 'center',
                        key: item.dataIndex,
                        ...this.getColumnSearchProps(item.dataIndex),
                        ...item
                    };
                    if (item.children) {
                        obj.width = item.children.length * item.children[0].width;
                    }
                    arr.push(obj);
                    scrollW += obj.width;
                } else {
                    arr.push({
                        title: item,
                        width: rowWh,
                        key: item,
                        align: 'center',
                        dataIndex: item
                    });

                    scrollW += rowWh;
                }
            }
        }
        if (boxWh > scrollW||boxWh===0) {
            box.style.width = `${10 + scrollW}px`;
        } else {
            box.style.width = '100%';
        }
        this.setState({xAxisData: arr, yAxisData: yData, scrollW,loading:false});
    }
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    // onChange={e => this.handleSearch(selectedKeys, confirm, dataIndex,setSelectedKeys,(e.target.value ? [e.target.value] : []))}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
              Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            (this.state.searchedColumn === dataIndex) ?
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
                : text
        )
    });

      handleSearch = (selectedKeys, confirm, dataIndex,setSelectedKeys,key) => {
          //   console.log(setSelectedKeys);
          //   setSelectedKeys(key);
          confirm();
          this.setState({
              searchText: selectedKeys[0],
              searchedColumn: dataIndex
          });
      };

      handleReset = clearFilters => {
          clearFilters();
          this.setState({ searchText: '' });
      };
      eventRow(record, index){
          console.log(record, index);
      }
      render() {
          //   const setPage={
          //       pageSize:100,
          //       total:this.props.total
          //       // onChange:(current,page)=>{this.props.setSize(current,page);}
          //   };
          return (
          // <div style={{width:this.wdLength+'px'}}>
              <div
                  id={this.id}
                  style={this.props.styleData ? this.props.styleData : {maxWidth: '100%'}}
              >
                  <Table
                      pagination={this.props.pagination?{total: this.props.total}:false}
                      bordered
                      size="small"
                      columns={this.state.xAxisData}
                      dataSource={this.state.yAxisData}
                      scroll={{x: this.state.scrollW}}
                      loading={this.props.loading}
                      onRow	={(v,i)=>{
                          return {
                              onDoubleClick:()=>{
                                  this.props.dbEdit&&this.props.dbEdit(v);
                              }
                          };
                      }}
                  />
              </div>
          // </div>

          );
      }
}

export default VisitDate;
