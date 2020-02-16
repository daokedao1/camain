import React from 'react'
import BreadcrumbCustom from '../BreadcrumbCustom';
import {POST,GET} from '../../axios/tools'
import {getCookie,setCookie,clone} from '../../utils/index'
import pumpinfor from '@/style/imgs/泵信息.png'
import { Button,Tabs,List,Typography} from 'antd';
import '../../style/waterData/realData.less'
import CountdNum from './countNum'
import moment from 'moment';

const Authorization  = getCookie("Authorization");
const { TabPane } = Tabs;



const bar=[
  {
    val: "出口压力:",
    r:"泵头1缸噪声:",
    uv1:"MPa",
    uv2:"",
    value1:"EXPORT_PRESSURE",
    value2:"CYLINDER1_NOISE",
  },
  {
    val: "进口压力:",
    r:"泵头2缸噪声:",
    uv1:"MPa",
    uv2:"",
    value1:"IMPORT_PRESSURE",
    value2:"CYLINDER2_NOISE"
  },
  {
    val: "电机温度:",
    r:"泵头3缸噪声:",
    uv1:"℃",
    uv2:"",
    value1:"MOTOR_TEMPERATURE",
    value2:"CYLINDER3_NOISE"
  },
  {
    val: "润滑油温度:",
    r:"泵头4缸噪声:",
    uv1:"℃",
    uv2:"",
    value1:"LUBRICATING_OIL_TEMPERATURE",
    value2:"CYLINDER4_NOISE"
  },
  {
    val: "润滑油液位:",
    r:"泵头5缸噪声:",
    value1:"LUBRICATING_OIL_LEVEL",
    value2:"CYLINDER5_NOISE",
    uv1:"CM",
    uv2:"",
  },
  {
    val: "电机A相电流:",
    r:"电机A相电压:",
    uv1:"A",
    uv2:"V",
    value1:"MOTOR_A_PHASE_CURRENT",
    value2:"MOTOR_A_PHASE_VOLTAGE"
  },
  {
    val: "电机B相电流:",
    r:"电机B相电压:",
    value1:"MOTOR_B_PHASE_CURRENT",
    value2:"MOTOR_B_PHASE_VOLTAGE",
    uv1:"A",
    uv2:"V",
  },
  {
    val: "电机C相电流:",
    r:"电机C相电压:",
    value1:"MOTOR_C_PHASE_CURRENT",
    value2:"MOTOR_C_PHASE_VOLTAGE",
    uv1:"A",
    uv2:"V",
  },
]




