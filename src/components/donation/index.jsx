import React from 'react';
import {Card, Col, Row, message,Button,Spin} from 'antd';
import ReactQuill from 'react-quill';
import {getConfigBykey,updateConfigBykey} from '@/axios';
import Header from './../layout/Header';
import Quill from 'quill';

import 'react-quill/dist/quill.snow.css'; // ES6
import {toolbarOptions} from '@/serve.js';



class Donation extends React.Component {
    constructor(props){
        super(props);
        this.state={
            height:window.innerHeight-150,
            id:'',
            key:'',
            info:'',
            value:'',
            loading:false
        };
    }
    componentWillMount(){
        window.onresize = () => {
            this.getClientWidth();
        };
    }
    getClientWidth(){
        this.setState({
            height:window.innerHeight-150
        });
    }
    componentDidMount(){

        this.init();
    }
    componentDidUpdate(){
        if(this.state.loading){
            this.save();
        }
    }
    init(){
        getConfigBykey('contribution').then(res=>{
            if(res.success){
                this.setState({
                    id:res.data.id,
                    key:res.data.key,
                    info:res.data.info,
                    value:res.data.value
                });

            }
        });
    }
    save(){
        let {id,key,value,info} = this.state;
        let param = {
            id:id,
            key:key,
            info:info,
            value:value
        };
        updateConfigBykey(param).then(res=>{
            if(res.success){
                message.success('保存成功');
                this.setState({
                    loading:false
                });

            }else{
                message.warn('保存失败');
            }
        });
    }
    onSaveClick(){
        this.setState({
            loading:true
        });
    }
    onChange(value){
        this.setState({
            value:value
        });
    }
    render() {
        var Size = Quill.import('attributors/style/size');
        Size.whitelist = [ '12px', '14px', '16px', '18px', '20px'];
        // Size.whitelist = ['0.26rem', '0.31rem', '0.37rem', '0.41rem', '0.47rem', '0.52rem'];
        Quill.register(Size, true);
        return (
            <div className="content" >
                <div>
                    <Spin spinning={this.state.loading}>
                        <Row style={{background:'#fff'}}>
                            <Col span={24}>
                                <Header title="校园捐赠" />
                                <Card  bordered={false} >

                                    <ReactQuill
                                        theme="snow"
                                        style={{height:this.state.height-200+'px'}}
                                        value={this.state.value || ''}
                                        onChange={this.onChange.bind(this)}
                                        modules={{toolbar:toolbarOptions}}
                                    // formats={formats}
                                    />

                                </Card>
                                <div style={{marginTop:'30px',marginBottom:'20px',textAlign:'center'}}>
                                    <Button onClick={this.onSaveClick.bind(this)} type="primary">保存</Button>
                                </div>
                            </Col>
                        </Row>
                    </Spin>
                </div>

            </div>
        );
    }
}

export default Donation;

