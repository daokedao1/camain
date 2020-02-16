import React from 'react'
import { Button,Row, Col, Car, Card} from 'antd';

class Demo extends React.Component {
  constructor(props){
    super(props)
    this.state={
      count:10
    }
   let timerCount = setInterval(() => {
      this.setState((preState) =>({
        count: preState.count-1,
      }),() => {

        if(this.state.count === -1){
          this.setState({count:10})
          // clearInterval(this.timerCount);
        }
      });
    }, 1000)
  }
  render() {
    return (
          <Button type="primary">{`${this.state.count}秒后自动刷新`}</Button>
    )
  }
}

export default Demo
