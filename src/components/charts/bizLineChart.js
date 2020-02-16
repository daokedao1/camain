import React from 'react'

import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import moment from 'moment';

const scale = {
  date: {
    range: [0, 1],
    type:'time',
    formatter:(v)=>{
      return moment(v).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
class BizLineChart extends React.Component {
  render(){
    return (
      <div>
      <Chart padding={[25, 'auto', 25, 'auto']} height={180} data={this.props.data||[]} scale={scale} forceFit>
      <Legend  position="right-center" layout="vertical" />
      <Axis name="date" />
        <Tooltip
            crosshairs={{
              type: "y"
            }}
          />

        <Geom
          type="line"
          position={this.props.position}
          size={2}
          color={"type"}
          forceFit
          />

      </Chart>
      </div>
    )
  }
}
export default BizLineChart;
