import React from 'react'
import BreadcrumbCustom from '../BreadcrumbCustom';
import {POST} from '../../axios/tools'
import {getCookie,setCookie,clone} from '../../utils/index'
import pumpinfor from '@/style/imgs/泵信息.png'
import { Table,Button,Tabs,List,Modal} from 'antd';
import '../../style/waterData/realData.less'
import moment from 'moment';

const Authorization  = getCookie("Authorization");
const { TabPane } = Tabs;




class Demo extends React.Component {
  constructor(props){
    super(props);
    this.state={
      pumpList:[],
      visible: false,
      block:false,
      dataList:[],
      errItem:'',
      activeItem:{},
      url:'',
    };
  }

  getLastData(){
    console.log(Authorization);
    POST('/wTimeData/listForEach',{},Authorization).then((res)=>{
        if(res.code == 200 && res.data.timeDataList){
          let dataList = res.data.timeDataList;
            this.setState({
              datalist1:dataList.slice(0,3),
              dataList2:dataList.slice(3,6),
              dataList3:[],
              dataList:''
            })
        }
    })
  }
  handleCancel = e => {

    this.setState({
      visible: false,
    });
    let pause=document.querySelector('.vio');
    pause.pause();
  }
  cliVideo(item){
    this.setState({
      visible: true,
      url:item
    });
  }
  buildVideBox(opt){
      return (<div>
          <video className="vio"    data-v-68781f9a="" controls="controls" width="100%" src={this.state.url}>
            <object data-v-68781f9a="" width="100%">
                <embed data-v-68781f9a="" width="100%" src={this.state.url}/>
            </object>
          </video>
      </div>)
      }
  ontabChange(){

  }
  render() {
    const columnsBig=[
      {
        title: '零部件名称',
        dataIndex: 'name',
        width: 120,
        
      },
      {
        title: '处理措施',
        dataIndex: 'age',
        width: 260,
        render: (value, row, index) => {
          const obj = {
            children: value,
            props: {},
          };
          if (index === 1) {
            obj.props.rowSpan = 3;
          }
          if (index === 2||index === 3) {
            obj.props.rowSpan = 0;
          }
          
          return obj;
        },
      },
      {
        title: '视频链接',
        dataIndex: 'tel',
        width: 190,

        render: (value, row, index) => {
          const obj = {
            children: value,
            props: {},
          };
          if (index === 1) {
            obj.props.rowSpan = 3;
          }
          if (index === 2||index === 3) {
            obj.props.rowSpan = 0;
          }
          return obj;
        },
      }
    ]
    const columns = [
      {
        title: '零部件名称',
        dataIndex: 'name',
        width: 120,
        
      },
      {
        title: '处理措施',
        dataIndex: 'age',
        width: 260,
        render: (value, row, index) => {
          const obj = {
            children: value,
            props: {},
          };
          if (index === 0) {
            obj.props.rowSpan = 5;
          }
          if(index===1||index===2||index===3||index===4||index===6||index===8){
            obj.props.rowSpan = 0;

          }
          if (index === 5) {
            obj.props.rowSpan = 2;
          }
          if (index === 7) {
            obj.props.rowSpan = 2;
          }
          return obj;
        },
      },
      {
        title: '视频链接',
        dataIndex: 'tel',
        width: 190,

        render: (value, row, index) => {
          const obj = {
            children: value,
            props: {},
          };
          if (index === 0) {
            obj.props.rowSpan = 5;
          }
          if(index===1||index===2||index===3||index===4||index===6||index===8){
            obj.props.rowSpan = 0;

          }
          if (index === 5) {
            obj.props.rowSpan = 2;
          }
          if (index === 7) {
            obj.props.rowSpan = 2;
          }
          return obj;
        },
      }
    ];
    const dataBig=[
      {
        key: '1',
        name: '十字头',
        age: <div> <p data-v-68781f9a="">1、更换十字头</p> <p data-v-68781f9a="">2、修复狮子头滑道</p> <p data-v-68781f9a="">3、与专业人员联系</p></div>,
        tel: <div onClick={()=>(this.cliVideo("http://119.90.248.34:51029/video/013十字头拆解2043.mp4?t=Mon Oct 07 2019 09:09:01 GMT+0800 (中国标准时间)"))} className="video-text"><img height="30" src="http://119.90.248.34:51029/static/video-icon.png" className="video-icon"/>十字头拆解教程</div>,
      },
      {
        key: '2',
        name: '连杆',
        age: <div><p data-v-68781f9a="">1、更换润滑油</p> <p data-v-68781f9a="">2、检查润滑油油窗液位</p> <p data-v-68781f9a="">3、检查曲轴和连杆瓦的间隙，十字头与箱体间隙</p></div>,
        tel: <div onClick={()=>(this.cliVideo("http://119.90.248.34:51029/video/014连杆拆解2043.mp4?t=Mon Oct 07 2019 09:10:23 GMT+0800 (中国标准时间)"))} className="video-text"><img height="30" src="http://119.90.248.34:51029/static/video-icon.png" className="video-icon"/>连杆拆解教程</div>,

      },
      {
        key: '3',
        name: '连杆瓦',
      },
      {
        key: '4',
        name: '曲轴',
      }
    ];
    const data = [
      {
        key: '1',
        name: '吸入阀弹簧',
        age: <div><p data-v-68781f9a="">1、更换损坏吸入阀弹簧</p> <p data-v-68781f9a="">2、更换损坏吸入阀片</p> <p data-v-68781f9a="">3、更换损坏阀体</p> <p data-v-68781f9a="">4、更换损坏排出阀弹簧</p> <p data-v-68781f9a="">5、更换损坏排出阀片</p></div>,
        tel: <div onClick={()=>(this.cliVideo("http://119.90.248.34:51029/video/009泵头拆解教程2043.mp4?t=Sun Oct 06 2019 17:22:38 GMT+0800 (中国标准时间)"))} className="video-text"><img height="30" src="http://119.90.248.34:51029/static/video-icon.png" className="video-icon"/>泵头拆解教程</div>,
      },
      {
        key: '2',
        name: '吸入阀片',
      },
      {
        key: '3',
        name: '阀体',
      },
      {
        key: '4',
        name: '排出阀弹簧',
      },
      {
        key: '5',
        name: '排出阀片',
      },
      {
        key: '6',
        name: '盘根',
        age:  <div><p data-v-68781f9a="">1、更换盘根密封填料</p> <p data-v-68781f9a="">2、调节压盖松紧</p> <p data-v-68781f9a="">3、更换柱塞</p></div>,
        tel: <div onClick={()=>(this.cliVideo("http://119.90.248.34:51029/video/016盘根盒拆解2043.mp4?t=Sun Oct 06 2019 17:38:31 GMT+0800 (中国标准时间)"))} className="video-text"><img height="30" src="http://119.90.248.34:51029/static/video-icon.png" className="video-icon"/>盘根盒拆解教程</div>,


    
      },
      {
        key: '7',
        name: '柱塞',
      },
      {
        key: '8',
        name: '挺杆',
        age: <div><p data-v-68781f9a="">1、观察曲轴油封</p> <p data-v-68781f9a="">2、更换曲轴油封</p> <p data-v-68781f9a="">3、添加润滑油</p></div>,
        tel: <div onClick={()=>(this.cliVideo("http://119.90.248.34:51029/video/015挡油头拆解2043.mp4?t=Sun Oct 06 2019 17:41:18 GMT+0800 (中国标准时间)"))} className="video-text"><img height="30" src="http://119.90.248.34:51029/static/video-icon.png" className="video-icon"/>挡油头拆解教程</div>,

      },
      {
        key: '9',
        name: '挡油头油封',

      },
      {
        key: '10',
        name: '曲轴油封',
        age:<div>    <p data-v-68781f9a="">1、观察曲轴油封</p> <p data-v-68781f9a="">2、更换曲轴油封</p></div>,
        tel: <div onClick={()=>(this.cliVideo("http://119.90.248.34:51029/video/010曲轴油封拆解2043.mp4?t=Sun Oct 06 2019 17:42:23 GMT+0800 (中国标准时间)"))} className="video-text"><img height="30" src="http://119.90.248.34:51029/static/video-icon.png" className="video-icon"/>曲轴油封拆解教程</div>,
      },  
      {
        key: '11',
        name: '皮带',
         age:<p data-v-68781f9a="">1、更换皮带</p>,
        tel: <div onClick={()=>(this.cliVideo("http://119.90.248.34:51029/video/011皮带拆解2043.mp4?t=Sun Oct 06 2019 17:43:04 GMT+0800 (中国标准时间)"))} className="video-text"><img height="30" src="http://119.90.248.34:51029/static/video-icon.png" className="video-icon"/>皮带拆解教程</div>,


      },
      {
        key: '12',
        name: '电机',
        age: <div>    <p data-v-68781f9a="">1、检查电机润滑脂的注入量及品质</p> <p data-v-68781f9a="">2、检查电机状态</p> <p data-v-68781f9a="">3、检查电网</p></div>,
        tel: <div onClick={()=>(this.cliVideo("http://119.90.248.34:51029/video/012电机拆解2043.mp4?t=Sun Oct 06 2019 17:43:50 GMT+0800 (中国标准时间)"))} className="video-text"><img height="30" src="http://119.90.248.34:51029/static/video-icon.png" className="video-icon"/>电机拆解教程</div>,
        
     
      },
    ];
    
    const pop_b=<Modal
    title="培训视频"
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
    
    const course_r={
      opretion:[
        {
          title:"1、注水泵启动前准备",
          url:"http://119.90.248.34:51029/video/001启动前的准备2043.mp4?t=Sun Oct 06 2019 17:19:39 GMT+0800 (中国标准时间)"
        },
        {
          title:"2、注水泵启动与运转",
          url:"http://119.90.248.34:51029/video/002启动与运转2043.mp4?t=Sun Oct 06 2019 17:19:58 GMT+0800 (中国标准时间)"
        },
        {
          title:"3、注水泵停运",
          url:"http://119.90.248.34:51029/video/003泵的停运2043.mp4?t=Sun Oct 06 2019 17:20:15 GMT+0800 (中国标准时间)"
        },
        {
          title:"4、注水泵启动注意事项",
          url:"http://119.90.248.34:51029/video/004注意事项2043.mp4?t=Sun Oct 06 2019 17:20:27 GMT+0800 (中国标准时间)"
        }
      ],
      days:[
        {
          title:"1、例行日常保养",
          url:"http://119.90.248.34:51029/video/005例行日常保养2043.mp4?t=Sun Oct 06 2019 17:20:41 GMT+0800 (中国标准时间)"
        },
        {
          title:"2、一级保养",
          url:"http://119.90.248.34:51029/video/006一级保养2043.mp4?t=Sun Oct 06 2019 17:20:51 GMT+0800 (中国标准时间)"
        },
        {
          title:"3、二级保养",
          url:"http://119.90.248.34:51029/video/007二级保养2043.mp4?t=Sun Oct 06 2019 17:21:00 GMT+0800 (中国标准时间)"
        },
        {
          title:"4、三级保养",
          url:"http://119.90.248.34:51029/video/008三级保养2043.mp4?t=Sun Oct 06 2019 17:21:10 GMT+0800 (中国标准时间)"
        }
      ]
    }

    return (
      // <img src="/images/cjsp.jpeg" width="100%" alt=""/>
        <div className="courseContent">
          <BreadcrumbCustom first="注水泵实时数据" second="拆解培训教程" />
          <div className="course">
            <div className="course_l">
            <Button type="primary">操作规范</Button>
            <div className="content">
            {
              course_r.opretion.map((v,i)=>(
                <div key={i} className="box">
                <div data-v-68781f9a="" className="subtitle">{v.title}</div> 
                <div onClick={()=>this.cliVideo(v.url)} data-v-68781f9a="" className="video-block">播放视频</div>
                </div>
              ))
            }

            </div>
            <Button style={{marginTop:"30px"}} type="primary">日产保养</Button>
            <div className="content">
            {
              course_r.days.map((v,i)=>(
                <div key={i} className="box">
                <div data-v-68781f9a="" className="subtitle">{v.title}</div> 
                <div onClick={()=>this.cliVideo(v.url)} data-v-68781f9a="" className="video-block">播放视频</div>
                </div>
              ))
            }

            </div>


            </div>
            <div className="course_r">
            <Button  type="primary">注水泵总成</Button>
            <div className="">
              <p>常见故障</p>
              <Table columns={columns} pagination={false} size="small" dataSource={data} bordered />
            </div>
            <div className="">
              <p>大修故障</p>
              <Table columns={columnsBig} pagination={false} size="small" dataSource={dataBig} bordered />
            </div>
            </div>
          </div>
          {pop_b}

        </div>
    )
  }
}

export default Demo
