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

    if(!this.state.startTime || !this.state.endTime){
      message.warning('请选择查询时间！');
      return false
    }
    if(!this.state.id ){
      message.warning('请选择要查询的泵！');
      return false
    }
    this.setState({loading:true})
    getHistoryList({
      nodeid:this.state.id,
      startTime:this.state.startTime,
      endTime:this.state.endTime,
    }).then((res)=>{
        let dataList = [];
        if(res.code == 200){
          dataList = res.data;
        }
        this.setState({
          dataList:dataList,
          loading:false
        })
    })

  }
  handleChange(value) {
    this.setState({
      id:value
    })
  }
  onDateChange(date, dateString){

    this.setState({
      startTime:moment(dateString[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
      endTime:moment(dateString[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      selectDate:dateString,
    })
  }
  onExportExcelClick(){
    if(!this.state.startTime || !this.state.endTime){
      message.warning('请选择查询时间！');
      return false
    }
    if(!this.state.id ){
      message.warning('请选择要查询的泵！');
      return false
    }
    var _headers = [
        { k: 'sortid', v: '序号' },
        { k: 'nodename', v: '报警泵' },
        { k: 'name', v: '报警位置' },
        { k: 'curvalue', v: '实际数值' },
        { k: 'bzvalue', v: '报警阀值' },
        { k: 'date', v: '报警时间' },
      ]
      let fileName = this.state.selectDate[0]+' 至 '+this.state.selectDate[1]+'报警记录汇总.xlsx';
      let rr = exportExcel(_headers, this.state.dataList,fileName);
      console.log(rr)
  }
  render() {
  const columns=[
    {
        title: '序号',
        dataIndex: 'sortid',
        key: 'sortid',
    },
    {
        title: '报警泵',
        dataIndex: 'nodename',
        key: 'nodename',
    },
    {
        title: '报警位置',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '实际数值',
        dataIndex: 'curvalue',
        key: 'curvalue',
    },
    {
        title: '报警阀值',
        dataIndex: 'bzvalue',
        key: 'bzvalue',
    },
    {
        title: '报警时间',
        dataIndex: 'date',
        key: 'date',
    },

  ];
  console.log(this.state.dataList);

    return (
      <div className="historyLine">
          <BreadcrumbCustom first="数据总览" second="报警记录" />
            <Select placeholder="请选择水泵" style={{ width: 140 ,marginLeft:'10px'}} onChange={this.handleChange.bind(this)}>
                  {this.state.dropList.map((item,ii)=>(
                    <Option key={ii} value={item.id}>{item.name}</Option>
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
