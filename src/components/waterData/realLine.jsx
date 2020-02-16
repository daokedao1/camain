import React from 'react'
import BreadcrumbCustom from '../BreadcrumbCustom';
import { Button,Row, Col, Car, Card} from 'antd';
import BizLineChart from '../charts/bizLineChart';
import {POST} from '../../axios/tools'
import {getCookie,setCookie} from '../../utils/index'
import { Spin } from 'antd';
import '../../style/waterData/realLine.less'
const currentColumn = {
  "chart1":["EXPORT_PRESSURE","IMPORT_PRESSURE"],
  "chart2":["LUBRICATING_OIL_TEMPERATURE","LUBRICATING_OIL_LEVEL","MOTOR_TEMPERATURE"],
  "chart3":["MOTOR_A_PHASE_CURRENT","MOTOR_B_PHASE_CURRENT","MOTOR_C_PHASE_CURRENT","MOTOR_A_PHASE_VOLTAGE","MOTOR_B_PHASE_VOLTAGE","MOTOR_C_PHASE_VOLTAGE"],
  "chart4":["CYLINDER1_NOISE","CYLINDER2_NOISE","CYLINDER3_NOISE","CYLINDER4_NOISE","CYLINDER5_NOISE"]
}
const nameMapping = {
  "EXPORT_PRESSURE":"出口压力",
  "IMPORT_PRESSURE":"进口压力",

  "LUBRICATING_OIL_TEMPERATURE":'润滑油温度',
  "LUBRICATING_OIL_LEVEL":'润滑油液位',
  "MOTOR_TEMPERATURE":'电机温度',

  "MOTOR_A_PHASE_CURRENT":'电机A相电流',
  "MOTOR_B_PHASE_CURRENT":'电机B相电流',
  "MOTOR_C_PHASE_CURRENT":'电机C相电流',
  "MOTOR_A_PHASE_VOLTAGE":'电机A相电压',
  "MOTOR_B_PHASE_VOLTAGE":'电机B相电压',
  "MOTOR_C_PHASE_VOLTAGE":'电机C相电压',

  "CYLINDER1_NOISE":'泵头1#缸噪声',
  "CYLINDER2_NOISE":'泵头2#缸噪声',
  "CYLINDER3_NOISE":'泵头3#缸噪声',
  "CYLINDER4_NOISE":'泵头4#缸噪声',
  "CYLINDER5_NOISE":'泵头5#缸噪声',

}
const Authorization=getCookie("Authorization");
class RealLine extends React.Component {
  constructor(props){
    super(props);
    this.change = this.change.bind(this);
    const Authorization=getCookie("Authorization");
    this.timer=null;
    this.timerCount=null;
    this.state={
      loading:true,
      curtabid:'2',
      dataList:[],
      chart1:[],
      chart2:[],
      chart3:[],
      chart4:[],
      titleList:[],
      count:10
    }

  }
  init(){
    let _this = this;

    POST('/wInfo/pumpList',{},Authorization).then((res)=>{
      if(res.code == 200 && res.data.pumpList){
          _this.setState({
            titleList:res.data.pumpList
          })
          this.buildData(this.state.curtabid,true)
      }
    })
  }
setTimeWay(){
  let _this = this;
  this.timerCount = setInterval(() => {
    this.setState((preState) =>({
      count: preState.count-1,
    }),() => {

      if(this.state.count === -1){
        this.setState({count:10})
        // clearInterval(this.timerCount);
      }
    });
  }, 1000)
  this.timer=setInterval(()=>{
      _this.buildData(this.state.curtabid);
  },11000)
}
  componentDidMount() {
    this.init();
  }
  componentWillUnmount () {
      clearInterval(this.timer)
  }
  buildData(id,state){
      let _this = this;
      let param = {
        "id":id,
        "currentColumn":currentColumn
      }
      POST('/wTimeData/oneCurrent',param,Authorization).then((res)=>{
          if(res.code == 200 && res.data.chartData){
              this.setState({
                chart1:_this.dataParse(res.data.chartData.chart1),
                chart2:_this.dataParse(res.data.chartData.chart2),
                chart3:_this.dataParse(res.data.chartData.chart3),
                chart4:_this.dataParse(res.data.chartData.chart4),
                loading:false
              },()=>{
                if(state){
                  this.setTimeWay();
                }
              })
          }
      })
  }
  
  dataParse(data){
      let newdata = [];

      let columns = data.columns;
      data.rows.forEach((v,i)=>{

          columns.forEach((item,index)=>{
            if(item != 'date'){
              newdata.push({
                date:v[0],
                type:nameMapping[item],
                value:parseFloat(v[index])
              })
            }

          })

      })
      console.log(newdata.splice(0, 10))
      return newdata
  }
  getLastData(){
    POST('/wTimeData/listForEach',Authorization).then((res)=>{
        if(res.code == 200 && res.data.pumpList){
            this.setState({
              dataList:this.state.dataList.push(res.data.pumpList)
            })
        }
    })
  }


  tab(item){
    this.buildData(item.address);
    this.setState({
      curtabid:item.address,
      currentLineName:item.name
    });
  }
  change(item){
    item.show=!item.show;
    this.setState({mapData:this.state.mapData});
}
  render() {
    let row=[
      {
        name:11,
        show:true,
        dataKey:"EXPORT_PRESSURE",
        stroke:''
      }
    ]
    return (
      <Spin size="large" className="spin" spinning={this.state.loading} tip="Loading..." size="large">

        <div className="realLine">
          <div className="realLine_m">
          <BreadcrumbCustom first="数据总览" second="实时曲线" />
          <Button type="primary">{`${this.state.count}秒后自动刷新`}</Button>
          </div>


          <div className="realLine_t">
            <div className="t_l">
           { this.state.titleList.map((item,index)=>(
             <Button onClick={()=>this.tab(item)} key={index} type={item.address === this.state.curtabid?'primary':'dashed'} >
               {item.name}
             </Button>
           )
            )}
            </div>
          </div>
          <div className="realLine_b" >
            <Row gutter={16}>
                <Col className="gutter-row" md={24}>
                    <BizLineChart  position={"date*value"} data={this.state.chart1} />
                    <BizLineChart  position={"date*value"} data={this.state.chart4} />
                    <BizLineChart  position={"date*value"} data={this.state.chart2} />
                    <BizLineChart  position={"date*value"} data={this.state.chart3} />

                </Col>
            </Row>

          </div>
        </div>
        </Spin>
    )
  }
}

export default RealLine
