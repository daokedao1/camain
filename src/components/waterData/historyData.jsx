import React from 'react'
import BreadcrumbCustom from '../BreadcrumbCustom';
import '../../style/waterData/historyLine.less'
import { Select,DatePicker,Table,Button,message} from 'antd';
import SearchList from './searchList'
import {POST,GET} from '../../axios/tools'
import {getCookie,setCookie} from '../../utils/index'
import locale from 'antd/es/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
import Storage from './../../utils/localStorage'
import { exportExcel } from 'xlsx-oc'

const {RangePicker } = DatePicker;
const { Option } = Select;
const Authorization=getCookie("Authorization");

class HistoryTable extends React.Component {
  constructor(props){
    super()
    this.state = {
        dropList:[],
        dataList:[],
        id:'',
        startDate:'',
        endDate:'',
        page:1,
        pageSize:10,
        total:10,
    }
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
  onDateChange(date, dateString){
    this.setState({
      startDate:dateString[0],
      endDate:dateString[1],
    })
  }
  onSearchBtnClick(){
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
      pageNumber:this.state.page,
      pageSize:this.state.pageSize,
      startDate:this.state.startDate,
      endDate:this.state.endDate,
    }
    this.setState({
      loading:true
    })
    POST('/wHistoryData/oneHistory',param,Authorization).then((res)=>{
        let data = [];
        let total = this.state.total;
        if(res.code == 200 && res.data.tableData){
            data = res.data.tableData;
            total = res.data.totalRow
        }
        this.setState({
          dataList:data,
          loading:false,
          total:total,
        })
    })
  }
  handleChange(value) {
    this.setState({
      id:value
    })
  }
  onExportBtnClick(){
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
        // pageNumber:this.state.page,
        // pageSize:this.state.pageSize,
        startDate:this.state.startDate,
        endDate:this.state.endDate,
      }
      message.warning('正在生成Excel导出文件，请稍等！');
      location.href = 'http://39.98.215.185:8088/ss/wHistoryData/oneHistory/excel?id='+param.id+'&startDate='+param.startDate+'&endDate='+param.endDate

  }
  pageChange(page){
      let _this = this;
      this.setState({
        page:page,
        loading:true,
      },()=>{
        let param = {
          id:this.state.id,
          pageNumber:page,
          pageSize:this.state.pageSize,
          startDate:this.state.startDate,
          endDate:this.state.endDate,
        }
          POST('/wHistoryData/oneHistory',param,Authorization).then((res)=>{
              let data = [];
              if(res.code == 200 && res.data.tableData){
                  data = res.data.tableData
              }
              _this.setState({
                dataList:data,
                loading:false,
              })
          })
      })
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
        title: '时间',
        dataIndex: 'INSERT_DATE',
        key: 'INSERT_DATE',
    },
    {
        title: '出口压力',
        dataIndex: 'EXPORT_PRESSURE',
        key: 'EXPORT_PRESSURE',
    },
    {
        title: '进口压力',
        dataIndex: 'IMPORT_PRESSURE',
        key: 'IMPORT_PRESSURE',
    },
    {
        title: '润滑油温度',
        dataIndex: 'LUBRICATING_OIL_TEMPERATURE',
        key: 'LUBRICATING_OIL_TEMPERATURE',
    },
    {
        title: '润滑油液位',
        dataIndex: 'LUBRICATING_OIL_LEVEL',
        key: 'LUBRICATING_OIL_LEVEL',
    },
    {
        title: '电机温度',
        dataIndex: 'MOTOR_TEMPERATURE',
        key: 'MOTOR_TEMPERATURE',
    },
    {
        title: '电机A相电流',
        dataIndex: 'MOTOR_A_PHASE_CURRENT',
        key: 'MOTOR_A_PHASE_CURRENT',
    },
    {
        title: '电机B相电流',
        dataIndex: 'MOTOR_B_PHASE_CURRENT',
        key: 'MOTOR_B_PHASE_CURRENT',
    },
    {
        title: '电机C相电流',
        dataIndex: 'MOTOR_C_PHASE_CURRENT',
        key: 'MOTOR_C_PHASE_CURRENT',
    },
    {
        title: '电机A相电压',
        dataIndex: 'MOTOR_A_PHASE_VOLTAGE',
        key: 'MOTOR_A_PHASE_VOLTAGE',
    },
    {
        title: '电机B相电压',
        dataIndex: 'MOTOR_B_PHASE_VOLTAGE',
        key: 'MOTOR_B_PHASE_VOLTAGE',
    },
    {
        title: '电机C相电压',
        dataIndex: 'MOTOR_C_PHASE_VOLTAGE',
        key: 'MOTOR_C_PHASE_VOLTAGE',
    },
    {
        title: '泵头1#缸噪声',
        dataIndex: 'CYLINDER1_NOISE',
        key: 'CYLINDER1_NOISE',
    },
    {
        title: '泵头2#缸噪声',
        dataIndex: 'CYLINDER2_NOISE',
        key: 'CYLINDER2_NOISE',
    },
    {
        title: '泵头3#缸噪声',
        dataIndex: 'CYLINDER3_NOISE',
        key: 'CYLINDER3_NOISE',
    },
    {
        title: '泵头4#缸噪声',
        dataIndex: 'CYLINDER4_NOISE',
        key: 'CYLINDER4_NOISE',
    },
    {
        title: '泵头5#缸噪声',
        dataIndex: 'CYLINDER5_NOISE',
        key: 'CYLINDER5_NOISE',
    },
  ];

      return (
        <div className="historyLine">
            <BreadcrumbCustom first="数据总览" second="历史数据" />
              <Select placeholder="请选择水泵" style={{ width: 140 ,marginLeft:'10px'}} onChange={this.handleChange.bind(this)}>
                {this.state.dropList.map((item,index)=>(
                  <Option key={index} value={item.address}>{item.name}</Option>
                ))}
              </Select>
              <RangePicker locale={locale} style={{ marginLeft:'10px'}} className="middel" format="YYYY-MM-DD"  onChange={this.onDateChange.bind(this)} />
              <Button type="primary" style={{marginLeft:'10px'}} onClick={this.onSearchBtnClick.bind(this)}>查询</Button>
              <Button type="primary" style={{marginLeft:'10px'}} onClick={this.onExportBtnClick.bind(this)}>导出</Button>
            <Table
              bordered
              style={{marginTop:'10px'}}
              columns={columns}
              loading={this.state.loading}
              dataSource={this.state.dataList}
              size="small"
              scroll={{ x: '130%'}}
              pagination={{
                  pageSize:this.state.pageSize,
                  total:this.state.total,
                  onChange:this.pageChange.bind(this)
              }}
            />
        </div>
      )
    }
}

export default HistoryTable
