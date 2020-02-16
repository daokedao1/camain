import React from 'react';
import {Card,Row,Col} from 'antd';
import './index.css'

class DataOverView extends React.Component {
    constructor(props) {
      super(props);
      this.state = {

      }
    }
    callback(key) {
      console.log(key);
    }
    render() {
        const content = (
          <div>

                <p style={{textAlign:'center'}}><h3>注水泵1#(<span className="green">运行中</span>)</h3></p>
                <p><span className="title">出口压力 ：</span><span className="blue">22.75MPa</span></p>
                <p><span className="title">进口压力：</span><span className="blue">0.35MPa</span></p>
                <p><span className="title">电机温度：</span><span className="blue">111℃</span></p>
                <p><span className="title">润滑油温度：</span><span className="blue">66℃</span></p>
                <p><span className="title">润滑油液位:</span><span className="blue"> 5.1CM</span></p>
                <p><span className="title">电机A相电流：</span><span className="red">238.60A</span></p>
                <p><span className="title">电机B相电流：</span><span className="red">238.60A</span></p>
                <p><span className="title">电机8相电流：</span><span className="blue">238.60A</span></p>

          </div>
        )
        return (
            <div className="gutter-example">
              <div style={{width:'100%',textAlign:'center'}}><h2>华北油田采油三厂楚一联合注水站监控中心</h2></div>
            <Row gutter={16}>
               <Col span={4}>
                 <Card
                    bordered={false}
                    hoverable
                    cover={
                        <img
                          height={150}
                          width={80}
                          alt="example"
                          src="/images/head.png"
                        />
                      }
                    >
                   {content}
                 </Card>
               </Col>
               <Col span={4}>
                 <Card
                    bordered={false}
                    hoverable
                    cover={
                        <img
                          height={150}
                          width={100}
                          alt="example"
                          src="/images/head.png"
                        />
                      }
                    >
                    <div>
                        <p style={{textAlign:'center'}}><h3>注水泵1#(<span className="red">已停止</span>)</h3></p>
                        <p><span className="title">出口压力 ：</span><span className="blue">22.75MPa</span></p>
                        <p><span className="title">进口压力：</span><span className="blue">0.35MPa</span></p>
                        <p><span className="title">电机温度：</span><span className="blue">111℃</span></p>
                        <p><span className="title">润滑油温度：</span><span className="blue">66℃</span></p>
                        <p><span className="title">润滑油液位:</span><span className="blue"> 5.1CM</span></p>
                        <p><span className="title">电机A相电流：</span><span className="red">238.60A</span></p>
                        <p><span className="title">电机B相电流：</span><span className="red">238.60A</span></p>
                        <p><span className="title">电机8相电流：</span><span className="blue">238.60A</span></p>

                    </div>
                 </Card>
               </Col>
               <Col span={4}>
                 <Card
                    bordered={false}
                    hoverable
                    cover={
                        <img
                          height={150}
                          width={100}
                          alt="example"
                          src="/images/head.png"
                        />
                      }
                    >
                   {content}
                 </Card>
               </Col>
               <Col span={4}>
                 <Card
                    bordered={false}
                    hoverable
                    cover={
                        <img
                          height={150}
                          width={100}
                          alt="example"
                          src="/images/head.png"
                        />
                      }
                    >
                   {content}
                 </Card>
               </Col>
               <Col span={4}>
                 <Card
                    bordered={false}
                    hoverable
                    cover={
                        <img
                          height={150}
                          width={100}
                          alt="example"
                          src="/images/head.png"
                        />
                      }
                    >
                   {content}
                 </Card>
               </Col>
               <Col span={4}>
                 <Card
                    bordered={false}
                    hoverable
                    cover={
                        <img
                          height={150}
                          width={100}
                          alt="example"
                          src="/images/head.png"
                        />
                      }
                    >
                   {content}
                 </Card>
               </Col>

              </Row>
            </div>
        )
    }
}

export default DataOverView;
