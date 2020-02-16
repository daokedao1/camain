
import React from 'react'
import BreadcrumbCustom from '../BreadcrumbCustom';
import { Row, Col, Card,Select,DatePicker,Button,Spin} from 'antd';
import SearchList from './searchList'
import locale from 'antd/es/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
import BizLineChart from '../charts/bizLineChart';
import RechartsSimpleLineChart from '../charts/RechartsSimpleLineChart';
import {POST} from '../../axios/tools'
import {getCookie,setCookie} from '../../utils/index'
import '../../style/waterData/realLine.less'
const Authorization=getCookie("Authorization");
const { Option } = Select;
const {RangePicker } = DatePicker;
class HistoryLine extends React.Component {
  constructor(props){
    super(props);
    this.change = this.change.bind(this);
    this.state={
      dropList:[],
      dataList:[],
      id:2,
      startDate:'',
      endDate:'',
      chart1:[],
      chart2:[],
      chart3:[],
      chart4:[],
      loading:false,
    }
  }
  handleChange(value) {
    this.setState({
      id:value
    })
  }
  componentDidMount() {
    POST('/wInfo/pumpList',{},Authorization).then((res)=>{
        if(res.code == 200 && res.data.pumpList){
            this.setState({
              dropList:res.data.pumpList
            })
        }
    })
  }
  buildData(data){
    let chart1 = [];
    let chart2 = [];
    let chart3 = [];
    let chart4 = [];
    data.forEach((v,i)=>{
      let date = v.INSERT_DATE
      chart1.push({
          date:date,
          type:'出口压力',
          value:parseFloat(v['EXPORT_PRESSURE'])
        })
      chart1.push({
          date:date,
          type:'进口压力',
          value:parseFloat(v['IMPORT_PRESSURE'])
        })

      chart2.push({
          date:date,
          type:'润滑油温度',
          value:parseFloat(v['LUBRICATING_OIL_TEMPERATURE'])
        })
      chart2.push({
          date:date,
          type:'润滑油液位',
          value:parseFloat(v['LUBRICATING_OIL_LEVEL'])
        })
      chart2.push({
          date:date,
          type:'电机温度',
          value:parseFloat(v['MOTOR_TEMPERATURE'])
        })

      chart3.push({
          date:date,
          type:'电机A相电流',
          value:parseFloat(v['MOTOR_A_PHASE_CURRENT'])
        })
      chart3.push({
        date:date,
        type:'电机B相电流',
        value:parseFloat(v['MOTOR_B_PHASE_CURRENT'])
      })
      chart3.push({
          date:date,
          type:'电机C相电流',
          value:parseFloat(v['MOTOR_C_PHASE_CURRENT'])
        })
      chart3.push({
          date:date,
          type:'电机A相电压',
          value:parseFloat(v['MOTOR_A_PHASE_VOLTAGE'])
      })
      chart3.push({
          date:date,
          type:'电机B相电压',
          value:parseFloat(v['MOTOR_B_PHASE_VOLTAGE'])
        })
      chart3.push({
          date:date,
          type:'电机C相电压',
          value:parseFloat(v['MOTOR_C_PHASE_VOLTAGE'])
        })

      chart4.push({
          date:date,
          type:'泵头1#缸噪声',
          value:parseFloat(v['CYLINDER1_NOISE'])
        })
      chart4.push({
          date:date,
          type:'泵头2#缸噪声',
          value:parseFloat(v['CYLINDER2_NOISE'])
        })
      chart4.push({
          date:date,
          type:'泵头3#缸噪声',
          value:parseFloat(v['CYLINDER3_NOISE'])
        })
      chart4.push({
          date:date,
          type:'泵头4#缸噪声',
          value:parseFloat(v['CYLINDER4_NOISE'])
        })
      chart4.push({
          date:date,
          type:'泵头5#缸噪声',
          value:parseFloat(v['CYLINDER5_NOISE'])
        })



    })
    // console.log(chart1);
      this.setState({
        chart1:chart1,
        chart2:chart2,
        chart3:chart3,
        chart4:chart4,
        loading:false,
      })
  }
  onSearchBtnClick(){
    let _this = this;
    if(!this.state.id){
      message.warning('请选择水泵！');
      return false
    }
    if(!this.state.startDate){
      message.warning('请选择查询时间！');
      return false
    }
    let param = {
      id:this.state.id,
      // pageNumber:1,
      // pageSize:500,
      startDate:this.state.startDate,
      endDate:this.state.endDate,
    }
    this.setState({
      loading:true
    })
    POST('/wHistoryData/oneHistory',param,Authorization).then((res)=>{
        let data = [];
        if(res.code == 200 && res.data.tableData){
            data = _this.buildData(res.data.tableData)
        }
    })
  }

  change(item){
    item.show=!item.show;
    this.setState({mapData:this.state.mapData});
  }
  onDateChange(date, dateString){
    this.setState({
      startDate:dateString[0],
      endDate:dateString[1],
    })
  }
  render() {
    const data=[{"address":"2","name":"1#注水泵","id":2, uv: 4000, pv: 2400, amt: 2400},{"address":"1","name":"2#注水泵","id":1, uv: 4000, pv: 2400, amt: 2400},{"address":"3","name":"3#注水泵","id":3, uv: 4000, pv: 2400, amt: 2400},{"address":"4","name":"4#注水泵","id":4, uv: 4000, pv: 2400, amt: 2400},{"address":"5","name":"5#注水泵","id":5, uv: 4000, pv: 2400, amt: 2400},{"address":"6","name":"6#注水泵","id":6},{"address":"7","name":"7#注水泵","id":7},{"address":"8","name":"8#注水泵","id":8}];

    return (
        <div className="realLine">
          <BreadcrumbCustom first="数据总览" second="历史曲线" />
          <Select placeholder="请选择水泵" style={{ width: 140 ,marginLeft:'10px'}} onChange={this.handleChange.bind(this)}>
                {this.state.dropList.map((item,index)=>(
                  <Option key={index} value={item.address}>{item.name}</Option>
                ))}
          </Select>
          <RangePicker locale={locale} style={{ marginLeft:'10px'}} className="middel" format="YYYY-MM-DD" onChange={this.onDateChange.bind(this)} />
          <Button type="primary" style={{marginLeft:'10px'}} onClick={this.onSearchBtnClick.bind(this)}>查询</Button>
          <Spin size="large" className="spin" spinning={this.state.loading} tip="Loading..." size="large">
              <div className="realLine_b" >
                  <h2>历史曲线</h2>
                    <BizLineChart  position={"date*value"} data={this.state.chart1} />
                    <BizLineChart  position={"date*value"} data={this.state.chart4} />
                    <BizLineChart  position={"date*value"} data={this.state.chart2} />
                    <BizLineChart  position={"date*value"} data={this.state.chart3} />

                </div>
          </Spin>
        </div>
    )
  }
}

export default HistoryLine
