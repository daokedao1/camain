import React from 'react';
import { Row,Col} from 'antd';
import './index.less';
class Header extends React.Component {
    constructor(props) {
        super(props);

    }
    onDateChange(){

    }
    render(){
        return(
            <Row gutter={14} style={{backgroundColor:'#fff',marginLeft:'0px',marginRight:'0px'}}>
                <Col className="gutter-row" md={24}>
                    <div className="common-header">
                        <div className="htitle">{this.props.title}</div>
                        <div className="hcenter">{this.props.content||''}</div>
                        <div className="hextr">{this.props.extra}</div>
                    </div>
                </Col>
            </Row>

        );
    }
}
export default Header;