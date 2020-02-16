import React from 'react'

class Demo extends React.Component {
  constructor(props){
    super(props);
    this.state={
     count:0
    }
    this.loading();
  }
  render() {
    const {count}=this.state;
    return (
      <div>{count}</div>
    )
  }
  loading(){
    if(this.props.init){
      setInterval(()=>{
        this.props.init()
      },1000)
    }
  }
}

export default Demo