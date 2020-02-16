import React from 'react'
import { Button, List,Typography,Modal} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import '../../style/waterData/allData.less'
import pump from '@/style/imgs/pump.png'
import {getCookie,setCookie} from '../../utils/index'
import {POST} from '../../axios/tools'
import Cookies from 'js-cookie'
import moment from 'moment';
import {dataList} from './../pages/serve'

const Authorization=getCookie("Authorization");

class Demo extends React.Component {
  constructor(props){
    super(props);
    this.state={
      pumpList:[],
      visible: false,
      block:false,
      dataList:[],
      errItem:''
    };

  }
  componentDidMount() {
      let _this = this
      this.init();
      this.timer = setInterval(() => {
        _this.init();
      }, 10000)
  }
  componentWillUnmount () {
    clearInterval(this.timer)
  }
  init(){

    const Authorization=getCookie("Authorization");

    let allData = localStorage.getItem('allData');

    if(!allData){

      localStorage.setItem('allData',dataList);
      allData = dataList;
    }else{
      allData = JSON.parse(allData)
    }
    console.log(allData);
    let dataList = [];
    POST('/wTimeData/listForEach',{},Authorization).then((res)=>{

        if(res.code === 200){
          res.data.timeDataList.forEach((v,i)=>{

            let obj = allData[i];
            console.log(allData[i]);
            obj['RUNNING_STATE'] = v['RUNNING_STATE'];
            let warncount = [];
            obj.arr.forEach((item,i)=>{
              if(v[item.value] > obj.arr[i].age){
                obj.arr[i].block = true;
                let warnitem  = {title:obj.title,time:moment().format('YYYY-MM-DD hh:mm:ss'),targetname:obj.arr[i].name,col:obj.arr[i].value}

                warncount.push(warnitem);
              }else{
                obj.arr[i].block = false;
              }
              obj.arr[i].num = v[item.value];
            })
            if(warncount.length>0){
              obj.block = true;
              let warnlist = JSON.parse(localStorage.getItem('warnlist') || '[]');
              warnlist = warnlist.concat(warncount)

              obj.errItem = warncount[0].col
              localStorage.setItem("warnlist",JSON.stringify(warnlist))
            }
            dataList.push(obj);

          })
          this.setState({
            dataList:dataList
          })
        }

    })

  }

