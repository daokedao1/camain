
import React from 'react';
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
import { PwaInstaller } from '@/components/widget';
import { connectAlita } from 'redux-alita';
import { RouteComponentProps } from 'react-router';
import { FormComponentProps } from 'antd/es/form';
import Particles from 'reactparticles.js';
import {loginUrl} from '@/axios';

const FormItem = Form.Item;
const bg = {
    backgroundImage:`url(${require('./img/login_bg1.jpg')})`,
    backgroundSize: '100% 100%'
};
type LoginProps = {
    setAlitaState: (param: any) => void;
    auth: any;
} & RouteComponentProps &
    FormComponentProps;
class Login extends React.Component<LoginProps> {
    componentDidMount() {
        const { setAlitaState } = this.props;
        document.title = '登录';
        setAlitaState({ stateName: 'auth', data: null });
    }
    componentDidUpdate(prevProps: LoginProps) {
        // React 16.3+弃用componentWillReceiveProps
        const { auth: nextAuth = {}, history } = this.props;
        // const { history } = this.props;
        if (nextAuth.data && nextAuth.data.uid) {
            // 判断是否登陆
            localStorage.setItem('user', JSON.stringify(nextAuth.data));
            history.push('/app/index');
        }
    }
    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.loginIn(values);
                const { setAlitaState } = this.props;
                if (values.userName === 'admin' && values.password === 'venus')
                    setAlitaState({ funcName: 'admin', stateName: 'auth' });
                if (values.userName === 'guest' && values.password === 'guest')
                    setAlitaState({ funcName: 'guest', stateName: 'auth' });
            }
        });
    };

    requestFullScreen() {
        var de: any = document.documentElement;
        if (de.requestFullscreen) {
            de.requestFullscreen();
        } else if (de.mozRequestFullScreen) {
            de.mozRequestFullScreen();
        } else if (de.webkitRequestFullScreen) {
            de.webkitRequestFullScreen();
        }
    }
    async loginIn(values={}){

        const res: any= await loginUrl(values);
        if(res.success){
            this.props.history.push('/app/Monitor');
        }else{
            const error = () => {
                message.error('用户名或密码错误');
            };
            error();
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={bg} className="login">
                <Particles id="test-particles" config="test-particles.json"/>
                <div className="login-form">
                    <div className="login-logo">
                        <span>venus</span>
                        <PwaInstaller />
                    </div>
                    <Form  onSubmit={this.handleSubmit.bind(this)} style={{ maxWidth: '300px' }}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }]
                            })(
                                <Input
                                    // style={{backgroundColor:`red !important` }}
                                    prefix={<Icon  type="user" style={{ fontSize: 13 }} />}
                                    placeholder="用户名"
                                />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }]
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                                    type="password"
                                    placeholder="密码"
                                />
                            )}
                        </FormItem>
                        <FormItem>
                            {/* {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox style={{ color: '#fff' }}>记住我</Checkbox>)} */}
                            {/* <span className="login-form-forgot" style={{ float: 'right' }}>
                                忘记密码
                            </span> */}
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                style={{
                                    width: '100%',
                                    border:' 2px solid #4fa1d9',
                                    borderRadius: '50px',
                                    background: 'transparent',
                                    fontSize: '11px',
                                    color:' #4fa1d9',
                                    transition: 'all .2s'
                                }}
                            >
                                登录
                            </Button>
                            <p className="footer">
                                欢迎登录后台管理系统
                            </p>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default connectAlita(['auth'])(Form.create()(Login));
