
import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom';
import '../../style/waterData/alertSet.less'
import { Input, InputNumber, Popconfirm, Form,Select } from 'antd';
import {setCookie,getCookie} from './../../utils/index'
import Storage from './../../utils/localStorage'
import XcalertSetCard from './XcalertSetCard'
import {dataList} from './../pages/serve'
import {POST} from '../../axios/tools'
const Authorization=getCookie("Authorization");


class AlertSet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList:[]
    }
  }
componentDidMount(){
  POST('/wTimeData/listForEach',{},Authorization).then((res)=>{
      if(res.code === 200){
      
        this.setState({
          dataList:res.data.timeDataList
        })
      }
  })
}
  render() {

    return (
      <div>
        <BreadcrumbCustom first="数据总览" second="现场报警值设置" />
        <div className="table_b">
          {
            this.state.dataList.map((v,i)=>{
              return  <XcalertSetCard dataList={v} item={v} title={v.name} key={i} id={i} />
            })
          }

        </div>
      </div>

    );
  }
}
export default Form.create()(AlertSet);
