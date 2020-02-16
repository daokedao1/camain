import React from 'react'
import { Select,DatePicker,Button} from 'antd';
import '../../style/waterData/search.less'
const { Option } = Select;
class SearchList extends React.Component {
  constructor(props){
    super()
    console.log(props)
  }
  onChange(){

  }
  render() {
    const data=[{"address":"2","name":"1#注水泵","id":2, uv: 4000, pv: 2400, amt: 2400},{"address":"1","name":"2#注水泵","id":1, uv: 4000, pv: 2400, amt: 2400},{"address":"3","name":"3#注水泵","id":3, uv: 4000, pv: 2400, amt: 2400},{"address":"4","name":"4#注水泵","id":4, uv: 4000, pv: 2400, amt: 2400},{"address":"5","name":"5#注水泵","id":5, uv: 4000, pv: 2400, amt: 2400},{"address":"6","name":"6#注水泵","id":6},{"address":"7","name":"7#注水泵","id":7},{"address":"8","name":"8#注水泵","id":8}];
    return (
    <div className="search">
      <Select placeholder="请选择" style={{ width: 120 }} >
        {data.map((item,index)=>(
          <Option key={index} value="">{item.name}</Option>
        ))}
      </Select>
      {this.props.time ===1?'':<DatePicker className="middel" placeholder="请选择时间" onChange={this.onChange} />}

      <Button onClick={this.props.search} type="primary">查询</Button>
      {this.props.type==='1'? <Button type="primary">导出Excle</Button>:''}

    </div>
    )
  }
}

export default SearchList
