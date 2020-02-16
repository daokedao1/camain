import React from 'react';
import { Tabs,Table,Tag,Divider} from 'antd';
import {Link} from 'react-router-dom'

import Tencent from './Tencent';

const { TabPane } = Tabs;



class Main extends React.Component {
    constructor(props) {
      super(props);
      this.state = {

      }
    }
    callback(key) {
      console.log(key);
    }
     lx(){
      console.log(123123213)
  }
    render() {
      const columns = [
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
          render: text => <a>{text}</a>,
        },
        {
          title: '设备数量',
          dataIndex: 'num',
          key: 'num',
        },
        {
          title: '地址',
          dataIndex: 'address',
          key: 'address',
        },

        {
          title: '操作',
          key: 'action',
          render:(text, record) => (
             <span>
               {
                 record.action.map((v,i)=>{
                    return <Link style={{color:"#1890ff"}} to={'/app/waterData/allData'} key={i}>{v}</Link>
                 })
               }

             </span>
           )

        },
      ];

      const data = [
        {
          key: '1',
          name: '华北油田',
          num: 20,
          address: '华北地区',
          tags: ['正常'],
          action:[],
          children:[
            {
              key: '11',
              name: '华北油田采油三厂楚一联合注水站监控中心',
              num: 8,
              address: '河北省沧州',
              tags: ['正常'],
              action:['进入']
            },
            {
              key: '12',
              name: '华北油田采油三厂楚一联合注水站监控中心',
              num: 12,
              address: '河北省沧州',
              tags: ['正常'],
              action:['进入']
            },
          ]
        },
        {
          key: '2',
          name: '新疆油田',
          num: 4,
          address: '新疆地区',
          tags: ['正常'],
          action:[],
          children:[
            {
              key: '21',
              name: '新疆油田采油四厂注水站监控中心',
              num: 32,
              address: '新疆吐鲁番',
              tags: ['正常'],
              action:[],
            },
          ]
        },
        {
          key: '3',
          name: '辽河油田',
          num: 32,
          address: '辽宁',
          tags: ['正常'],
          action:[],
          children:[
            {
              key: '31',
              name: '辽河油田注水站监控中心',
              num: 32,
              address: '盘锦市',
              tags: ['正常'],
              action:[],

            },
          ]
        },
      ];
        return (
            <div className="gutter-example">

            <Tabs  defaultActiveKey="1" onChange={this.callback.bind(this)}>
              <TabPane tab="地图" key="1">
              <Tencent  />
               </TabPane>

               <TabPane tab="列表" key="2" style={{background:'#fff'}}>
                  <Table  columns={columns} dataSource={data} />
               </TabPane>

             </Tabs>
            </div>
        )
    }
}

export default Main;