  popBlock(item){
    console.log(item);
    if(!item.block){
      return
    }
    this.setState({visible:true,errItem:item.errItem})
    setCookie('infor',[])
  }
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
    let pause=document.querySelector('.vio');
    pause.pause();
  };
  buildVideBox(opt){
    if(this.state.errItem.indexOf('PRESSURE')>-1){
      return (<div>
        <p>{`报警:注水泵的排出压力传感器`}</p>
        <p>{`检查1、注水泵的外输管线流程"`}</p>
        <p>{`检查1、注水泵的外输管线闸门是否开启`}</p>
<<<<<<< HEAD
          <video className="vio" autoplay="autoplay" data-v-68781f9a="" controls="controls" width="100%" src="/video/001启动前的准备2043.mp4?t=Sun Sep 22 2019 04:21:35 GMT+0800 (中国标准时间)">
=======
          <video data-v-68781f9a="" controls="controls" width="100%" src="http://119.90.248.34:51029/video/001%E5%90%AF%E5%8A%A8%E5%89%8D%E7%9A%84%E5%87%86%E5%A4%872043.mp4?t=Sun%20Sep%2022%202019%2013:23:27%20GMT+0800%20(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)">
>>>>>>> 9c06d8bff69ad8646818aedd555dd5ca7b2b67ec
            <object data-v-68781f9a="" width="100%">
                <embed data-v-68781f9a="" width="100%" src="/video/001启动前的准备2043.swf?t=Sun Sep 22 2019 04:21:35 GMT+0800 (中国标准时间)"/>
            </object>
          </video>
      </div>)
    }else if(this.state.errItem.indexOf('TEMPERATURE')>-1){
      return (<div>
        <p>{`报警:注水泵的电机温度传感器`}</p>
        <p>{`检查1、检查电机润滑脂的注入量及品质"`}</p>
        <p>{`检查2、检查电机状态`}</p>
        <p>{`检查3、与专业人员联系`}</p>
          <video className="vio" autoplay="autoplay" data-v-68781f9a="" controls="controls" width="100%" src="/video/001启动前的准备2043.mp4?t=Sun Sep 22 2019 04:21:35 GMT+0800 (中国标准时间)">
            <object data-v-68781f9a="" width="100%">
                <embed data-v-68781f9a="" width="100%" src="/video/001启动前的准备2043.swf?t=Sun Sep 22 2019 04:21:35 GMT+0800 (中国标准时间)"/>
            </object>
          </video>
      </div>)
    }else if(this.state.errItem.indexOf('LUBRICATING_OIL_TEMPERATURE')>-1){
      return (<div>
        <p>{`报警:注水泵的润滑油温度传感器`}</p>
        <p>{`检查1、更换润滑油`}</p>
        <p>{`检查2、检查润滑油油窗液位`}</p>
        <p>{`检查3、与专业人员联系`}</p>
          <video className="vio" autoplay="autoplay" data-v-68781f9a="" controls="controls" width="100%" src="/video/001启动前的准备2043.mp4?t=Sun Sep 22 2019 04:21:35 GMT+0800 (中国标准时间)">
            <object data-v-68781f9a="" width="100%">
                <embed data-v-68781f9a="" width="100%" src="/video/001启动前的准备2043.swf?t=Sun Sep 22 2019 04:21:35 GMT+0800 (中国标准时间)"/>
            </object>
          </video>
      </div>)
    }
  }
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
    let pause=document.querySelector('.vio');
    pause.pause();
  };
  render() {
     const data = [
       {
         title:"出口压力",
         value:"EXPORT_PRESSURE",
         ut:'MPa'
       },
       {
        title:"进口压力",
        value:"EXPORT_PRESSURE",
        ut:'MPa'
      },
      {
        title:"电机温度",
        value:"MOTOR_TEMPERATURE",
        ut:'℃'

      },
      {
        title:"润滑油温度",
        value:"MOTOR_TEMPERATURE",
        ut:'℃'

      },
      {
        title:"润滑油液位",
        value:"MOTOR_TEMPERATURE",
        ut:'CM'

      },
      {
        title:"电机A相电流",
        value:"MOTOR_TEMPERATURE",
        ut:'A'

      },
      {
        title:"电机B相电流",
        value:"MOTOR_B_PHASE_CURRENT",
        ut:'A'

      },
      {
        title:"电机B相电流",
        value:"MOTOR_B_PHASE_CURRENT",
        ut:'A'

      }
      ];
      // pumpList=[{content:data},{content:data},{content:data},{content:data},{content:data},{content:data},{content:data}];
     const pop_b=<Modal
         title="报警提示"
         visible={this.state.visible}
         onOk={this.handleOk}
         onCancel={this.handleCancel}
         okText="确认"
         cancelText="取消"
       >
       {
        this.buildVideBox()
       }
   </Modal>
    return (

        <div className="allData">
          <BreadcrumbCustom first="数据总览" second="总览数据" />
          <div className="allData_m">
            <h3>华北油田采油三厂楚一联合注水站监控中心</h3>
            <div className="allData_t">
              <ul>
              {
                this.state.dataList.map((itemm,i)=>(
                  <li className="list" key={i}>
                    {itemm.RUNNING_STATE==0?<Button type="primary">运行</Button>:<Button type="danger">停止</Button>}

                  <img src={pump} alt="" />
                  <List
                    header={<div onClick={this.popBlock.bind(this,itemm)} className={itemm.block?'headerList':""}>{itemm.title}</div>}
                    bordered
                    dataSource={itemm.arr}
                    renderItem={(item) => (
                      <List.Item>
                        <Typography.Text mark></Typography.Text>
                        {item.name}:{item.num}{item.ut}
                      </List.Item>
                    )}
                  />
                </li>
                ))
              }
              </ul>

            </div>
          </div>
          {pop_b}
        </div>
    )
  }
}

export default Demo
