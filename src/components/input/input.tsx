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
import { FormComponentProps } from 'antd/es/form';
import { RouteComponentProps } from 'react-router';
const { Option } = Select;
const { TextArea } = Input;
const InputGroup = Input.Group;
type InputPorps = {
  styleCss:any;
} & RouteComponentProps &
  FormComponentProps;
class InputFrom extends React.Component<any,InputPorps> {
    constructor(props :any){
        super(props);
    }
    dataChange(e:any,v:any){
        const { value } = e.target;
        const {params}=this.props;
        for(let key in params){
            if(key===v.val){
                params[key]=this.dataType(value,v.dataType);
            }
        }
    }
    defaultValueWay(v :any){

        const {params}=this.props;

        if(v.calculation){
            return this.props.indexWay&&this.props.indexWay(v);
        }else{
            for(let key in params){
                if(key===v.val&&params[key]!==''){
                    if(typeof params[key]==='object' &&  !Array.isArray(params[key])){
                        return  JSON.stringify(params[key]);
                    }else{
                        return params[key];
                    }
                }
            }
        }
    }
    defaultValueSE(v:any){
        console.log(v);
    }
    defaultSelectWay(v:any){
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
    defaultTimeData(v:any){
        const {params}=this.props;
        for(let key in params){
            if(key===v.val&&params[key]!==''){
                return moment(params[key],v.format);
            }
        }
    }
    timeDataChange(value:any,v:any){
        const {params}=this.props;
        let format=v.format?v.format:'YYYY-MM-DD HH:mm:ss';
        for(let key in params){
            if(key===v.val){
                params[key]=moment(value).format(format);
            }
        }
    }
    dataType(val:any,type:any){
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
    percentChange(e:any,v:any){
        const { value } = e.target;
        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
        value.replace(/[^\-?\d.]/g,'');
        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
            this.dataChange(e,v);
        }
    }
    selectChange(value:any,v:any){
        // const { value } = e.target;
        const {params,ChangeData}=this.props;
        for(let key in params){
            if(key===v.val){
                params[key]=this.dataType(value,v.dataType);
            }
        }
        if(v.model&&ChangeData){
            ChangeData(value);
        }
    }
    selectMultiple(value:any,v:any){
        const {params,ChangeData}=this.props;
        for(let key in params){
            if(key===v.val){
                params[key]=this.dataType(value,v.dataType);
            }
        }
        if(v.model&&ChangeData){
            ChangeData(value);
        }
    }
    mSelectChange(value:any,v:any){
        // const { value } = e.target;
        const {params}=this.props;
        for(let key in params){
            if(key===v.val){
                params[key]=value.join();
            }
        }
    }
    pressEnter(e:any,v:any){
        this.props.pressEnter(e,v);
    }
    render() {
        let that=this;
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
        const typeData:any={
            text:(v:any)=>{
                return(getFieldDecorator(v.val, {
                    ...v.rules,
                    initialValue:this.defaultValueWay(v)

                })(<Input
                    disabled={v.readonly}
                    onPressEnter={(e)=>this.pressEnter(e,v)}
                    onChange={(e)=>this.dataChange(e,v)}
                    placeholder={v.placeholder}
                />));
            },
            area:(v:any)=>{
                return(getFieldDecorator(v.val,{
                    ...v.rules,
                    initialValue:this.defaultValueWay(v)
                })(<TextArea
                    rows={v.rows?v.rows:5}
                    onChange={(e)=>this.dataChange(e,v)}
                    placeholder={v.placeholder}
                />));
            },
            textSE:(v:any)=>{
                return(getFieldDecorator(v.val, {
                    ...v.rules,
                    initialValue:this.defaultValueSE(v)
                })(
                    <div>
                        <Input onChange={(e)=>this.dataChange(e,v)} style={{ width: 100, textAlign: 'center' }} placeholder={v.start} />
                        <Input
                            style={{
                                width: 30,
                                borderLeft: 0,
                                pointerEvents: 'none',
                                backgroundColor: '#fff'
                            }}
                            placeholder="~"
                            disabled
                        />
                        <Input onChange={(e)=>this.dataChange(e,v)} style={{ width: 100, textAlign: 'center', borderLeft: 0 }} placeholder={v.end} />
                    </div>
                ));
            },
            percent:(v:any)=>{
                const rulesDefault={
                    rules:[{
                        required:true,
                        pattern: new RegExp(/^[1-9]?[0-9]{2}$/, 'g'),
                        message: '您只能输入数字'
                    }],
                    getValueFromEvent: (event:any) => {
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
                    maxLength={3}
                    suffix="%"
                    onChange={(e)=>this.percentChange(e,v)}
                    placeholder={v.placeholder}
                />));
            },
            select:(v:any)=>{
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
                    {v.sleContent.map((v:any,i:any)=>(
                        <Option key={i} value={v.val}>{v.name}</Option>
                    ))}
                </Select>));
            },
            multiple(v:any){
                return(
                    getFieldDecorator(v.val, {
                        rules: [
                            { required: v.required, message: v.message, type: 'array' }
                        ],
                        initialValue:that.defaultValueWay(v),
                        ...v.rules
                    })(
                        <Select
                            onChange={(e)=>that.selectMultiple(e,v)}
                            mode="multiple"
                            placeholder={v.placeholder}>
                            {v.sleContent.map((v:any,i:any)=>(
                                <Option key={i} value={v.val}>{v.name}</Option>
                            ))}
                        </Select>,
                    )
                );
            },
            time:(v:any)=>{
                const rules={
                    rules:v.rules
                };
                return(getFieldDecorator(v.val, {
                    ...rules,
                    initialValue:this.defaultTimeData(v)
                })(<DatePicker
                    // onChange={(e)=>this.selectChange(e,v)}
                    disabled={v.disable}
                    placeholder={v.placeholder}
                    showTime
                    onChange={(e)=>this.timeDataChange(e,v)}
                    format={v.format?v.format:'YYYY-MM-DD HH:mm:ss'}
                />));
            },
            btn:(v:any)=>{
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
            mSelect:(v:any)=>{
                const rules={
                    rules:v.rules
                };
                return(getFieldDecorator(v.val, {
                    ...rules,
                    initialValue:this.defaultSelectWay(v)
                })(
                    <Checkbox.Group  defaultValue={v.defaultVal} onChange={(e)=>this.mSelectChange(e,v)} >
                        <Row>
                            {v.sleContent.map((v:any,i:any)=>(
                                <Col key={i} span={8}>
                                    <Checkbox
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
                        this.props.arr.map((v:any,i:any)=>{
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
const FromInp:any = Form.create({
    mapPropsToFields(props :any) {
        let obj:any={};
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

export default FromInp;