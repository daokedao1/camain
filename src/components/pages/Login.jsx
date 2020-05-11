
import React,{Component} from 'react';
import { Form, Icon, Input, Button,message } from 'antd';
import { PwaInstaller } from '../widget';
import {saveAuthInfo} from '../../redux/common';
import {login} from '../../axios';
import {setCookie} from './../../utils/index';
import {connect} from 'react-redux';
import Particles from 'reactparticles.js';
import Storage from '../../utils/localStorage'
import UserRes from './serve';
import {get} from 'lodash';
const bg = {
    backgroundImage:`url(${require('./img/login_bg1.jpg')})`,
    backgroundSize: '100% 100%'
};
const FormItem = Form.Item;
@connect(state => {
    console.log(state);
    return {
        auth: state.default.auth
    };
}, {saveAuthInfo})

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: '',
            title: ''
        };
    //   localStorage.setItem('allData','');
    }
    componentDidUpdate(prevProps) { // React 16.3+弃用componentWillReceiveProps
        const { auth: nextAuth = {}, history } = this.props;

        if (nextAuth && nextAuth.uid) { // 判断是否登陆
            localStorage.setItem('user', JSON.stringify(nextAuth.userName));
            localStorage.setItem('usertokentime', new Date().getTime());
            history.push('/');
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let param = {
                    'username': values.loginId,
                    'password': values.password

                };
                login(param).then(res=>{
                    if(res.success){
                        // 了解redux 的工作原理
                        const resUser = _.get(res, ['data', 'user']);
                        if(!resUser.roles || !resUser.roles.length) {
                            message.warning('请联系管理员开通权限');
                            return;
                        }
                        this.props.saveAuthInfo(res);
                        setCookie('token',res.data.token);
                        setCookie('usertokentime',new Date().getTime());

                        this.props.history.push('/');
                        UserRes.data = res;
                        Storage.set('userRes', res);
                        console.log(this.props);
                    }else{
                        message.warning(res.message);
                    }
                });
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={bg} className="login">
                <Particles id="test-particles" />
                <div className="login-form" >
                    <div className="login-logo">
                        <span>venus</span>
                        <PwaInstaller />
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('loginId', {
                                rules: [{ required: true, message: '请输入用户名!' }]
                            })(
                                <Input  prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="管理员输入admin" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }]
                            })(
                                <Input  prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                            )}
                        </FormItem>
                        <FormItem>

                            <span className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</span>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                登录
                            </Button>

                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Form.create()(Login);
