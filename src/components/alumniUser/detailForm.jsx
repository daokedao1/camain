import {
    Form,
    Input,
    Select,
    Radio,
    DatePicker,
    Button,
    message,
} from 'antd';

import moment from 'moment';
import React from 'react';
import {extend} from 'lodash';
import {getAlumniOrg, putUser} from '@/axios'

const { Option } = Select;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const alumniParam = {
    orderField: "",
    orderType: "",
    page: 1,
    size: 2000
}

const formOptions = {
    name: 'userDetail',
    onValuesChange: (a, b, c) => {
        console.log(a, b, c);
    }

}

class DetailForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colleages: [],
            faculties: [],
            classes: [],
            params: this.props.params
        };
    }

    componentDidMount() {
        this.getColleages();
    }

    componentDidUpdate() {
        const {id} = this.state.params;
        const {params} = this.props;
        if(params.id !== id) {
            this.props.form.resetFields();
            this.setState({
                params
            });
            this.getFaculties(params.collegeId);
            this.getClasses(params.facultyId);
        } 
    }

    getColleages() {
        // let param = cloneDeep(alumniParam);
        // param['partentId'] = 1;
        let param = {partentId : 1, ...alumniParam};
        getAlumniOrg(param).then( res => {
            if(res && res.data) {
                this.setState({colleages: res.data.items || []});
            }
        })
    }

    getFaculties(value) {
        let partentId = value;
        if(!partentId) {
            return;
        }
        // let param = cloneDeep(alumniParam);
        // param['partentId'] = partentId;
        let param = {partentId, ...alumniParam};
        getAlumniOrg(param).then( res => {
            if(res && res.data) {
                this.setState({faculties: res.data.items || []});
            }
        })
    }
    getClasses(value) {
        let partentId = value;
        if(!partentId) {
            return;
        }
        let param = {partentId, ...alumniParam};
        getAlumniOrg(param).then( res => {
            if(res && res.data) {
                this.setState({classes: res.data.items || []});
            }
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        let {params} = this.state;
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if(!errors) {
                values.birthday =moment(values.birthday).format('YYYY-MM-DD HH:mm:ss');
                putUser(extend(params, values)).then(res => {
                    if(res.success) {
                        this.props.callback({update: true});
                        message.success(`更新${values.name}的信息成功`);
                    }else {
                        message.error(`更新${values.name}的信息失败, 请联系管理员`);
                    }
                    
                }, err => {
                    message.error(`更新${values.name}的信息失败`)
                })
            }
        });
    }

    generateOptions(datas) {
        return datas.map( data => <Option key={data.id} value={data.id}>{data.name}</Option>);
    }

    render () {
        const {getFieldDecorator, getFieldsError} = this.props.form;
        const {colleages, faculties, classes, params} = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 8,
              },
            },
          };

        const colleageOptions = this.generateOptions(colleages);
        const facultyOptions =  this.generateOptions(faculties);
        const classOptions =  this.generateOptions(classes);
        return (<Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
                <Form.Item label="姓名">
                {getFieldDecorator('name', {
                    initialValue: params.name || '',
                    rules: [
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                    ],
                })(<Input />)}
                </Form.Item>
                <Form.Item label="性别">
                {getFieldDecorator('sex', {
                    initialValue: params.sex,
                    rules: [],
                })(
                    <Radio.Group>
                        <Radio value={0}>男</Radio>
                        <Radio value={1}>女</Radio>
                    </Radio.Group>
                )}
                </Form.Item>
                <Form.Item label="手机号">
                {getFieldDecorator('phone', {
                    initialValue: params.phone,
                    rules: [
                    ],
                })(<Input />)}
                </Form.Item>
                <Form.Item label="入学时间">
                {getFieldDecorator('acceptAnce', {
                    initialValue: params.acceptAnceDate,
                    rules: [
                        {
                            required: true,
                            message: '请选择入学时间',
                        },
                    ],
                })(<Input />)}
                </Form.Item>
                <Form.Item label="毕业时间">
                {getFieldDecorator('graduateDate', {
                    initialValue: params.graduateDate,
                    rules: [
                        {
                            required: true,
                            message: '请选择毕业时间',
                        },
                    ],
                })(<Input />)}
                </Form.Item>
                <Form.Item label="所在公司">
                    {getFieldDecorator('workUnit', {
                        initialValue: params.workUnit,
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="职务">
                    {getFieldDecorator('duty', {
                        initialValue: params.duty,
                        rules: [],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="现地址">
                    {
                        getFieldDecorator('address', {
                            initialValue: params.address,
                            rules: []
                        })
                        (<Input />)
                    }
                </Form.Item>
                <Form.Item label="生日">
                    {   getFieldDecorator('birthday', {
                            initialValue: moment(params.birthday, 'YYYY-MM-DD'),
                            rules: [],
                        })
                        (<DatePicker format={'YYYY-MM-DD'} />)
                    }
                </Form.Item>
                <Form.Item label="学校名称">
                    {getFieldDecorator('schoolName', {
                        initialValue: params.schoolName || '',
                        rules: [],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="学院名称">
                    {getFieldDecorator('collegeId', {
                        initialValue: params.collegeId,
                        rules: [{ required: true, message: '请选择学院' }],
                    })(
                        <Select onChange={this.getFaculties.bind(this)} showSearch={true}>
                            {colleageOptions}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="专业">
                    {getFieldDecorator('facultyId', {
                        initialValue: params.facultyId,
                        rules: [{ required: true, message: '请选择专业' }],
                    })( 

                        <Select onChange={this.getClasses.bind(this)} showSearch={true}>
                            {facultyOptions}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="班级名称">
                    {getFieldDecorator('classId', {
                        initialValue: params.classId,
                        rules: [
                            { required: true, message: '请选择班级' }
                        ],
                    })(
                        <Select showSearch={true}>
                            {classOptions}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="学历">
                    {getFieldDecorator('education', {
                        initialValue: params.education || '',
                        rules: [],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="邮箱">
                    {getFieldDecorator('email', {
                        initialValue: params.email || '',
                        rules: [
                            { type: 'email', message: '请输入正确格式的邮箱' }
                        ],
                    })(
                        <Input />
                    )}
                </Form.Item>

                <Form.Item label="身份证">
                    {getFieldDecorator('idCard', {
                        initialValue: params.idCard || '',
                        rules: [],
                    })(
                        <Input />
                    )}
                </Form.Item>

                <Form.Item label="个人风采">
                    {getFieldDecorator('userTagIdList', {
                        initialValue: params.userTagIdList || '',
                        rules: [],
                    })(
                        <Input />
                    )}
                </Form.Item>

                <Form.Item label="微信">
                    {getFieldDecorator('wx', {
                        initialValue: params.wx || '',
                        rules: [],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="QQ">
                    {getFieldDecorator('qq', {
                        initialValue: params.qq || '',
                        rules: [],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="个性签名">
                    {getFieldDecorator('signature', {
                        initialValue: params.signature || '',
                        rules: [],
                    })(
                        <Input />
                    )}
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                        更新信息
                    </Button>
                </Form.Item>
        </Form>)
    }
}


export default Form.create(formOptions)(DetailForm)