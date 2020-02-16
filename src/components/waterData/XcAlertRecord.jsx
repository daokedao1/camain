import React from 'react'
import BreadcrumbCustom from '../BreadcrumbCustom';
import '../../style/waterData/historyLine.less'
import { Select, List,DatePicker,Typography,Table,Button,message} from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import {POST} from '../../axios/tools'
import {getHistoryList} from '../../axios'
import {getCookie,setCookie} from '../../utils/index'
import moment from 'moment';
import 'moment/locale/zh-cn';
import { exportExcel } from 'xlsx-oc'

const {RangePicker } = DatePicker;
moment.locale('zh-cn');
const Authorization=getCookie("Authorization");
const { Option } = Select;

const nameMapping =  {
    'SUCTION_PRESSURE_ALARM':'吸压过低',
    'OVER_PRESSURE_ALARM':'排压过高',
    'OIL_TEMPERATURE_ALARM':'油温过高',
    'MOTOR_TEMPERATURE_ALARM':'电机温度过高',
    'PUMP_CYLINDER1_ALARM':'泵噪声报警缸1',
    'PUMP_CYLINDER2_ALARM':'泵噪声报警缸2',
    'PUMP_CYLINDER3_ALARM':'泵噪声报警缸3',
    'PUMP_CYLINDER4_ALARM':'泵噪声报警缸4',
    'PUMP_CYLINDER5_ALARM':'泵噪声报警缸5',
}
class Demo extends React.Component {
  constructor(props){
    super(props);
    this.state={
      dataList:[],
      dropList:[],
      id:'',
      startTime:'',
      endTime:'',
      loading:false,
      selectDate:[],
    };

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
  onSearchBtnClick(){
    let _this = this;
    if(!this.state.startTime || !this.state.endTime){
      message.warning('请选择查询时间！');
      return false
    }
    if(!this.state.id ){
      message.warning('请选择要查询的泵！');
      return false
    }
    this.setState({loading:true})
    let param = {
      id:this.state.id,
      pageNumber:1,
      pageSize:1000,
      startDate:this.state.startTime,
      endDate:this.state.endTime,
    }
    POST('/wHistoryData/oneHistory',param,Authorization).then((res)=>{
        let data = [];
        if(res.code == 200 && res.data.tableData){
            data = _this.buildTableData(res.data.tableData)
        }
        this.setState({
          dataList:data,
          loading:false,
        })
    })

  }
  buildTableData(data){
      var alarmList = [];

      data.forEach((v,i)=>{
          let address = v.ADDRESS;
          let time = v.INSERT_DATE;

          if(v['SUCTION_PRESSURE_ALARM'] === '1'){
              alarmList.push({
                  address:address+'#泵',
                  name:nameMapping['SUCTION_PRESSURE_ALARM'],
                  num:v['IMPORT_PRESSURE'],
                  otime:time,
              })
          }
          //排压过高
          if(v['OVER_PRESSURE_ALARM'] === '1'){
              alarmList.push({
                  address:address+'#泵',
                  name:nameMapping['OVER_PRESSURE_ALARM'],
                  num:v['EXPORT_PRESSURE'],
                  otime:time,
              })
          }
          //油温
          if(v['OIL_TEMPERATURE_ALARM'] === '1'){
              alarmList.push({
                  address:address+'#泵',
                  name:nameMapping['OIL_TEMPERATURE_ALARM'],
                  num:v['LUBRICATING_OIL_TEMPERATURE'],
                  otime:time,
              })
          }
          //
          if(v['MOTOR_TEMPERATURE_ALARM'] === '1'){
              alarmList.push({
                  address:address+'#泵',
                  name:nameMapping['MOTOR_TEMPERATURE_ALARM'],
                  num:v['MOTOR_TEMPERATURE'],
                  otime:time,
              })
          }
          //
          if(v['PUMP_CYLINDER1_ALARM'] === '1'){
              alarmList.push({
                  address:address+'#泵',
                  name:nameMapping['PUMP_CYLINDER1_ALARM'],
                  num:v['CYLINDER1_NOISE'],
                  otime:time,
              })
          }
          if(v['PUMP_CYLINDER2_ALARM'] === '1'){
              alarmList.push({
                  address:address+'#泵',
                  name:nameMapping['PUMP_CYLINDER2_ALARM'],
                  num:v['CYLINDER2_NOISE'],
                  otime:time,
              })
          }
          if(v['PUMP_CYLINDER3_ALARM'] === '1'){
              alarmList.push({
                  address:address+'#泵',
                  name:nameMapping['PUMP_CYLINDER3_ALARM'],
                  num:v['CYLINDER3_NOISE'],
                  otime:time,
              })
          }
          if(v['PUMP_CYLINDER4_ALARM'] === '1'){
              alarmList.push({
                  address:address+'#泵',
                  name:nameMapping['PUMP_CYLINDER4_ALARM'],
                  num:v['CYLINDER4_NOISE'],
                  otime:time,
              })
          }
          if(v['PUMP_CYLINDER5_ALARM'] === '1'){
              alarmList.push({
                  address:address+'#泵',
                  name:nameMapping['PUMP_CYLINDER5_ALARM'],
                  num:v['CYLINDER5_NOISE'],
                  otime:time,
              })
          }

      })
      return alarmList;
  }
  handleChange(value) {
    this.setState({
      id:value
    })
  }
  onDateChange(date, dateString){

    this.setState({
      startTime:dateString[0],
      endTime:dateString[1],
      selectDate:dateString,
    })
  }
  onExportExcelClick(){
    var _headers = [
        { k: 'id', v: '序号' },
        { k: 'address', v: '报警泵' },
        { k: 'name', v: '报警位置' },
        { k: 'num', v: '报警值' },
        { k: 'otime', v: '报警时间' },
      ]
      let fileName = this.state.selectDate[0]+' 至 '+this.state.selectDate[1]+'现场报警记录汇总.xlsx';
      let rr = exportExcel(_headers, this.state.dataList,fileName);
      console.log(rr)
  }
  render() {
  const columns=[
    {
        title: '序号',
        dataIndex: 'id',
        key: 'id',
        render:(text,record,index)=>{
          return index+1
        }
    },
    {
        title: '报警泵',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '报警位置',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '报警值',
        dataIndex: 'num',
        key: 'num',
    },

    {
        title: '报警时间',
        dataIndex: 'otime',
        key: 'otime',
    },

  ];
  // console.log(this.state.dataList);

    return (
      <div className="historyLine">
          <BreadcrumbCustom first="数据总览" second="现场报警记录" />
            <Select placeholder="请选择水泵" style={{ width: 140 ,marginLeft:'10px'}} onChange={this.handleChange.bind(this)}>
                  {this.state.dropList.map((item,ii)=>(
                    <Option key={ii} value={item.address}>{item.name}</Option>
                  ))}
            </Select>
            <RangePicker locale={locale} style={{ marginLeft:'10px'}} className="middel" format="YYYY-MM-DD"  onChange={this.onDateChange.bind(this)} />
            <Button type="primary" style={{marginLeft:'10px'}} onClick={this.onSearchBtnClick.bind(this)}>查询</Button>
            <Button type="primary" style={{marginLeft:'10px'}} onClick={this.onExportExcelClick.bind(this)}>导出</Button>
            <Table
              key={888}
              bordered
              style={{marginTop:'10px'}}
              columns={columns}
              loading={this.state.loading}
              dataSource={this.state.dataList}
              />
      </div>
    )
  }
}

export default Demo
