import React from 'react';
import './index.less';
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state={

        };
    }
    onDateChange(){

    }
    render(){
        return(
            <div className="common-header">
                <div className="htitle">{this.props.title}</div>
                <div className="hcenter">{this.props.content||''}</div>
                <div className="hextr">{this.props.extra}</div>
            </div>
        );
    }
}
export default Header;