
import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom';
import SearchList from './searchList'
import '../../style/waterData/alertSet.less'
import { Table, Input, InputNumber, Popconfirm, Form,Select } from 'antd';
import {setCookie,getCookie} from './../../utils/index'
import Storage from './../../utils/localStorage'
import { createStore } from 'redux';
import {reducer} from '../../redux/reducers'
import Cookies from 'js-cookie'
import {GET,POST} from '../../axios/tools'

const { Option } = Select;
// const data = [];
const sel=(state = 0, record)=>{
   return(<Select defaultValue={state+''} style={{ width: 90 }} >
      <Option value="1">开启</Option>
      <Option value="0">关闭</Option>
  </Select>);
}



const EditableContext = React.createContext();
const store = createStore(reducer);
class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
  }
}

class AlertSetCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
       editingKey: '',
       dataList:this.props.item.arr
    }

    this.columns = [
      {
        title: '模拟量名称',
        dataIndex: 'name',
        width: '25%',
        editable: false,
      },
      {
        title: '报警设置',
        dataIndex: 'age',
        width: '15%',
        editable: true,
      },
      {
        title: '状态(0关闭 1开启)',
        dataIndex: 'state',
        width: '20%',
        editable: true,
        render: sel
      },
      {
        title: '单位',
        dataIndex: 'ut',
        width: '20%',
        editable: false,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}
                  >
                    保存
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="确定取消吗?" onConfirm={() => this.cancel(record.key)}>
                <a>取消</a>
              </Popconfirm>
            </span>
          ) : (
            <a style={{color:'#1890ff'}} disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
              编辑
            </a>
          );
        },
      },
    ];
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };
  handleChange(value) {
    console.log(`selected ${value}`);
  }
  save(form, key) {
  let  that=this;
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      let newData= this.props.dataList;
      newData[this.props.id].arr[key-1].age = row.age;
      newData[this.props.id].arr[key-1].state = row.state;
      POST('/api/alarmsetting/update',{config:newData},{},1).then((res)=>{
      })
      // localStorage.setItem('allData',JSON.stringify(newData))
      this.setState({
         editingKey: '' ,
         dataList:newData[this.props.id].arr
       });
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (

      <EditableContext.Provider value={this.props.form}>
            <div className="box">
              <h2>{this.props.title}</h2>
                  <Table
                  components={components}
                  bordered
                  dataSource={this.state.dataList}
                  columns={columns}
                  rowClassName="editable-row"
                  size="small"
                  pagination={false} //禁用分页
                />
            </div>

      </EditableContext.Provider>
    );
  }
}

export default Form.create()(AlertSetCard);
