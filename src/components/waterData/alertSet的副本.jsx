
import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom';
import SearchList from './searchList'
import '../../style/waterData/alertSet.less'
import { Table, Input, InputNumber, Popconfirm, Form,Select } from 'antd';
import {setCookie,getCookie} from './../../utils/index'
import { createStore } from 'redux';
import {reducer} from '../../redux/reducers'
import Cookies from 'js-cookie'
import localData from '../../utils/localStorage'
const { Option } = Select;
// const data = [];
const sel=(<Select defaultValue="开启" style={{ width: 90 }} >
    <Option value="开启">开启</Option>
    <Option value="关闭">关闭</Option>
</Select>);
// for (let i = 1; i < 9; i++) {
//   data.push({
//     key: i.toString(),
//     name: `泵头${i}#缸噪声`,
//     age: 13,
//     state: '',
//     util: `db`,
//   });
// }

const data=localData.get("allData");
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

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    let obj= Cookies.get('allData');
    
   let dataList =[
      {
        title:'1#注水泵',
        arr:[
        {
          name:"出口压力",
          key:"1",
          ut:'MPa',
          age0: 0,
          state: '',
          util: `db`,
          value:"EXPORT_PRESSURE",
      
        },
       {
         name:"进口压力",
         key:"2",
        ut:'MPa',
        age: 0,
        state: '',
        util: `db`,
        value:"EXPORT_PRESSURE",
      
      },
      {
       name:"电机温度",
       key:"3",
        ut:'℃',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_TEMPERATURE",
      
      },
      {
       name:"润滑油温度",
       key:"4",
        ut:'℃',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_TEMPERATURE",
      
      },
      {
       name:"润滑油液位",
       key:"5",
        ut:'CM',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_TEMPERATURE",
      
      },
      {
       name:"电机A相电流",
       key:"6",
        ut:'A',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_TEMPERATURE",
      
      },
      {
       name:"电机B相电流",
       key:"7",
        ut:'A', 
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_B_PHASE_CURRENT",
        
      
      },
      {
       name:"电机B相电流",
       key:"8",
        ut:'A',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_B_PHASE_CURRENT",
      
      },
      
      ],
      columns:[
        {
          title: '模拟量名称',
          dataIndex: 'name',
          width: '25%',
          editable: false,
        },
        {
          title: '报警设置',
          dataIndex: 'age0',
          width: '15%',
          editable: true,
        },
        {
          title: '状态',
          dataIndex: 'state',
          width: '20%',
          editable: false,
          render: ()=>sel
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
      ]
      },
      {
        title:'2#注水泵',
        arr:[
        {
          name:"出口压力",
          key:"1",
          ut:'MPa',
          age: 0,
          state: '',
          util: `db`,
          value:"EXPORT_PRESSURE",
      
        },
       {
         name:"进口压力",
         key:"2",
        ut:'MPa',
        age: 0,
        state: '',
        util: `db`,
        value:"EXPORT_PRESSURE",
      
      },
      {
       name:"电机温度",
       key:"3",
        ut:'℃',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_TEMPERATURE",
      
      },
      {
       name:"润滑油温度",
       key:"4",
        ut:'℃',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_TEMPERATURE",
      
      },
      {
       name:"润滑油液位",
       key:"5",
        ut:'CM',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_TEMPERATURE",
      
      },
      {
       name:"电机A相电流",
       key:"6",
        ut:'A',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_TEMPERATURE",
      
      },
      {
       name:"电机B相电流",
       key:"7",
        ut:'A', 
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_B_PHASE_CURRENT",
        
      
      },
      {
       name:"电机B相电流",
       key:"8",
        ut:'A',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_B_PHASE_CURRENT",
      
      },
      
        ],
        columns:[
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
            title: '状态',
            dataIndex: 'state',
            width: '20%',
            editable: false,
            render: ()=>sel
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
        ]
      },
      {
        title:'3#注水泵',
        arr:[
        {
          name:"出口压力",
          key:"1",
          ut:'MPa',
          age: 0,
          state: '',
          util: `db`,
          value:"EXPORT_PRESSURE",
      
        },
       {
         name:"进口压力",
         key:"2",
        ut:'MPa',
        age: 0,
        state: '',
        util: `db`,
        value:"EXPORT_PRESSURE",
      
      },
      {
       name:"电机温度",
       key:"3",
        ut:'℃',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_TEMPERATURE",
      
      },
      {
       name:"润滑油温度",
       key:"4",
        ut:'℃',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_TEMPERATURE",
      
      },
      {
       name:"润滑油液位",
       key:"5",
        ut:'CM',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_TEMPERATURE",
      
      },
      {
       name:"电机A相电流",
       key:"6",
        ut:'A',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_TEMPERATURE",
      
      },
      {
       name:"电机B相电流",
       key:"7",
        ut:'A', 
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_B_PHASE_CURRENT",
        
      
      },
      {
       name:"电机B相电流",
       key:"8",
        ut:'A',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_B_PHASE_CURRENT",
      
      },
      
      ],
      columns:[
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
          title: '状态',
          dataIndex: 'state',
          width: '20%',
          editable: false,
          render: ()=>sel
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
      ]
      },
      {
        title:'4#注水泵',
        arr:[
        {
          name:"出口压力",
          key:"1",
          ut:'MPa',
          age: 0,
          state: '',
          util: `db`,
          value:"EXPORT_PRESSURE",
      
        },
       {
         name:"进口压力",
         key:"2",
        ut:'MPa',
        age: 0,
        state: '',
        util: `db`,
        value:"EXPORT_PRESSURE",
      
      },
      {
       name:"电机温度",
       key:"3",
        ut:'℃',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_TEMPERATURE",
      
      },
      {
       name:"润滑油温度",
       key:"4",
        ut:'℃',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_TEMPERATURE",
      
      },
      {
       name:"润滑油液位",
       key:"5",
        ut:'CM',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_TEMPERATURE",
      
      },
      {
       name:"电机A相电流",
       key:"6",
        ut:'A',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_TEMPERATURE",
      
      },
      {
       name:"电机B相电流",
       key:"7",
        ut:'A', 
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_B_PHASE_CURRENT",
        
      
      },
      {
       name:"电机B相电流",
       key:"8",
        ut:'A',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_B_PHASE_CURRENT",
      
      },
      
      ],
      columns:[
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
          title: '状态',
          dataIndex: 'state',
          width: '20%',
          editable: false,
          render: ()=>sel
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
      ]
      },
      {
        title:'5#注水泵',
        arr:[
        {
          name:"出口压力",
          key:"1",
          ut:'MPa',
          age: 0,
          state: '',
          util: `db`,
          value:"EXPORT_PRESSURE",
      
        },
       {
         name:"进口压力",
         key:"2",
        ut:'MPa',
        age: 0,
        state: '',
        util: `db`,
        value:"EXPORT_PRESSURE",
      
      },
      {
       name:"电机温度",
       key:"3",
        ut:'℃',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_TEMPERATURE",
      
      },
      {
       name:"润滑油温度",
       key:"4",
        ut:'℃',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_TEMPERATURE",
      
      },
      {
       name:"润滑油液位",
       key:"5",
        ut:'CM',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_TEMPERATURE",
      
      },
      {
       name:"电机A相电流",
       key:"6",
        ut:'A',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_TEMPERATURE",
      
      },
      {
       name:"电机B相电流",
       key:"7",
        ut:'A', 
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_B_PHASE_CURRENT",
        
      
      },
      {
       name:"电机B相电流",
       key:"8",
        ut:'A',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_B_PHASE_CURRENT",
      
      },
      
      ],
      columns:[
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
          title: '状态',
          dataIndex: 'state',
          width: '20%',
          editable: false,
          render: ()=>sel
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
      ]
      },
      {
        title:'6#注水泵',
        arr:[
        {
          name:"出口压力",
          key:"1",
          ut:'MPa',
          age: 0,
          state: '',
          util: `db`,
          value:"EXPORT_PRESSURE",
      
        },
       {
         name:"进口压力",
         key:"2",
        ut:'MPa',
        age: 0,
        state: '',
        util: `db`,
        value:"EXPORT_PRESSURE",
      
      },
      {
       name:"电机温度",
       key:"3",
        ut:'℃',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_TEMPERATURE",
      
      },
      {
       name:"润滑油温度",
       key:"4",
        ut:'℃',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_TEMPERATURE",
      
      },
      {
       name:"润滑油液位",
       key:"5",
        ut:'CM',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_TEMPERATURE",
      
      },
      {
       name:"电机A相电流",
       key:"6",
        ut:'A',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_TEMPERATURE",
      
      },
      {
       name:"电机B相电流",
       key:"7",
        ut:'A', 
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_B_PHASE_CURRENT",
        
      
      },
      {
       name:"电机B相电流",
       key:"8",
        ut:'A',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_B_PHASE_CURRENT",
      
      },
      
      ],
      columns:[
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
          title: '状态',
          dataIndex: 'state',
          width: '20%',
          editable: false,
          render: ()=>sel
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
      ]
      },
      {
        title:'7#注水泵',
        arr:[
        {
          name:"出口压力",
          key:"1",
          ut:'MPa',
          age: 0,
          state: '',
          util: `db`,
          value:"EXPORT_PRESSURE",
      
        },
       {
         name:"进口压力",
         key:"2",
        ut:'MPa',
        age: 0,
        state: '',
        util: `db`,
        value:"EXPORT_PRESSURE",
      
      },
      {
       name:"电机温度",
       key:"3",
        ut:'℃',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_TEMPERATURE",
      
      },
      {
       name:"润滑油温度",
       key:"4",
        ut:'℃',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_TEMPERATURE",
      
      },
      {
       name:"润滑油液位",
       key:"5",
        ut:'CM',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_TEMPERATURE",
      
      },
      {
       name:"电机A相电流",
       key:"6",
        ut:'A',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_TEMPERATURE",
      
      },
      {
       name:"电机B相电流",
       key:"7",
        ut:'A', 
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_B_PHASE_CURRENT",
        
      
      },
      {
       name:"电机B相电流",
       key:"8",
        ut:'A',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_B_PHASE_CURRENT",
      
      },
      
      ],
      columns:[
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
          title: '状态',
          dataIndex: 'state',
          width: '20%',
          editable: false,
          render: ()=>sel
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
      ]
      },
      {
        title:'8#注水泵',
        arr:[
        {
          name:"出口压力",
          key:"1",
          ut:'MPa',
          age: 0,
          state: '',
          util: `db`,
          value:"EXPORT_PRESSURE",
      
        },
       {
         name:"进口压力",
         key:"2",
        ut:'MPa',
        age: 0,
        state: '',
        util: `db`,
        value:"EXPORT_PRESSURE",
      
      },
      {
       name:"电机温度",
       key:"3",
        ut:'℃',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_TEMPERATURE",
      
      },
      {
       name:"润滑油温度",
       key:"4",
        ut:'℃',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_TEMPERATURE",
      
      },
      {
       name:"润滑油液位",
       key:"5",
        ut:'CM',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_TEMPERATURE",
      
      },
      {
       name:"电机A相电流",
       key:"6",
        ut:'A',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_TEMPERATURE",
      
      },
      {
       name:"电机B相电流",
       key:"7",
        ut:'A', 
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_B_PHASE_CURRENT",
        
      
      },
      {
       name:"电机B相电流",
       key:"8",
        ut:'A',
        age: 0,
        state: '',
        util: `db`,
        value:"MOTOR_B_PHASE_CURRENT",
      
      },
      
      ],
      columns:[
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
          title: '状态',
          dataIndex: 'state',
          width: '20%',
          editable: false,
          render: ()=>sel
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
      ]
      },
    
    ];
    

    // if(obj){
    //   obj=JSON.parse(obj);
    //   this.setState({ data: obj, editingKey: '' });
    //   data=obj;
    //   console.log(data)
    // }
    this.state = { dataList:dataList, editingKey: '' };
  

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
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
        localData.set('allData',newData);
        Cookies.set('allData',newData)

        
        // store.dispatch({dataList:newData,type:'dataList'})
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
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


    const arr=[{title:"1井泵模拟量报警设置"}
    // ,{title:"2井泵模拟量报警设置"},{title:"3井泵模拟量报警设置"},{title:"4井泵模拟量报警设置"},{title:"5井泵模拟量报警设置"}
  ]
    return (

      <EditableContext.Provider value={this.props.form}>
      <BreadcrumbCustom first="数据总览" second="报警设置" />
      <div className="table_b">
      {

this.state.dataList.map((v,i)=>{
  let columns = v.columns.map(col => {
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
  return(
    <div key={i}  className="box">
          <h2>{v.title}</h2>
            <Table
            components={components}
            bordered
            dataSource={v.arr}
            columns={columns}
            rowClassName="editable-row"
            size="small"
            pagination={false} //禁用分页
          />
        </div>
      )})

    }
      </div>
      {/* <SearchList time={1} /> */}

       

      </EditableContext.Provider>
    );
  }
}

const EditableFormTable = Form.create()(EditableTable);
export default EditableFormTable