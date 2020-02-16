
import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom';
import '../../style/waterData/alertSet.less'
import { Input, InputNumber, Popconfirm, Form,Select } from 'antd';
import {setCookie,getCookie} from './../../utils/index'
import Storage from './../../utils/localStorage'
import AlertSetCard from './alertSetCard'
import {dataList} from './../pages/serve'
import {GET} from '../../axios/tools'

const EditableContext = React.createContext();
class AlertSet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList:[]
    }
  }
async init(){
  const res=await GET('http://39.98.215.185:8088/api/alarmsetting/list',{},{},1)
  let obj = res.data[0].config;
      obj = JSON.parse(obj);
      this.setState({dataList:obj})
}
componentDidMount(){
  this.init()
}
  render() {

    return (
      <div>
        <BreadcrumbCustom first="数据总览" second="报警设置" />
        <div className="table_b">
          {
            this.state.dataList.map((v,i)=>{
              return  <AlertSetCard dataList={this.state.dataList} item={v} title={v.title} key={i} id={i} />
            })
          }

        </div>
      </div>

    );
  }
}
export default Form.create()(AlertSet);