class Demo extends React.Component {
  constructor(props){
    super(props);

    this.timer=null;
    this.state={
      loading:true,
      datalist1:[],
      dataList2:[],
      dataList:[],
      dataList3:[],
      ListaData:[],
      bar1:[],
      bar2:[],
      bar3:[],
      bar4:[],
      bar5:[],
      bar6:[],
      bar7:[],
      bar8:[]
    }

  }
  componentDidMount () {
      this.init();
      this.getLastData();
     this.timer= setInterval(()=>{
        this.getLastData();
      },10000)
  }
  componentWillUnmount () {
      clearInterval(this.timer)
  }
  cancleData(data1,data2){
    let bar=clone(data2);
    for(let key in data1){
      for(let item of bar){
        if(key===item.value1){
          item.val1=data1[key]
        }
         if(key===item.value2){
          item.val2=data1[key]
        }
      }
    }
    bar.type=data1.RUNNING_STATE;
    return bar;
  }
  async init(){
      const Authorization=getCookie("Authorization");
       const res=await GET('http://39.98.215.185:8088/api/alarmsetting/list',{},{},1)
       let allData = res.data[0].config;

        if(!allData || allData == 'undefined'){
          localStorage.setItem('allData',dataList);
          allData = dataList;
        }else{
          allData = JSON.parse(allData)
        }

        let dataList = [];

        POST('/wTimeData/listForEach',{},Authorization).then((res)=>{
            let data=res.data.timeDataList;
            let data1=data;
            this.setState({bar1:this.cancleData(data1[0],bar)})
            this.setState({bar2:this.cancleData(data1[1],bar)})
            this.setState({bar3:this.cancleData(data1[2],bar)})
            this.setState({bar4:this.cancleData(data1[3],bar)})
            this.setState({bar5:this.cancleData(data1[4],bar)})
            this.setState({bar6:this.cancleData(data1[5],bar)})
            this.setState({bar7:this.cancleData(data1[6],bar)})
            this.setState({bar8:this.cancleData(data1[7],bar)})
        })
  }
  getLastData(){
    console.log(Authorization);
    POST('/wTimeData/listForEach',{},Authorization).then((res)=>{
        if(res.code == 200 && res.data.timeDataList){
          let data=res.data.timeDataList;
          let data1=data;
          this.setState({bar1:this.cancleData(data1[0],bar)})
          this.setState({bar2:this.cancleData(data1[1],bar)})
          this.setState({bar3:this.cancleData(data1[2],bar)})
          this.setState({bar4:this.cancleData(data1[3],bar)})
          this.setState({bar5:this.cancleData(data1[4],bar)})
          this.setState({bar6:this.cancleData(data1[5],bar)})
          this.setState({bar7:this.cancleData(data1[6],bar)})
          this.setState({bar8:this.cancleData(data1[7],bar)})
        }
    })
  }
  ontabChange(){

  }
  render() {
    const header123=[
      {
        title:'1#注水泵',
        arr:this.state.bar1,
        type:this.state.bar1.type

      },
      {
        title:'2#注水泵',
        arr:this.state.bar2,
        type:this.state.bar2.type

      },
      {
        title:'3#注水泵',
        arr:this.state.bar3,
        type:this.state.bar3.type

      },
    ];
    const header456=[
      {
        title:'4#注水泵',
        arr:this.state.bar4,
        type:this.state.bar4.type
      },
      {
        title:'5#注水泵',
        arr:this.state.bar5,
        type:this.state.bar5.type

      },
      {
        title:'6#注水泵',
        arr:this.state.bar6,
        type:this.state.bar6.type

      },
    ]
    const header78=[
      {
        title:'7#注水泵',
        arr:this.state.bar7,
        type:this.state.bar7.type

      },
      {
        title:'8#注水泵',
        arr:this.state.bar8,
        type:this.state.bar8.type

      },
    ]
    let {dataList}=this.state;
    return (
        <div className="realData">
                 <div className="topAllData">
          <BreadcrumbCustom first="数据总览" second="实时数据" />

          <CountdNum/>
          </div>
          <div className="realData_t">
            <div className="t_l" style={{textAlign:'center'}}>
              <img src={pumpinfor} style={{height:"200px"}} alt="" />
            </div>
            <div className="t_r">
              <Tabs defaultActiveKey="1" onChange={this.ontabChange.bind(this)}>
                <TabPane tab="注水泵123" key="1">
                  <div className="allData_t">
                    <ul>
                    {
                      header123.map((v,index)=>(
                        <li
                        className="list">
                    {v.type==1?<Button type="primary">运行</Button>:<Button type="danger">停止</Button>}


                          <List
                              header={<strong className="headers" >{v.title}</strong>}
                              bordered
                              dataSource={v.arr}
                              renderItem={(item) => {
                              return(<List.Item>
                                    <Typography.Text mark></Typography.Text>
                                    <div className="content">
                                          <div className="content_l">{item.val}{item.val1}{item.uv1}</div>
                                          <div className="content_r">{item.r}{item.val2}{item.uv2}</div>
                                    </div>
                                  </List.Item>)
                              }}
                          />
                        </li>
                          ))
                        }


                    </ul>
                  </div>
                </TabPane>
                <TabPane tab="注水泵456" key="2">
                <div className="allData_t">
                    <ul>
                    {
                      header456.map((v,index)=>(
                        <li
                        key={index}
                        className="list">
                    {v.type==1?<Button type="primary">运行</Button>:<Button type="danger">停止</Button>}

                      <List
                        header={<strong className="headers" >{v.title}</strong>}
                        bordered
                          dataSource={v.arr}
                          renderItem={(item) => {
                          return(<List.Item>
                            <Typography.Text mark></Typography.Text>
                            <div className="content">
                            <div className="content_l">{item.val}{item.val1}{item.uv1}</div>
                                          <div className="content_r">{item.r}{item.val2}{item.uv2}</div>

                            </div>

                          </List.Item>)

                      }}

                      />
                        </li>

                      ))
                    }
                    </ul>
                  </div>
                </TabPane>
                <TabPane tab="注水泵78" key="3">
                <div className="allData_t">
                    <ul>
                    {
                      header78.map((v,index)=>(
                        <li
                        key={index}
                        className="list">
                    {v.type==1?<Button type="primary">运行</Button>:<Button type="danger">停止</Button>}

                              <List
                                header={<strong className="headers" >{v.title}</strong>}
                                bordered
                                  dataSource={v.arr}
                                  renderItem={(item) => {
                                  return(<List.Item>
                                    <Typography.Text mark></Typography.Text>
                                    <div className="content">
                                    <div className="content_l">{item.val}{item.val1}{item.uv1}</div>
                                    <div className="content_r">{item.r}{item.val2}{item.uv2}</div>
                                    </div>
                                  </List.Item>)
                                }}
                            />
                        </li>

                      ))
                    }



                    </ul>

                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
          <div className="realData_b" />
        </div>
    )
  }
}

export default Demo
