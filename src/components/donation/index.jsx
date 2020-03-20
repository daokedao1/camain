import React from 'react';
import {Card, Col, Row, message} from 'antd';

import ReactQuill from 'react-quill';

import {getArticleList} from '@/axios';

import Header from './../layout/Header';

import 'react-quill/dist/quill.snow.css'; // ES6
class Employment extends React.Component {
    constructor(props){
        super(props);
        this.state={
            content:'',
            loading:true
        };
    }
    componentDidMount(){
        
        this.init();
    }
  
    init(){
       
    }
    onChange(){

    }
    render() {

        return (
            <div className="content">
                <div>
              
                    <Row >
                        <Col span={24}>
                        <Header title="捐赠管理" />
                            <Card  bordered={false}>
                              
                                <ReactQuill
                                    theme="snow"
                                    value={this.state.content || ''}
                                    onChange={this.onChange.bind(this)}
                                    // modules={modules}
                                    // formats={formats}
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
              
            </div>
        );
    }
}

export default Employment;

