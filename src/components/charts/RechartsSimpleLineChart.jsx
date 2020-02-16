/**
 * Created by hao.cheng on 2017/4/21.
 */
import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,Brush} from 'recharts';
import { Col,Checkbox} from 'antd';

class RechartsSimpleLineChart extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.pumpList)

    }

    render(){

        return(
         <div>
        <Col md={21}>
        <ResponsiveContainer width="100%" height={190}>
                        <LineChart
                            data={this.props.pumpList}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}
                        >

                            <XAxis   dataKey="date" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Legend />
                            {
                                this.props.data.map((item,index)=>(

                                    item.show?<Line  key={index} type="monotone" name={item.name} key={item.name} dataKey={item.dataKey} stroke={item.stroke} activeDot={{r: 8}} />:''
                                ))
                            }
                          {
                              this.props.type=='1'? <Brush />:''
                          }
                        </LineChart>
                    </ResponsiveContainer>

        </Col>
        <Col md={3}>
            <div >
            { this.props.data.map((item,index)=>(
                <div>
                <Checkbox checked={item.show} key={index} onChange={()=>this.props.change(item)}>{item.name}</Checkbox>
                </div>
            ))
            }
            </div>
        </Col>
     </div>

        )
    }
}
// const RechartsSimpleLineChart = () => (

// );

export default RechartsSimpleLineChart;
