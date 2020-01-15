import React from 'react';
import {
    Form,
    Input,
    Select,
    DatePicker,
    Checkbox,
    Row,
    Col,
    Button
} from 'antd';
import moment from 'moment';
const { Option } = Select;
const { TextArea } = Input;
class InputFrom extends React.Component {
    constructor(props){
        super(props);
        this.state={

        };
    }
    dataChange(e,v){
        const { value } = e.target;
        const {params}=this.props;
        for(let key in params){
            if(key===v.val){
                params[key]=this.dataType(value,v.dataType);
            }
        }
    }
    defaultValueWay(v){
        const {params}=this.props;
        if(v.calculation){
            return this.props.indexWay&&this.props.indexWay(v);
        }
        else{
            for(let key in params){
                if(key===v.val){
                    return params[key];
                }
            }
        }
    }
    defaultSelectWay(v){
        const {params}=this.props;

        if(v.calculation){
            return this.props.indexWay&&this.props.indexWay(v);
        }
        else{
            for(let key in params){
                if(key===v.val){
                    return params[key].split(',');
                }
            }
        }
    }
    defaultTimeData(v){
        const {params}=this.props;
        for(let key in params){

            if(key===v.val){
                return  params[key]===''?false:moment(params[key],v.format);
            }
        }
    }
    timeDataChange(value,v){
        const {params}=this.props;
        let format=v.format?v.format:'YYYY-MM-DD HH:mm:ss';
        for(let key in params){
            if(key===v.val){
                params[key]=moment(value).format(format);
            }
        }
    }
    dataType(val,type){
        let v=val;
        switch (type) {
        case 'number':
            v=Number(val);
            break;
        default:
            v=val;
            break;
        }
        return v;
    }
    percentChange(e,v){
        const { value } = e.target;
        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
        value.replace(/[^\-?\d.]/g,'');
        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
            this.dataChange(e,v);
        }
    }
    selectChange(value,v){
        // const { value } = e.target;
        const {params}=this.props;
        for(let key in params){
            if(key===v.val){
                params[key]=this.dataType(value,v.dataType);
            }
        }
    }
    mSelectChange(value,v){
        // const { value } = e.target;
        const {params}=this.props;
        console.log(value,v);
        for(let key in params){
            if(key===v.val){
                params[key]=value.join();
            }
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 }
            }

        };
        this.props.formItemLayout?formItemLayout=this.props.formItemLayout:null;
        const typeData={
            text:(v)=>{
                return(getFieldDecorator(v.val, {
                    ...v.rules,
                    initialValue:this.defaultValueWay(v)

                })(<Input
                    onChange={(e)=>this.dataChange(e,v)}
                    placeholder={v.placeholder}

                />));
            },
            area:(v)=>{
                return(getFieldDecorator(v.val, {
                    ...v.rules,
                    initialValue:this.defaultValueWay(v)
                })(<TextArea
                    rows={5}
                    onChange={(e)=>this.dataChange(e,v)}
                    placeholder={v.placeholder}
                />));
            },
            percent:(v)=>{
                const rulesDefault={
                    rules:[{
                        required:true,
                        pattern: new RegExp(/^[1-9]?[0-9]{2}$/, 'g'),
                        message: '您只能输入数字'
                    }],
                    getValueFromEvent: (event) => {
                        const {value}=event.target;
                        return value.replace(/\D/g,'');
                    }
                };
                const rulesV={
                    rules:v.rules
                };
                let rules=v.rules?rulesV:rulesDefault;
                return(getFieldDecorator(v.val, {
                    ...rules,
                    initialValue:this.defaultValueWay(v)
                })(<Input
                    rows={5}
                    maxLength={3}
                    suffix="%"
                    onChange={(e)=>this.percentChange(e,v)}
                    placeholder={v.placeholder}
                />));
            },
            select:(v)=>{
                const rules={
                    rules:v.rules
                };
                return(getFieldDecorator(v.val, {
                    ...rules,
                    initialValue:this.defaultValueWay(v)
                })(<Select
                    onChange={(e)=>this.selectChange(e,v)}
                    placeholder={v.placeholder}
                >
                    {v.sleContent.map((v,i)=>(
                        <Option key={i} value={v.val}>{v.name}</Option>
                    ))}
                </Select>));
            },
            time:(v)=>{
                const rules={
                    rules:v.rules
                };
                return(getFieldDecorator(v.val, {
                    ...rules,
                    initialValue:this.defaultTimeData(v)
                })(<DatePicker
                    // onChange={(e)=>this.selectChange(e,v)}
                    placeholder={v.placeholder}
                    showTime
                    onChange={(e)=>this.timeDataChange(e,v)}
                    format={v.format?v.format:'YYYY-MM-DD HH:mm:ss'}
                />));
            },
            btn:(v)=>{
                let obj=null;
                const {params}=this.props;
                switch (v.btnType) {
                case 'del':
                    obj=(
                        <Button type="danger" onClick={()=>this.props.handleDel(params)}>
                            {v.name?v.name:'删除'}
                        </Button>
                    );
                    break;

                default:
                    obj=(
                        <Button type="primary" htmlType="submit">
                            {v.name?v.name:'提交'}
                        </Button>
                    );
                    break;
                }
                return obj;
            },
            mSelect:(v)=>{
                const rules={
                    rules:v.rules
                };
                return(getFieldDecorator(v.val, {
                    ...rules,
                    initialValue:this.defaultSelectWay(v)
                })(
                    <Checkbox.Group  defaultValue={v.defaultVal} onChange={(e)=>this.mSelectChange(e,v)} >

                        <Row>
                            {v.sleContent.map((v,i)=>(
                                <Col key={i} span={8}>
                                    <Checkbox
                                        placeholder={v.placeholder}
                                        value={v.val}
                                    >{v.name}
                                    </Checkbox>
                                </Col>
                            ))}
                        </Row>
                    </Checkbox.Group>
                ));
            }
        };

        const {styleCss}=this.props;
        return (
            <div style={styleCss?styleCss:{height:'600px','overflowY': 'auto'}}>
                <Form  layout={this.props.layout?this.props.layout:'horizontal'} labelAlign={this.props.labelAlign?this.props.labelAlign:'left'} {...formItemLayout} onSubmit={this.props.handleSubmit} className="login-form">
                    {
                        this.props.arr.map((v,i)=>{
                            return (
                                <Form.Item  label={v.type==='btn'?'':v.name} key={i}>
                                    {
                                        typeData[v.type](v)
                                    }
                                </Form.Item>
                            );
                        })
                    }

                </Form>
            </div>
        );
    }
}
const From = Form.create({
    mapPropsToFields(props) {
        let obj={};
        for(let v of props.arr){
            if(v.defaultVal){
                obj[v.val]= Form.createFormField({
                    value: v.defaultVal
                });
            }
        }
        return {
            // ...obj
            // type: Form.createFormField({
            //     value: '指标'
            // })

        };
    }
})(InputFrom);

export default From;