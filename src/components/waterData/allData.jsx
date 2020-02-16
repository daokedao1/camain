import React from 'react'
import { Button, List,Typography,Modal} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import '../../style/waterData/allData.less'
import pump from '@/style/imgs/pump.png'
import {getCookie,setCookie} from '../../utils/index'
import {POST,GET} from '../../axios/tools'
import Cookies from 'js-cookie'
import moment from 'moment';
import {dataList} from './../pages/serve'
import CountdNum from './countNum'
const Authorization=getCookie("Authorization");

class Demo extends React.Component {
  constructor(props){
    super(props);
    this.state={
      pumpList:[],
      visible: false,
      block:false,
      dataList:[],
      errItem:'',
      activeItem:{}
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
 async init(){
   const res=await GET('http://39.98.215.185:8088/api/alarmsetting/list');
   if(res.code == '200'){
     let allData = res.data[0].config;
     const Authorization=getCookie("Authorization");

     allData = JSON.parse(allData)
     let dataList = [];
     POST('/wTimeData/listForEach',{},Authorization).then((res)=>{
         if(res.code === 200){

           res.data.timeDataList.forEach((v,i)=>{
             let obj = allData[i];
             obj['RUNNING_STATE'] = v['RUNNING_STATE'];
             let warncount = [];
             obj.arr.forEach((item,i)=>{
               if(item.value==="IMPORT_PRESSURE"||item.value==="LUBRICATING_OIL_LEVEL"){
                 if(v[item.value] < obj.arr[i].age){
                   if(obj['RUNNING_STATE'] == 1&&obj.arr[i].state == 1){

                     obj.arr[i].block = true;
                     let objData=obj.arr[i];
                     let warnitem  = {
                       nodename:obj.title,
                     // time:moment().format('YYYY-MM-DD hh:mm:ss'),
                     // targetname:obj.arr[i].name,
                     nodeid:v['index'],
                     name:obj.arr[i].name,
                     key:objData.value,
                     curvalue:v[item.value],
                     bzvalue:objData.age,
                     col:obj.arr[i].value
                   }
                     warncount.push(warnitem);
                   }else{
                     obj.arr[i].block = false;
                   }

                 }else{

                   obj.arr[i].block = false;
                 }
               }else{
                 if(v[item.value] > obj.arr[i].age){
                   if(obj['RUNNING_STATE'] == 1&&obj.arr[i].state == 1){
                     obj.arr[i].block = true;
                     let objData=obj.arr[i];
                     let warnitem  = {
                       nodename:obj.title,
                     // time:moment().format('YYYY-MM-DD hh:mm:ss'),
                     // targetname:obj.arr[i].name,
                     nodeid:v['index'],
                     name:obj.arr[i].name,
                     key:objData.value,
                     curvalue:v[item.value],
                     bzvalue:objData.age,
                     col:obj.arr[i].value
                   }
                     warncount.push(warnitem);
                   }else{
                     obj.arr[i].block = false;
                   }

                 }else{

                   obj.arr[i].block = false;
                 }
               }

               obj.arr[i].num = v[item.value];
             })

             if(warncount.length>0){
               obj.block = true;

               let warnlist = JSON.parse(localStorage.getItem('warnlist') || '[]');
               warnlist = warnlist.concat(warncount)
               obj.errItem = warncount[0].col
               localStorage.setItem("warnlist",JSON.stringify(warnlist))

               // console.log(warncount);
               warncount.forEach((v,i)=>{
                 GET('http://39.98.215.185:8088/api/alarmlog/add',{
                  ...v
                 })
               })

             }
             dataList.push(obj);

           })
           this.setState({
             dataList:dataList
           })
         }
     })
   }

  }

  popBlock(item){
    if(!item.block){
      return
    }
    this.setState({visible:true,errItem:item.errItem,activeItem:item})
    setCookie('infor',[])
  }

  handleOk = e => {

    this.setState({
      visible: false,
    });
    let pause=document.querySelector('.vio');
    pause.pause();
  };

  buildVideBox(opt){
    let {activeItem}=this.state;
    let typeBat=['CYLINDER1_NOISE','CYLINDER2_NOISE','CYLINDER3_NOISE','CYLINDER4_NOISE','CYLINDER5_NOISE'];
     if(this.state.errItem==='TEMPERATURE'){
      return (<div>
        <p>{`报警:1#注水泵的电机温度传感器`}<span className="tips">报警</span></p>
        <p>处理措施：1、&nbsp;&nbsp;&nbsp;&nbsp;{`检查电机润滑脂的注入量及品质"`}</p>
        <p><span className="cuoshi"></span>1、&nbsp;&nbsp;&nbsp;&nbsp;{`检查电机状态`}</p>
        <p><span className="cuoshi"></span>1、&nbsp;&nbsp;&nbsp;&nbsp;{`与专业人员联系`}</p>
          <video className="vio"    data-v-68781f9a="" controls="controls" width="100%" src="http://119.90.248.34:51029/video/001启动前的准备2043.mp4?t=Sun Sep 22 2019 04:21:35 GMT+0800 (中国标准时间)">
            <object data-v-68781f9a="" width="100%">
                <embed data-v-68781f9a="" width="100%" src="/video/001启动前的准备2043.swf?t=Sun Sep 22 2019 04:21:35 GMT+0800 (中国标准时间)"/>
            </object>
          </video>
      </div>)
    }else if(this.state.errItem==='EXPORT_PRESSURE'){
      return (<div>
        <p>{`报警:${activeItem.title}的排出压力传感器报警`}<span className="tips">报警</span></p>
        <p>处理措施：1、&nbsp;&nbsp;{`${activeItem.title}的外输管线流程`}</p>
        <p><span className="cuoshi"></span>2、&nbsp;&nbsp;{`${activeItem.title}的外输管线闸门是否开启`}</p>
          <video className="vio"    data-v-68781f9a="" controls="controls" width="100%" src="http://119.90.248.34:51029/video/001启动前的准备2043.mp4?t=Sun Sep 22 2019 04:21:35 GMT+0800 (中国标准时间)">
            <object data-v-68781f9a="" width="100%">
                <embed data-v-68781f9a="" width="100%" src="http://119.90.248.34:51029/video/001启动前的准备2043.mp4?t=Fri Sep 27 2019 21:21:56 GMT+0800 (中国标准时间)"/>
            </object>
          </video>
      </div>)
    }
    else if(this.state.errItem==='IMPORT_PRESSURE'){
      return (<div>
        <p>{`报警:${activeItem.title}的吸入压力传感器报警`}<span className="tips">报警</span></p>
        <p>处理措施：1、&nbsp;&nbsp;&nbsp;&nbsp;{`${activeItem.title}的来水管线压力、流量`}</p>
          <video className="vio"    data-v-68781f9a="" controls="controls" width="100%" src="http://119.90.248.34:51029/video/001启动前的准备2043.mp4?t=Sun Sep 22 2019 04:21:35 GMT+0800 (中国标准时间)">
            <object data-v-68781f9a="" width="100%">
                <embed data-v-68781f9a="" width="100%" src="http://119.90.248.34:51029/video/001启动前的准备2043.mp4?t=Fri Sep 27 2019 21:21:56 GMT+0800 (中国标准时间)"/>
            </object>
          </video>
      </div>)

    }
    else if(this.state.errItem==='MOTOR_TEMPERATURE'){
      return (<div>
        <p>{`报警:${activeItem.title}的电机温度传感器报警`}<span className="tips">报警</span></p>
        <p>处理措施：1、&nbsp;&nbsp;&nbsp;&nbsp;{`检查电机润滑脂的注入量及品质"`}</p>
        <p><span className="cuoshi"></span>2、&nbsp;&nbsp;&nbsp;&nbsp;{`检查电机状态`}</p>
        <p><span className="cuoshi"></span>3、&nbsp;&nbsp;&nbsp;&nbsp;{`与专业人员联系"`}</p>
      </div>)
    }
    else if(this.state.errItem==='LUBRICATING_OIL_TEMPERATURE'){
      return (<div>
        <p>{`报警:${activeItem.title}的润滑油温度传感器报警`}<span className="tips">报警</span></p>
        <p>处理措施：1、{`更换润滑油"`}</p>
        <p><span className="cuoshi"></span>2、{`检查润滑油油窗液位`}</p>
        <p><span className="cuoshi"></span>3、{`与专业人员联系"`}</p>
      </div>)
    }
    else if(this.state.errItem==='IMPORT_PRESSURE'){
      return (<div>
        <p>{`报警:${activeItem.title}的吸入压力传感器报警`}<span className="tips">报警</span></p>
        <p>处理措施：1、{`${activeItem.title}的来水管线压力、流量`}</p>
          <video className="vio"    data-v-68781f9a="" controls="controls" width="100%" src="http://119.90.248.34:51029/video/001启动前的准备2043.mp4?t=Sun Sep 22 2019 04:21:35 GMT+0800 (中国标准时间)">
            <object data-v-68781f9a="" width="100%">
                <embed data-v-68781f9a="" width="100%" src="http://119.90.248.34:51029/video/001启动前的准备2043.mp4?t=Fri Sep 27 2019 21:21:56 GMT+0800 (中国标准时间)"/>
            </object>
          </video>
      </div>)

    }
    else if(this.state.errItem==='LUBRICATING_OIL_LEVEL'){

      return (<div>
        <p>{`报警:${activeItem.title}的泵体油液位传感器报警`}<span className="tips">报警</span></p>
        <p>处理措施：1、{`${activeItem.title}的挡油头油封`}</p>
        <p><span className="cuoshi"></span>2、{`${activeItem.title}的曲轴油封`}</p>
        <p><span className="cuoshi"></span>3、{`${activeItem.title}的添加润滑油`}</p>
        <p><span className="cuoshi"></span>4、{`与专业人员联系`}</p>
          <video className="vio"    data-v-68781f9a="" controls="controls" width="100%" src="http://119.90.248.34:51029/video/015挡油头拆解2043.mp4?t=Fri Sep 27 2019 21:39:50 GMT+0800 (中国标准时间)">
            <object data-v-68781f9a="" width="100%">
                <embed data-v-68781f9a="" width="100%" src="http://119.90.248.34:51029/video/015挡油头拆解2043.mp4?t=Fri Sep 27 2019 21:39:50 GMT+0800 (中国标准时间)"/>
            </object>
          </video>
          <video className="vio"    data-v-68781f9a="" controls="controls" width="100%" src="http://119.90.248.34:51029/video/010曲轴油封拆解2043.mp4?t=Fri Sep 27 2019 21:40:20 GMT+0800 (中国标准时间)">
            <object data-v-68781f9a="" width="100%">
                <embed data-v-68781f9a="" width="100%" src="http://119.90.248.34:51029/video/010曲轴油封拆解2043.mp4?t=Fri Sep 27 2019 21:40:20 GMT+0800 (中国标准时间)"/>
            </object>
          </video>
      </div>)

    }
    else if(this.state.errItem==='MOTOR_A_PHASE_CURRENT'){
      return (<div>
        <p>{`报警:${activeItem.title}的电机A相电流报警`}<span className="tips">报警</span></p>
        <p>处理措施：1、{`${activeItem.title}的出口管线`}</p>
        <p><span className="cuoshi"></span>2、{`${activeItem.title}注水泵电机`}</p>
        <p><span className="cuoshi"></span>3、{` 与专业人员联系`}</p>
      </div>)
    }else if(this.state.errItem==='MOTOR_B_PHASE_CURRENT'){
      return (<div>
        <p>{`报警:${activeItem.title}的电机B相电流报警`}<span className="tips">报警</span></p>
        <p>处理措施：1、{`${activeItem.title}的出口管线`}</p>
        <p><span className="cuoshi"></span>2、{`${activeItem.title}注水泵电机`}</p>
        <p><span className="cuoshi"></span>3、{`与专业人员联系`}</p>
      </div>)
    }
    else if(this.state.errItem==='MOTOR_C_PHASE_CURRENT'){
      return (<div>
        <p>{`报警:${activeItem.title}的电机C相电流报警`}<span className="tips">报警</span></p>
        <p>处理措施：1、{`${activeItem.title}的出口管线`}</p>
        <p><span className="cuoshi"></span>2、{`${activeItem.title}注水泵电机`}</p>
        <p><span className="cuoshi"></span>3、{`与专业人员联系`}</p>
      </div>)
    } else if(typeBat.includes(this.state.errItem)){
      let barInx=typeBat.indexOf(this.state.errItem)
      return (<div>
        <p>{`报警:${activeItem.title}${this.state.errItem.replace(/[^\d]/g,'')}#缸泵头噪声传感器报警`}<span className="tips">报警</span></p>
        <p>处理措施：{`1、${activeItem.title}的${this.state.errItem.replace(/[^\d]/g,'')}#缸弹簧`}</p>
        <p><span className="cuoshi"></span>{`2、${activeItem.title}的${this.state.errItem.replace(/[^\d]/g,'')}#缸阀片`}</p>
        <p><span className="cuoshi"></span>{`3、${activeItem.title}的${this.state.errItem.replace(/[^\d]/g,'')}#缸阀体`}</p>
          <video className="vio"    data-v-68781f9a="" controls="controls" width="100%" src="http://119.90.248.34:51029/video/009泵头拆解教程2043.mp4?t=Fri Sep 27 2019 21:54:33 GMT+0800 (中国标准时间)">
            <object data-v-68781f9a="" width="100%">
                <embed data-v-68781f9a="" width="100%" src="http://119.90.248.34:51029/video/009泵头拆解教程2043.mp4?t=Fri Sep 27 2019 21:54:33 GMT+0800 (中国标准时间)"/>
            </object>
          </video>
      </div>)

    }else if(this.state.errItem.indexOf('NOISE')>-1){
    return (<div>
      <p>{`报警:1#注水泵 1#缸泵头噪声传感器`}<span className="tips">报警</span></p>
      <p>处理措施：{`1、1#注水泵 1#缸阀弹簧可能损坏`}</p>
      <p><span className="cuoshi"></span>{`2、1#注水泵 1#缸的阀片可能损坏`}</p>
      <p><span className="cuoshi"></span>{`3、1#注水泵 1#缸的阀体可能损坏`}</p>
        <video className="vio"  className="vio"  data-v-68781f9a="" controls="controls" width="100%" src="http://119.90.248.34:51029/video/001启动前的准备2043.mp4?t=Sun Sep 22 2019 04:21:35 GMT+0800 (中国标准时间)">
          <object data-v-68781f9a="" width="100%">
              <embed data-v-68781f9a="" width="100%" src="http://119.90.248.34:51029/video/009%E6%B3%B5%E5%A4%B4%E6%8B%86%E8%A7%A3%E6%95%99%E7%A8%8B2043.mp4?t=Sun%20Sep%2022%202019%2017:15:02%20GMT+0800%20(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)"/>
          </object>
        </video>
    </div>)
  }else if(this.state.errItem.indexOf('LUBRICATING_OIL_TEMPERATURE')>-1){
    return (<div>
      <p>{`报警:1#注水泵的泵体油液位传感器`}<span className="tips">报警</span></p>
      <p>处理措施：{`1、更换1#注水泵的挡油头油封`}</p>
      <p><span className="cuoshi"></span>{`2、1#注水泵添加润滑油`}</p>
      <p><span className="cuoshi"></span>{`3、与专业人员联系`}</p>
        <video className="vio"  className="vio"  data-v-68781f9a="" controls="controls" width="100%" src="http://119.90.248.34:51029/video/001启动前的准备2043.mp4?t=Sun Sep 22 2019 04:21:35 GMT+0800 (中国标准时间)">
          <object data-v-68781f9a="" width="100%">
              <embed data-v-68781f9a="" width="100%" src="http://119.90.248.34:51029/video/010%E6%9B%B2%E8%BD%B4%E6%B2%B9%E5%B0%81%E6%8B%86%E8%A7%A32043.mp4?t=Sun%20Sep%2022%202019%2017:12:57%20GMT+0800%20(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)"/>
          </object>
        </video>
    </div>)
  }
}
  handleCancel = e => {

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

        <div className="allData" style={{backgroundColor: "#fff"}}>
          <div className="topAllData">
          <BreadcrumbCustom first="数据总览" second="总览数据" />
          <CountdNum/>
          </div>

          <div className="allData_m">
            <h3>华北油田采油三厂楚一联合注水站监控中心</h3>
            <div className="allData_t" >
              <ul>
              {
                this.state.dataList.map((itemm,i)=>(

                  <li className="list" key={i}>
                    {itemm.RUNNING_STATE==1?<Button type="primary">运行</Button>:<Button type="danger">停止</Button>}

                  <img src={pump} alt="" />
                  <List
                    header={<div onClick={this.popBlock.bind(this,itemm)} className={itemm.block?'headerList':""}>{itemm.title}</div>}
                    bordered
                    dataSource={itemm.arr}
                    renderItem={(item) => {

                        return(<List.Item>
                          <Typography.Text mark></Typography.Text>
                          {item.name}:{item.num}{item.ut}
                        </List.Item>)

                    }}
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
